'use strict'

const parseLineName = require('vbb-parse-line')
const {parseHook} = require('../../lib/profile-hooks')

const parseAndAddLocationDHID = require('./parse-loc-dhid')
const _parseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _parseJourney = require('../../parse/journey')
const _parseDeparture = require('../../parse/departure')

const baseProfile = require('./base.json')
const products = require('./products')

// todo: https://m.tagesspiegel.de/berlin/fahrerlebnis-wie-im-regionalexpress-so-faehrt-es-sich-in-der-neuen-express-s-bahn/25338674.html
const parseLineWithMoreDetails = ({parsed}, p) => {
	parsed.name = p.name.replace(/^(bus|tram)\s+/i, '')
	const details = parseLineName(parsed.name)
	parsed.symbol = details.symbol
	parsed.nr = details.nr
	parsed.metro = details.metro
	parsed.express = details.express
	parsed.night = details.night

	return parsed
}

const parseLocation = ({parsed}, l) => {
	parseAndAddLocationDHID(parsed, l)
	return parsed
}

// todo: move this to parse/tickets.js?
const parseJourneyWithTickets = ({parsed}, j) => {
	if (
		j.trfRes &&
		Array.isArray(j.trfRes.fareSetL)
	) {
		parsed.tickets = j.trfRes.fareSetL
			.map((s) => {
				if (!Array.isArray(s.fareL) || s.fareL.length === 0) return null
				return {
					name: s.name,
					description: s.desc,
					tickets: s.fareL.map((f) => ({
						// todo: sometimes there's also t.ticketL
						name: f.name,
						price: f.price,
					})),
				}
			})
			.filter(set => !!set)

		// todo: j.trfRes.totalPrice
		// todo: j.trfRes.msgL
	}

	return parsed
}

const ringbahnClockwise = /^ringbahn s\s?41$/i
const ringbahnAnticlockwise = /^ringbahn s\s?42$/i
const parseDepartureRenameRingbahn = ({parsed}) => {
	if (parsed.line && parsed.line.product === 'suburban') {
		const d = parsed.direction && parsed.direction.trim()
		if (ringbahnClockwise.test(d)) {
			parsed.direction = 'Ringbahn S41 ⟳'
		} else if (ringbahnAnticlockwise.test(d)) {
			parsed.direction = 'Ringbahn S42 ⟲'
		}
	}
	return parsed
}

const vbbProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,

	parseLine: parseHook(_parseLine, parseLineWithMoreDetails),
	parseLocation: parseHook(_parseLocation, parseLocation),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseDeparture: parseHook(_parseDeparture, parseDepartureRenameRingbahn),

	journeysWalkingSpeed: true,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

module.exports = vbbProfile
