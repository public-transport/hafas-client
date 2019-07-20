'use strict'

const trim = require('lodash/trim')

const _createParseArrival = require('../../parse/arrival')
const _createParseDeparture = require('../../parse/departure')
const _createParseJourney = require('../../parse/journey')
const _createParseJourneyLeg = require('../../parse/journey-leg')
const _createParseLine = require('../../parse/line')
const _parseHint = require('../../parse/hint')
const _formatStation = require('../../format/station')
const {bike} = require('../../format/filters')

const products = require('./products')
const formatLoyaltyCard = require('./loyalty-cards').format

const transformReqBody = (body) => {
	body.client = {id: 'DB', v: '16040000', type: 'IPH', name: 'DB Navigator'}
	body.ext = 'DB.R19.04.a'
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'n91dB8Z77MLdoR0K'}

	return body
}

// https://www.bahn.de/p/view/service/buchung/auslastungsinformation.shtml
const loadFactors = []
loadFactors[1] = 'low-to-medium'
loadFactors[2] = 'high'
loadFactors[3] = 'very-high'
loadFactors[4] = 'exceptionally-high'

const parseLoadFactor = (opt, tcocL, tcocX) => {
	const cls = opt.firstClass ? 'FIRST' : 'SECOND'
	const load = tcocX.map(i => tcocL[i]).find(lf => lf.c === cls)
	return load && loadFactors[load.r] || null
}

const createParseArrOrDep = (createParse) => (profile, opt, data) => {
	const parse = createParse(profile, opt, data)
	const parseWithLoadFactor = (d) => {
		const result = parse(d)
		if (d.stbStop.dTrnCmpSX && Array.isArray(d.stbStop.dTrnCmpSX.tcocX)) {
			const {tcocL} = data.raw.common
			const load = parseLoadFactor(opt, tcocL, d.stbStop.dTrnCmpSX.tcocX)
			if (load) result.loadFactor = load
		}
		return result
	}
	return parseWithLoadFactor
}

const createParseArrival = createParseArrOrDep(_createParseArrival)
const createParseDeparture = createParseArrOrDep(_createParseDeparture)

const transformJourneysQuery = (query, opt) => {
	const filters = query.jnyFltrL
	if (opt.bike) filters.push(bike)

	query.trfReq = {
		jnyCl: opt.firstClass === true ? 1 : 2,
		tvlrProf: [{
			type: 'E',
			redtnCard: opt.loyaltyCard
				? formatLoyaltyCard(opt.loyaltyCard)
				: null
		}],
		cType: 'PK'
	}

	return query
}

const createParseLine = (profile, opt, data) => {
	const parseLine = _createParseLine(profile, opt, data)
	const parseLineWithAdditionalName = (l) => {
		const res = parseLine(l)
		if (l.nameS && ['bus', 'tram', 'ferry'].includes(res.product)) {
			res.name = l.nameS
		}
		if (l.addName) {
			res.additionalName = res.name
			res.name = l.addName
		}
		return res
	}
	return parseLineWithAdditionalName
}

const createParseJourney = (profile, opt, data) => {
	const parseJourney = _createParseJourney(profile, opt, data)

	// todo: j.sotRating, j.conSubscr, j.isSotCon, j.showARSLink, k.sotCtxt
	// todo: j.conSubscr, j.showARSLink, j.useableTime
	const parseJourneyWithPrice = (j) => {
		const res = parseJourney(j)

		// todo: find cheapest, find discounts
		// todo: write a parser like vbb-parse-ticket
		// [ {
		// 	prc: 15000,
		// 	isFromPrice: true,
		// 	isBookable: true,
		// 	isUpsell: false,
		// 	targetCtx: 'D',
		// 	buttonText: 'To offer selection'
		// } ]
		res.price = {amount: null, hint: 'No pricing information available.'}
		if (
			j.trfRes &&
			Array.isArray(j.trfRes.fareSetL) &&
			j.trfRes.fareSetL[0] &&
			Array.isArray(j.trfRes.fareSetL[0].fareL) &&
			j.trfRes.fareSetL[0].fareL[0]
		) {
			const tariff = j.trfRes.fareSetL[0].fareL[0]
			if (tariff.prc >= 0) { // wat
				res.price = {
					amount: tariff.prc / 100,
					currency: 'EUR',
					hint: null
				}
			}
		}

		return res
	}

	return parseJourneyWithPrice
}

const createParseJourneyLeg = (profile, opt, data) => {
	const parseJourneyLeg = _createParseJourneyLeg(profile, opt, data)
	const parseJourneyLegWithLoadFactor = (j, pt, parseStopovers) => {
		const result = parseJourneyLeg(j, pt, parseStopovers)
		if (pt.jny && pt.jny.dTrnCmpSX && Array.isArray(pt.jny.dTrnCmpSX.tcocX)) {
			const {tcocL} = data.raw.common
			const load = parseLoadFactor(opt, tcocL, pt.jny.dTrnCmpSX.tcocX)
			if (load) result.loadFactor = load
		}
		return result
	}
	return parseJourneyLegWithLoadFactor
}

const hintsByCode = Object.assign(Object.create(null), {
	fb: {
		type: 'hint',
		code: 'bicycle-conveyance',
		summary: 'bicycles conveyed'
	},
	fr: {
		type: 'hint',
		code: 'bicycle-conveyance-reservation',
		summary: 'bicycles conveyed, subject to reservation'
	},
	nf: {
		type: 'hint',
		code: 'no-bicycle-conveyance',
		summary: 'bicycles not conveyed'
	},
	k2: {
		type: 'hint',
		code: '2nd-class-only',
		summary: '2. class only'
	},
	eh: {
		type: 'hint',
		code: 'boarding-ramp',
		summary: 'vehicle-mounted boarding ramp available'
	},
	ro: {
		type: 'hint',
		code: 'wheelchairs-space',
		summary: 'space for wheelchairs'
	},
	oa: {
		type: 'hint',
		code: 'wheelchairs-space-reservation',
		summary: 'space for wheelchairs, subject to reservation'
	},
	wv: {
		type: 'hint',
		code: 'wifi',
		summary: 'WiFi available'
	},
	wi: {
		type: 'hint',
		code: 'wifi',
		summary: 'WiFi available'
	},
	sn: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase'
	},
	mb: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase'
	},
	mp: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase at the seat'
	},
	bf: {
		type: 'hint',
		code: 'barrier-free',
		summary: 'barrier-free'
	},
	rg: {
		type: 'hint',
		code: 'barrier-free-vehicle',
		summary: 'barrier-free vehicle'
	},
	bt: {
		type: 'hint',
		code: 'on-board-bistro',
		summary: 'Bordbistro available'
	},
	br: {
		type: 'hint',
		code: 'on-board-restaurant',
		summary: 'Bordrestaurant available'
	},
	ki: {
		type: 'hint',
		code: 'childrens-area',
		summary: `children's area available`
	},
	kk: {
		type: 'hint',
		code: 'parents-childrens-compartment',
		summary: `parent-and-children compartment available`
	},
	kr: {
		type: 'hint',
		code: 'kids-service',
		summary: 'DB Kids Service available'
	},
	ls: {
		type: 'hint',
		code: 'power-sockets',
		summary: 'power sockets available'
	},
	ev: {
		type: 'hint',
		code: 'replacement-service',
		summary: 'replacement service'
	},
	kl: {
		type: 'hint',
		code: 'air-conditioned',
		summary: 'air-conditioned vehicle'
	},
	r0: {
		type: 'hint',
		code: 'upward-escalator',
		summary: 'upward escalator'
	},
	au: {
		type: 'hint',
		code: 'elevator',
		summary: 'elevator available'
	},
	ck: {
		type: 'hint',
		code: 'komfort-checkin',
		summary: 'Komfort-Checkin available'
	},
	it: {
		type: 'hint',
		code: 'ice-sprinter',
		summary: 'ICE Sprinter service'
	},
	rp: {
		type: 'hint',
		code: 'compulsory-reservation',
		summary: 'compulsory seat reservation'
	},
	rm: {
		type: 'hint',
		code: 'optional-reservation',
		summary: 'optional seat reservation'
	},
	scl: {
		type: 'hint',
		code: 'all-2nd-class-seats-reserved',
		summary: 'all 2nd class seats reserved'
	},
	acl: {
		type: 'hint',
		code: 'all-seats-reserved',
		summary: 'all seats reserved'
	},
	sk: {
		type: 'hint',
		code: 'oversize-luggage-forbidden',
		summary: 'oversize luggage not allowed'
	},
	hu: {
		type: 'hint',
		code: 'animals-forbidden',
		summary: 'animals not allowed, except guide dogs'
	},
	ik: {
		type: 'hint',
		code: 'baby-cot-required',
		summary: 'baby cot/child seat required'
	},
	ee: {
		type: 'hint',
		code: 'on-board-entertainment',
		summary: 'on-board entertainment available'
	},
	toilet: {
		type: 'hint',
		code: 'toilet',
		summary: 'toilet available'
	},
	oc: {
		type: 'hint',
		code: 'wheelchair-accessible-toilet',
		summary: 'wheelchair-accessible toilet available'
	},
	iz: {
		type: 'hint',
		code: 'intercity-2',
		summary: 'Intercity 2'
	}
})

const codesByText = Object.assign(Object.create(null), {
	'journey cancelled': 'journey-cancelled', // todo: German variant
	'stop cancelled': 'stop-cancelled', // todo: change to `stopover-cancelled`, German variant
	'signal failure': 'signal-failure',
	'signalstörung': 'signal-failure',
	'additional stop': 'additional-stopover', // todo: German variant
	'platform change': 'changed platform', // todo: use dash, German variant
})

const parseHint = (profile, h, icons) => {
	if (h.type === 'A') {
		const hint = hintsByCode[h.code && h.code.trim().toLowerCase()]
		if (hint) {
			return Object.assign({text: h.txtN}, hint)
		}
	}

	const res = _parseHint(profile, h, icons)
	if (res && h.txtN) {
		const text = trim(h.txtN.toLowerCase(), ' ()')
		if (codesByText[text]) res.code = codesByText[text]
	}
	return res
}

const isIBNR = /^\d{6,}$/
const formatStation = (id) => {
	if (!isIBNR.test(id)) throw new Error('station ID must be an IBNR.')
	return _formatStation(id)
}

// todo: find option for absolute number of results

const dbProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://reiseauskunft.bahn.de/bin/mgate.exe',

	salt: Buffer.from('bdI8UVj40K5fvxwf', 'utf8'),
	addChecksum: true,

	transformReqBody,
	transformJourneysQuery,

	products: products,

	// todo: parseLocation
	parseJourney: createParseJourney,
	parseJourneyLeg: createParseJourneyLeg,
	parseLine: createParseLine,
	parseArrival: createParseArrival,
	parseDeparture: createParseDeparture,
	parseHint,

	formatStation,

	trip: true, // todo: #49
	radar: true,
	reachableFrom: true
}

module.exports = dbProfile
