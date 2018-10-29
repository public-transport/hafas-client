'use strict'

const shorten = require('vbb-short-station-name')
const {to12Digit, to9Digit} = require('vbb-translate-ids')
const parseLineName = require('vbb-parse-line')
const parseTicket = require('vbb-parse-ticket')
const getStations = require('vbb-stations')

const _createParseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _createParseJourney = require('../../parse/journey')
const _createParseDeparture = require('../../parse/departure')
const _formatStation = require('../../format/station')

const products = require('./products')

const transformReqBody = (body) => {
	body.client = {type: 'IPA', id: 'VBB', name: 'vbbPROD', v: '4010300'}
	body.ext = 'VBB.1'
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'hafas-vbb-apps'}

	return body
}

const createParseLine = (profile, opt, data) => {
	const parseLine = _createParseLine(profile, opt, data)

	const parseLineWithMoreDetails = (l) => {
		const res = parseLine(l)

		res.name = l.name.replace(/^(bus|tram)\s+/i, '')
		const details = parseLineName(res.name)
		res.symbol = details.symbol
		res.nr = details.nr
		res.metro = details.metro
		res.express = details.express
		res.night = details.night

		return res
	}
	return parseLineWithMoreDetails
}

const parseLocation = (profile, opt, data, l) => {
	const res = _parseLocation(profile, opt, data, l)

	if (res.type === 'stop' || res.type === 'station') {
		res.name = shorten(res.name)
		res.id = to12Digit(res.id)
		if (!res.location.latitude || !res.location.longitude) {
			const [s] = getStations(res.id)
			if (s) Object.assign(res.location, s.location)
		}
	}
	return res
}

const createParseJourney = (profile, opt, data) => {
	const parseJourney = _createParseJourney(profile, opt, data)

	const parseJourneyWithTickets = (j) => {
		const res = parseJourney(j)

		if (
			j.trfRes &&
			Array.isArray(j.trfRes.fareSetL) &&
			j.trfRes.fareSetL[0] &&
			Array.isArray(j.trfRes.fareSetL[0].fareL)
		) {
			res.tickets = []
			const sets = j.trfRes.fareSetL[0].fareL
			for (let s of sets) {
				if (!Array.isArray(s.ticketL) || s.ticketL.length === 0) continue
				for (let t of s.ticketL) {
					const ticket = parseTicket(t)
					ticket.name = s.name + ' – ' + ticket.name
					res.tickets.push(ticket)
				}
			}
		}

		return res
	}

	return parseJourneyWithTickets
}

const createParseDeparture = (profile, opt, data) => {
	const parseDeparture = _createParseDeparture(profile, opt, data)

	const ringbahnClockwise = /^ringbahn s\s?41$/i
	const ringbahnAnticlockwise = /^ringbahn s\s?42$/i
	const parseDepartureRenameRingbahn = (j) => {
		const res = parseDeparture(j)

		if (res.line && res.line.product === 'suburban') {
			const d = res.direction && res.direction.trim()
			if (ringbahnClockwise.test(d)) res.direction = 'Ringbahn S41 ⟳'
			else if (ringbahnAnticlockwise.test(d)) res.direction = 'Ringbahn S42 ⟲'
		}

		return res
	}

	return parseDepartureRenameRingbahn
}

const validIBNR = /^\d+$/
const formatStation = (id) => {
	if ('string' !== typeof id) throw new Error('station ID must be a string.')
	const l = id.length
	if ((l !== 7 && l !== 9 && l !== 12) || !validIBNR.test(id)) {
		throw new Error('station ID must be a valid IBNR.')
	}
	// The VBB has some 7-digit stations. We don't convert them to 12 digits,
	// because it only recognizes in the 7-digit format. see derhuerst/vbb-hafas#22
	if (l !== 7) id = to9Digit(id)
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

	parseStationName: shorten,
	parseLocation,
	parseLine: createParseLine,
	parseJourney: createParseJourney,
	parseDeparture: createParseDeparture,

	formatStation,

	journeysNumF: true,
	journeysWalkingSpeed: true,
	trip: true,
	radar: true,
	reachableFrom: true
}

module.exports = vbbProfile
