'use strict'

const crypto = require('crypto')

const _parseLine = require('../../parse/line')
const _createParseJourney = require('../../parse/journey')
const _formatStation = require('../../format/station')
const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')
const {accessibility, bike} = require('../../format/filters')

const modes = require('./modes')
const formatLoyaltyCard = require('./loyalty-cards').format

const formatBitmask = createFormatBitmask(modes)

const transformReqBody = (body) => {
	body.client = {id: 'DB', v: '16040000', type: 'IPH', name: 'DB Navigator'}
	body.ext = 'DB.R15.12.a'
	body.ver = '1.15'
	body.auth = {type: 'AID', aid: 'n91dB8Z77MLdoR0K'}

	return body
}

const salt = 'bdI8UVj40K5fvxwf'
const transformReq = (req) => {
	const hash = crypto.createHash('md5')
	hash.update(req.body + salt)

	if (!req.query) req.query = {}
	req.query.checksum = hash.digest('hex')

	return req
}

const transformJourneysQuery = (query, opt) => {
	const filters = query.jnyFltrL
	if (opt.accessibility && accessibility[opt.accessibility]) {
		filters.push(accessibility[opt.accessibility])
	}
	if (opt.bike) filters.push(bike)

	query.trfReq = {
		jnyCl: 2, // todo
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

const parseLine = (profile, l) => {
	const res = _parseLine(profile, l)

	res.mode = res.product = null
	if ('class' in res) {
		const data = modes.bitmasks[parseInt(res.class)]
		if (data) {
			res.mode = data.mode
			res.product = data.product
		}
	}

	return res
}

const createParseJourney = (profile, stations, lines, remarks) => {
	const parseJourney = _createParseJourney(profile, stations, lines, remarks)

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
				res.price = {amount: tariff.prc / 100, hint: null}
			}
		}

		return res
	}

	return parseJourneyWithPrice
}

const isIBNR = /^\d{6,}$/
const formatStation = (id) => {
	if (!isIBNR.test(id)) throw new Error('station ID must be an IBNR.')
	return _formatStation(id)
}

const defaultProducts = {
	suburban: true,
	subway: true,
	tram: true,
	bus: true,
	ferry: true,
	national: true,
	nationalExp: true,
	regional: true,
	regionalExp: true
}
const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: formatBitmask(products) + ''
	}
}

// todo: find option for absolute number of results

const dbProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://reiseauskunft.bahn.de/bin/mgate.exe',
	transformReqBody,
	transformReq,
	transformJourneysQuery,

	products: modes.allProducts,

	// todo: parseLocation
	parseLine,
	parseProducts: createParseBitmask(modes.bitmasks),
	parseJourney: createParseJourney,

	formatStation,
	formatProducts
}

module.exports = dbProfile
