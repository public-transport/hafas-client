// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import trim from 'lodash/trim.js';
import uniqBy from 'lodash/uniqBy.js';
import slugg from 'slugg';
import without from 'lodash/without.js';
import {parseHook} from '../../lib/profile-hooks.js';

import {parseJourney as _parseJourney} from '../../parse/journey.js';
import {parseJourneyLeg as _parseJourneyLeg} from '../../parse/journey-leg.js';
import {parseLine as _parseLine} from '../../parse/line.js';
import {parseArrival as _parseArrival} from '../../parse/arrival.js';
import {parseDeparture as _parseDeparture} from '../../parse/departure.js';
import {parseHint as _parseHint} from '../../parse/hint.js';
import {parseLocation as _parseLocation} from '../../parse/location.js';
import {formatStation as _formatStation} from '../../format/station.js';
import {bike} from '../../format/filters.js';

const baseProfile = require('./base.json');
import {products} from './products.js';
import {formatLoyaltyCard} from './loyalty-cards.js';
import {ageGroup, ageGroupFromAge} from './ageGroup.js';
import {routingModes} from './routing-modes.js';

const transformReqBody = (ctx, body) => {
	const req = body.svcReqL[0] || {};

	// see https://pastebin.com/qZ9WS3Cx
	const rtMode = 'routingMode' in ctx.opt
		? ctx.opt.routingMode
		: routingModes.REALTIME;

	req.cfg = {
		...req.cfg,
		rtMode,
	};

	return body;
};

const slices = (n, arr) => {
	const initialState = {slices: [], count: Infinity};
	return arr.reduce(({slices, count}, item) => {
		if (count >= n) {
			slices.push([item]);
			count = 1;
		} else {
			slices[slices.length - 1].push(item);
			count++;
		}
		return {slices, count};
	}, initialState).slices;
};

const parseGrid = (g) => {
	// todo: g.type, e.g. `S`
	// todo: respect `g.itemL[].(col|row)`?

	// todo
	// parseGrid is being called by parseLocWithDetails, which is being called as
	// profile.parseLocation by profile.parseCommon, parseCommon hasn't finished
	// resolving all references yet, so we have to resolve them manually here.
	// This would be fixed if we resolve references on-the-fly or in a recursive/
	// iterative process.
	return {
		title: g.title,
		rows: slices(g.nCols, g.itemL.map(item => Array.isArray(item.hints) && item.hints[0]
		|| Array.isArray(item.remarkRefs) && item.remarkRefs[0] && item.remarkRefs[0].hint
		|| {},
		)),
	};
};

const ausstattungKeys = Object.assign(Object.create(null), {
	'3-s-zentrale': '3SZentrale',
	'parkplatze': 'parkingLots',
	'fahrrad-stellplatze': 'bicycleParkingRacks',
	'opnv-anbindung': 'localPublicTransport',
	'wc': 'toilets',
	'schliessfacher': 'lockers',
	'reisebedarf': 'travelShop',
	'stufenfreier-zugang': 'stepFreeAccess',
	'ein-umsteigehilfe': 'boardingAid',
	'taxi-am-bahnhof': 'taxis',
});
const parseAusstattungVal = (val) => {
	val = val.toLowerCase();
	return val === 'ja'
		? true
		: val === 'nein'
			? false
			: val;
};

const parseAusstattungGrid = (g) => {
	// filter duplicate hint rows
	const rows = uniqBy(g.rows, ([key, val]) => key + ':' + val);

	const res = {};
	Object.defineProperty(res, 'raw', {value: rows});
	for (let [key, val] of rows) {
		key = ausstattungKeys[slugg(key)];
		if (key) {
			res[key] = parseAusstattungVal(val);
		}
	}
	return res;
};

const parseReisezentrumÖffnungszeiten = (g) => {
	const res = {};
	for (const [dayOfWeek, val] of g.rows) {
		res[dayOfWeek] = val;
	}
	res.raw = g.rows;
	return res;
};

const parseLocWithDetails = ({parsed, common}, l) => {
	if (!parsed) {
		return parsed;
	}
	if (parsed.type !== 'stop' && parsed.type !== 'station') {
		return parsed;
	}

	if (Array.isArray(l.gridL)) {
		const resolveCells = grid => ({
			...grid,
			rows: grid.rows.map(row => row.map(cell => cell && cell.text)),
		});

		let grids = l.gridL
			.map(grid => parseGrid(grid, common))
			.map(resolveCells);

		const ausstattung = grids.find(g => slugg(g.title) === 'ausstattung');
		if (ausstattung) {
			parsed.facilities = parseAusstattungGrid(ausstattung);
		}
		const öffnungszeiten = grids.find(g => slugg(g.title) === 'offnungszeiten-reisezentrum');
		if (öffnungszeiten) {
			parsed.reisezentrumOpeningHours = parseReisezentrumÖffnungszeiten(öffnungszeiten);
		}

		grids = without(grids, ausstattung, öffnungszeiten);
		if (grids.length > 0) {
			parsed.grids = grids;
		}
	}

	return parsed;
};

// https://www.bahn.de/p/view/service/buchung/auslastungsinformation.shtml
const loadFactors = [];
loadFactors[1] = 'low-to-medium';
loadFactors[2] = 'high';
loadFactors[3] = 'very-high';
loadFactors[4] = 'exceptionally-high';

const parseLoadFactor = (opt, tcocL, tcocX) => {
	const cls = opt.firstClass
		? 'FIRST'
		: 'SECOND';
	const load = tcocX.map(i => tcocL[i])
		.find(lf => lf.c === cls);
	return load && loadFactors[load.r] || null;
};

const parseArrOrDepWithLoadFactor = ({parsed, res, opt}, d) => {
	if (d.stbStop.dTrnCmpSX && Array.isArray(d.stbStop.dTrnCmpSX.tcocX)) {
		const load = parseLoadFactor(opt, res.common.tcocL || [], d.stbStop.dTrnCmpSX.tcocX);
		if (load) {
			parsed.loadFactor = load;
		}
	}
	return parsed;
};

const trfReq = (opt, refreshJourney) => {
	if ('age' in opt && 'ageGroup' in opt) {
		throw new TypeError(`\
opt.age and opt.ageGroup are mutually exclusive.
Pass in just opt.age, and the age group will calculated automatically.`);
	}

	const tvlrAgeGroup = 'age' in opt
		? ageGroupFromAge(opt.age)
		: opt.ageGroup;

	const basicCtrfReq = {
		jnyCl: opt.firstClass === true ? 1 : 2,
		// todo [breaking]: support multiple travelers
		tvlrProf: [{
			type: tvlrAgeGroup || ageGroup.ADULT,
			...'age' in opt
				? {age: opt.age}
				: {},
			redtnCard: opt.loyaltyCard
				? formatLoyaltyCard(opt.loyaltyCard)
				: null,
		}],
		cType: 'PK',
	};
	if (refreshJourney && opt.tickets) {
		// todo: what are these?
		// basicCtrfReq.directESuiteCall = true
		// If called with "Reconstruction"
		// 'DB-PE' causes the response to contain the tariff information.
		basicCtrfReq.rType = 'DB-PE';
	}
	return basicCtrfReq;
};

const transformJourneysQuery = ({opt}, query) => {
	const filters = query.jnyFltrL;
	if (opt.bike) {
		filters.push(bike);
	}
	query.trfReq = trfReq(opt, false);

	return query;
};

const formatRefreshJourneyReq = (ctx, refreshToken) => {
	const {profile, opt} = ctx;
	const req = {
		getIST: true,
		getPasslist: Boolean(opt.stopovers),
		getPolyline: Boolean(opt.polylines),
		getTariff: Boolean(opt.tickets),
	};
	if (profile.refreshJourneyUseOutReconL) {
		req.outReconL = [{ctx: refreshToken}];
	} else {
		req.ctxRecon = refreshToken;
	}
	req.trfReq = trfReq(opt, true);

	return {
		meth: 'Reconstruction',
		req,
	};
};

const parseShpCtx = (addDataTicketInfo) => {
	try {
		return JSON.parse(atob(addDataTicketInfo)).shpCtx;
	} catch (e) {
		// in case addDataTicketInfo is not a valid base64 string
		return null;
	}
};


const addDbOfferSelectionUrl = (journey, opt) => {

	// if no ticket contains addData, we can't get the offer selection URL
	if (journey.tickets.some((t) => t.addDataTicketInfo)) {

		const queryParams = new URLSearchParams();

		// Add individual parameters
		queryParams.append('A.1', opt.age);
		queryParams.append('E', 'F');
		queryParams.append('E.1', opt.loyaltyCard ? formatLoyaltyCard(opt.loyaltyCard) : '0');
		queryParams.append('K', opt.firstClass ? '1' : '2');
		queryParams.append('M', 'D');
		queryParams.append('RT.1', 'E');
		queryParams.append('SS', journey.legs[0].origin.id);
		queryParams.append('T', journey.legs[0].departure);
		queryParams.append('VH', journey.refreshToken);
		queryParams.append('ZS', journey.legs[journey.legs.length - 1].destination.id);
		queryParams.append('journeyOptions', '0');
		queryParams.append('journeyProducts', '1023');
		queryParams.append('optimize', '1');
		queryParams.append('returnurl', 'dbnavigator://');
		const endpoint = opt.language === 'de' ? 'dox' : 'eox';

		journey.tickets.forEach((t) => {
			const shpCtx = parseShpCtx(t.addDataTicketInfo);
			if (shpCtx) {
				const url = new URL(`https://mobile.bahn.de/bin/mobil/query.exe/${endpoint}`);
				url.searchParams = new URLSearchParams(queryParams);
				url.searchParams.append('shpCtx', shpCtx);
				t.url = url.href;
			} else {
				t.url = null;
			}
		});
	}
};


// todo: fix this
// line: {
// 	type: 'line',
// 	id: '5-vbbbvb-x9',
// 	fahrtNr: '52496',
// 	name: 'X9',
// 	public: true,
// 	mode: 'bus',
// 	product: 'bus',
// 	operator: {type: 'operator', id: 'nahreisezug', name: 'Nahreisezug'}
// }
const parseLineWithAdditionalName = ({parsed}, l) => {
	if (l.nameS && ['bus', 'tram', 'ferry'].includes(l.product)) {
		parsed.name = l.nameS;
	}
	if (l.addName) {
		parsed.additionalName = parsed.name;
		parsed.name = l.addName;
	}
	return parsed;
};

// todo: sotRating, conSubscr, isSotCon, showARSLink, sotCtxt
// todo: conSubscr, showARSLink, useableTime
const mutateToAddPrice = (parsed, raw) => {
	parsed.price = null;
	// todo: find cheapest, find discounts
	if (
		raw.trfRes
		&& Array.isArray(raw.trfRes.fareSetL)
		&& raw.trfRes.fareSetL[0]
		&& Array.isArray(raw.trfRes.fareSetL[0].fareL)
		&& raw.trfRes.fareSetL[0].fareL[0]
	) {
		const tariff = raw.trfRes.fareSetL[0].fareL[0];
		if (tariff.price && tariff.price.amount >= 0) { // wat
			parsed.price = {
				amount: tariff.price.amount / 100,
				currency: 'EUR',
				hint: null,
			};
		}
	}

	return parsed;
};

const isFirstClassTicket = (addData, opt) => {
	// if addData is undefined, it is assumed that the ticket is not first class
	// (this is the case for S-Bahn tickets)
	if (!addData) {
		return false;
	}
	try {
		const addDataJson = JSON.parse(atob(addData));
		return Boolean(addDataJson.Upsell === 'S1' || opt.firstClass);
	} catch (err) {
		return false;
	}
};

const mutateToAddTickets = (parsed, opt, j) => {
	if (
		j.trfRes
		&& Array.isArray(j.trfRes.fareSetL)
	) {
		const addData = j.trfRes.fareSetL[0].addData;
		parsed.tickets = j.trfRes.fareSetL
			.filter(s => Array.isArray(s.fareL) && s.fareL.length > 0)
			.map((s) => {
				const fare = s.fareL[0];
				if (!fare.ticketL) { // if journeys()
					return {
						name: fare.buttonText,
						priceObj: {amount: fare.price.amount},
					};
				} else { // if refreshJourney()
					return {
						name: fare.name || fare.ticketL[0].name,
						priceObj: fare.ticketL[0].price,
						addData: addData,
						addDataTicketInfo: s.addData,
						addDataTicketDetails: fare.addData,
						addDataTravelInfo: fare.ticketL[0].addData,
						firstClass: isFirstClassTicket(s.addData, opt),
					};
				}
			});
		// add price info, to avoid breaking changes
		// todo [breaking]: remove this format
		if (parsed.tickets.length > 0 && !parsed.price) {
			parsed.price = {
				...parsed.tickets[0].priceObj,
				amount: parsed.tickets[0].priceObj.amount / 100,
				currency: 'EUR',
			};
		}
		if (opt.generateUnreliableTicketUrls) {
			addDbOfferSelectionUrl(parsed, opt);
		}

	}
};

const parseJourneyWithPriceAndTickets = ({parsed, opt}, raw) => {
	mutateToAddPrice(parsed, raw);
	mutateToAddTickets(parsed, opt, raw);
	return parsed;
};

const parseJourneyLegWithLoadFactor = ({parsed, res, opt}, raw) => {
	const tcocX = raw.jny && raw.jny.dTrnCmpSX && raw.jny.dTrnCmpSX.tcocX;
	if (Array.isArray(tcocX) && Array.isArray(res.common.tcocL)) {
		const load = parseLoadFactor(opt, res.common.tcocL, tcocX);
		if (load) {
			parsed.loadFactor = load;
		}
	}
	return parsed;
};

// todo:
// [ { type: 'hint',
//     code: 'P5',
//     text: 'Es gilt ein besonderer Fahrpreis' }
const hintsByCode = Object.assign(Object.create(null), {
	fb: {
		type: 'hint',
		code: 'bicycle-conveyance',
		summary: 'bicycles conveyed',
	},
	fr: {
		type: 'hint',
		code: 'bicycle-conveyance-reservation',
		summary: 'bicycles conveyed, subject to reservation',
	},
	nf: {
		type: 'hint',
		code: 'no-bicycle-conveyance',
		summary: 'bicycles not conveyed',
	},
	k2: {
		type: 'hint',
		code: '2nd-class-only',
		summary: '2. class only',
	},
	eh: {
		type: 'hint',
		code: 'boarding-ramp',
		summary: 'vehicle-mounted boarding ramp available',
	},
	ro: {
		type: 'hint',
		code: 'wheelchairs-space',
		summary: 'space for wheelchairs',
	},
	oa: {
		type: 'hint',
		code: 'wheelchairs-space-reservation',
		summary: 'space for wheelchairs, subject to reservation',
	},
	wv: {
		type: 'hint',
		code: 'wifi',
		summary: 'WiFi available',
	},
	wi: {
		type: 'hint',
		code: 'wifi',
		summary: 'WiFi available',
	},
	sn: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase',
	},
	mb: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase',
	},
	mp: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase at the seat',
	},
	bf: {
		type: 'hint',
		code: 'barrier-free',
		summary: 'barrier-free',
	},
	rg: {
		type: 'hint',
		code: 'barrier-free-vehicle',
		summary: 'barrier-free vehicle',
	},
	bt: {
		type: 'hint',
		code: 'on-board-bistro',
		summary: 'Bordbistro available',
	},
	br: {
		type: 'hint',
		code: 'on-board-restaurant',
		summary: 'Bordrestaurant available',
	},
	ki: {
		type: 'hint',
		code: 'childrens-area',
		summary: 'children\'s area available',
	},
	kk: {
		type: 'hint',
		code: 'parents-childrens-compartment',
		summary: 'parent-and-children compartment available',
	},
	kr: {
		type: 'hint',
		code: 'kids-service',
		summary: 'DB Kids Service available',
	},
	ls: {
		type: 'hint',
		code: 'power-sockets',
		summary: 'power sockets available',
	},
	ev: {
		type: 'hint',
		code: 'replacement-service',
		summary: 'replacement service',
	},
	kl: {
		type: 'hint',
		code: 'air-conditioned',
		summary: 'air-conditioned vehicle',
	},
	r0: {
		type: 'hint',
		code: 'upward-escalator',
		summary: 'upward escalator',
	},
	au: {
		type: 'hint',
		code: 'elevator',
		summary: 'elevator available',
	},
	ck: {
		type: 'hint',
		code: 'komfort-checkin',
		summary: 'Komfort-Checkin available',
	},
	it: {
		type: 'hint',
		code: 'ice-sprinter',
		summary: 'ICE Sprinter service',
	},
	rp: {
		type: 'hint',
		code: 'compulsory-reservation',
		summary: 'compulsory seat reservation',
	},
	rm: {
		type: 'hint',
		code: 'optional-reservation',
		summary: 'optional seat reservation',
	},
	scl: {
		type: 'hint',
		code: 'all-2nd-class-seats-reserved',
		summary: 'all 2nd class seats reserved',
	},
	acl: {
		type: 'hint',
		code: 'all-seats-reserved',
		summary: 'all seats reserved',
	},
	sk: {
		type: 'hint',
		code: 'oversize-luggage-forbidden',
		summary: 'oversize luggage not allowed',
	},
	hu: {
		type: 'hint',
		code: 'animals-forbidden',
		summary: 'animals not allowed, except guide dogs',
	},
	ik: {
		type: 'hint',
		code: 'baby-cot-required',
		summary: 'baby cot/child seat required',
	},
	ee: {
		type: 'hint',
		code: 'on-board-entertainment',
		summary: 'on-board entertainment available',
	},
	toilet: {
		type: 'hint',
		code: 'toilet',
		summary: 'toilet available',
	},
	oc: {
		type: 'hint',
		code: 'wheelchair-accessible-toilet',
		summary: 'wheelchair-accessible toilet available',
	},
	iz: {
		type: 'hint',
		code: 'intercity-2',
		summary: 'Intercity 2',
	},
});

const codesByText = Object.assign(Object.create(null), {
	'journey cancelled': 'journey-cancelled', // todo: German variant
	'stop cancelled': 'stop-cancelled', // todo: change to `stopover-cancelled`, German variant
	'signal failure': 'signal-failure',
	'signalstörung': 'signal-failure',
	'additional stop': 'additional-stopover', // todo: German variant
	'platform change': 'changed platform', // todo: use dash, German variant
});

const parseHintByCode = ({parsed}, raw) => {
	// plain-text hints used e.g. for stop metadata
	if (raw.type === 'K') {
		return {type: 'hint', text: raw.txtN};
	}

	if (raw.type === 'A') {
		const hint = hintsByCode[raw.code && raw.code.trim()
			.toLowerCase()];
		if (hint) {
			return Object.assign({text: raw.txtN}, hint);
		}
	}

	if (parsed && raw.txtN) {
		const text = trim(raw.txtN.toLowerCase(), ' ()');
		if (codesByText[text]) {
			parsed.code = codesByText[text];
		}
	}

	return parsed;
};

const isIBNR = /^\d{6,}$/;
const formatStation = (id) => {
	if (!isIBNR.test(id)) {
		throw new Error('station ID must be an IBNR.');
	}
	return _formatStation(id);
};

// todo: find option for absolute number of results

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	addChecksum: true,

	transformReqBody,
	transformJourneysQuery,
	formatRefreshJourneyReq,

	products: products,

	parseLocation: parseHook(_parseLocation, parseLocWithDetails),
	parseJourney: parseHook(_parseJourney, parseJourneyWithPriceAndTickets),
	parseJourneyLeg: parseHook(_parseJourneyLeg, parseJourneyLegWithLoadFactor),
	parseLine: parseHook(_parseLine, parseLineWithAdditionalName),
	parseArrival: parseHook(_parseArrival, parseArrOrDepWithLoadFactor),
	parseDeparture: parseHook(_parseDeparture, parseArrOrDepWithLoadFactor),
	parseHint: parseHook(_parseHint, parseHintByCode),

	formatStation,

	generateUnreliableTicketUrls: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	journeysFromTrip: true,
	radar: true,
	reachableFrom: true,
	lines: false, // `.svcResL[0].res.lineL[]` is missing 🤔
};

export {
	profile,
};
