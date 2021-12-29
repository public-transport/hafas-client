'use strict'

const shorten = require('vbb-short-station-name')
const parseLineName = require('vbb-parse-line')
const parseTicket = require('vbb-parse-ticket')
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

const parseJourneyWithTickets = ({parsed}, j) => {
	if (
		j.trfRes &&
		Array.isArray(j.trfRes.fareSetL) &&
		j.trfRes.fareSetL[0] &&
		Array.isArray(j.trfRes.fareSetL[0].fareL)
	) {
		parsed.tickets = []
		const sets = j.trfRes.fareSetL[0].fareL
		for (let s of sets) {
			if (!Array.isArray(s.ticketL) || s.ticketL.length === 0) continue
			for (let t of s.ticketL) {
				const ticket = parseTicket(t)
				ticket.name = s.name + ' – ' + ticket.name
				parsed.tickets.push(ticket)
			}
		}
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
	parseStationName: (ctx, name) => shorten(name),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseDeparture: parseHook(_parseDeparture, parseDepartureRenameRingbahn),

	journeysWalkingSpeed: true,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

module.exports = vbbProfile
