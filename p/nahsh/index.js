'use strict'

const _parseLocation = require('../../parse/location')
const _createParseJourney = require('../../parse/journey')
const _createParseMovement = require('../../parse/movement')

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

const createParseMovement = (profile, locations, lines, remarks) => {
	const _parseMovement = _createParseMovement(profile, locations, lines, remarks)
	const parseMovement = (m) => {
		const res = _parseMovement(m)
		// filter out empty nextStops entries
		res.nextStops = res.nextStops.filter((f) => {
			return f.station !== null || f.arrival !== null || f.departure !== null
		})
		return res
	}
	return parseMovement
}

const nahshProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'http://nah.sh.hafas.de/bin/mgate.exe',
	transformReqBody,

	products,

	parseLocation,
	parseJourney: createParseJourney,
	parseMovement: createParseMovement,

	journeyLeg: true,
	radar: true // todo: see #34
}

module.exports = nahshProfile
