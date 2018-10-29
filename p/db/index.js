'use strict'

const trim = require('lodash/trim')

const _createParseJourney = require('../../parse/journey')
const _parseHint = require('../../parse/hint')
const _formatStation = require('../../format/station')
const {bike} = require('../../format/filters')

const products = require('./products')
const formatLoyaltyCard = require('./loyalty-cards').format

const transformReqBody = (body) => {
	body.client = {id: 'DB', v: '16040000', type: 'IPH', name: 'DB Navigator'}
	body.ext = 'DB.R15.12.a'
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'n91dB8Z77MLdoR0K'}

	return body
}

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

const createParseJourney = (profile, opt, data) => {
	const parseJourney = _createParseJourney(profile, opt, data)

	// todo: j.sotRating, j.conSubscr, j.isSotCon, j.showARSLink, k.sotCtxt
	// todo: j.conSubscr, j.showARSLink, j.useableTime
	const parseJourneyWithPrice = (journey) => {
		const res = parseJourney(journey)
		res.price = null
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
		if (
			journey.trfRes &&
			Array.isArray(journey.trfRes.fareSetL) &&
			journey.trfRes.fareSetL[0] &&
			Array.isArray(journey.trfRes.fareSetL[0].fareL) &&
			journey.trfRes.fareSetL[0].fareL[0]
		) {
			const tariff = journey.trfRes.fareSetL[0].fareL[0]
			if (tariff.prc >= 0) { // wat
				res.price = {
					amount: tariff.prc / 100,
					currency: 'EUR'
				}
			}
		}

		return res
	}

	return parseJourneyWithPrice
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
	parseHint,

	formatStation,

	trip: true, // todo: #49
	reachableFrom: true
}

module.exports = dbProfile
