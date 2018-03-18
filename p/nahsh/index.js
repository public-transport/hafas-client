'use strict'

const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')
const _createParseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _createParseJourney = require('../../parse/journey')

const products = require('./products')

// todo: journey prices

const transformReqBody = (body) => {
	body.client = {
		id: 'NAHSH',
		name: 'NAHSHPROD',
		v: '3000700'
	}
	body.ver = '1.16'
	body.auth = {aid: 'r0Ot9FLFNAFxijLW'}
	body.lang = 'de'

	return body
}

const parseLocation = (profile, l, lines) => {
	const res = _parseLocation(profile, l, lines)
	// weird fix for empty lines, e.g. IC/EC at Flensburg Hbf
	if (res.lines) {
		res.lines = res.lines.filter(x => x.id && x.name)
	}

	// remove leading zeroes, todo
	if (res.id && res.id.length > 0) {
		res.id = res.id.replace(/^0+/, '')
	}

	return res
}

const createParseLine = (profile, operators) => {
	const parseLine = _createParseLine(profile, operators)

	const parseLineWithMode = (l) => {
		const res = parseLine(l)

		res.mode = res.product = null
		if ('class' in res) {
			const data = products.bitmasks[parseInt(res.class)]
			if (data) {
				res.mode = data.mode
				res.product = data.product
			}
		}

		return res
	}
	return parseLineWithMode
}

const createParseJourney = (profile, stations, lines, remarks) => {
	const parseJourney = _createParseJourney(profile, stations, lines, remarks)

	const parseJourneyWithTickets = (j) => {
		const res = parseJourney(j)

		if (
			j.trfRes &&
			Array.isArray(j.trfRes.fareSetL) &&
			j.trfRes.fareSetL.length > 0
		) {
			res.tickets = []

			for (let t of j.trfRes.fareSetL) {
				const tariff = t.desc
				if (!tariff || !Array.isArray(t.fareL)) continue
				for (let v of t.fareL) {
					const variant = v.name
					if(!variant) continue
					const ticket = {
						name: [tariff, variant].join(' - '),
						tariff,
						variant
					}
					if (v.prc && Number.isInteger(v.prc) && v.cur) {
						ticket.amount = v.prc/100
						ticket.currency = v.cur
					} else {
						ticket.amount = null
						ticket.hint = 'No pricing information available.'
					}
					res.tickets.push(ticket)
				}
			}
		}

		return res
	}

	return parseJourneyWithTickets
}

const defaultProducts = {
	nationalExp: true,
	national: true,
	interregional: true,
	regional: true,
	suburban: true,
	bus: true,
	ferry: true,
	subway: true,
	tram: true,
	onCall: true
}
const formatBitmask = createFormatBitmask(products)
const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: formatBitmask(products) + ''
	}
}

const nahshProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'http://nah.sh.hafas.de/bin/mgate.exe',
	transformReqBody,

	products: products.allProducts,

	parseProducts: createParseBitmask(products.allProducts, defaultProducts),
	parseLine: createParseLine,
	parseLocation,
	parseJourney: createParseJourney,

	formatProducts,

	journeyLeg: true,
	radar: false // todo: see #34
}

module.exports = nahshProfile
