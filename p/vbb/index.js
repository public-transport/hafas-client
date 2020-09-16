'use strict'

const shorten = require('vbb-short-station-name')
const {to12Digit, to9Digit} = require('vbb-translate-ids')
const parseLineName = require('vbb-parse-line')
const parseTicket = require('vbb-parse-ticket')
const getStations = require('vbb-stations')
const {parseHook} = require('../../lib/profile-hooks')

const _parseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _parseJourney = require('../../parse/journey')
const _parseDeparture = require('../../parse/departure')
const _formatStation = require('../../format/station')

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'IPA', id: 'VBB', name: 'vbbPROD', v: '4010300'}
	body.ext = 'VBB.1'
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'hafas-vbb-apps'}

	return body
}

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
	if ((parsed.type === 'stop' || parsed.type === 'station') && parsed.id[0] === '9') {
		parsed.name = shorten(parsed.name)
		parsed.id = to12Digit(parsed.id)
		if (!parsed.location.latitude || !parsed.location.longitude) {
			const [s] = getStations(parsed.id)
			if (s) Object.assign(parsed.location, s.location)
		}
	}
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

const validIBNR = /^\d+$/
const formatStation = (id) => {
	if ('string' !== typeof id) throw new TypeError('station ID must be a string.')
	if (!validIBNR.test(id)) {
		throw new Error('station ID must be a valid IBNR.')
	}
	// The VBB has some 7-digit stations. We don't convert them to 12 digits,
	// because it only recognizes in the 7-digit format. see derhuerst/vbb-hafas#22
	if (id.length !== 7) id = to9Digit(id)
	return _formatStation(id)
}

const vbbProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://fahrinfo.vbb.de/bin/mgate.exe',

	// https://gist.github.com/derhuerst/a8d94a433358abc015ff77df4481070c#file-haf_config_base-properties-L39
	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	salt: Buffer.from('5243544a4d3266467846667878516649', 'hex'),
	addMicMac: true,

	transformReqBody,

	products: products,

	parseLine: parseHook(_parseLine, parseLineWithMoreDetails),
	parseLocation: parseHook(_parseLocation, parseLocation),
	parseStationName: (ctx, name) => shorten(name),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseDeparture: parseHook(_parseDeparture, parseDepartureRenameRingbahn),

	formatStation,

	journeysWalkingSpeed: true,
	trip: true,
	radar: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = vbbProfile
