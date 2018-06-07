'use strict'

const _createParseJourney = require('../../parse/journey')
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

const createParseJourney = (profile, stations, lines, remarks, polylines) => {
	const parseJourney = _createParseJourney(profile, stations, lines, remarks, polylines)

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

	formatStation,

	journeyLeg: true // todo: #49
}

module.exports = dbProfile
