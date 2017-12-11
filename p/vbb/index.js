'use strict'

const shorten = require('vbb-short-station-name')
const {to12Digit, to9Digit} = require('vbb-translate-ids')
const parseLineName = require('vbb-parse-line')
const parseTicket = require('vbb-parse-ticket')

const _parseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _createParseJourney = require('../../parse/journey')
const _formatStation = require('../../format/station')
const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')

const modes = require('./modes')

const formatBitmask = createFormatBitmask(modes)

const transformReqBody = (body) => {
	body.client = {type: 'IPA', id: 'VBB', name: 'vbbPROD', v: '4010300'}
	body.ext = 'VBB.1'
	body.ver = '1.11' // todo: 1.16 with `mic` and `mac` query params
	body.auth = {type: 'AID', aid: 'hafas-vbb-apps'}

	return body
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

	const details = parseLineName(l.name)
	res.symbol = details.symbol
	res.nr = details.nr
	res.metro = details.metro
	res.express = details.express
	res.night = details.night

	return res
}

const parseLocation = (profile, l) => {
	const res = _parseLocation(profile, l)

	// todo: shorten has been made for stations, not any type of location
	res.name = shorten(res.name)

	if (res.type === 'station') {
		res.id = to12Digit(res.id)
		// todo: https://github.com/derhuerst/vbb-hafas/blob/1c64bfe42422e2648b21016d233c808460250308/lib/parse.js#L67-L75
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

const isIBNR = /^\d{9,}$/
const formatStation = (id) => {
	if (!isIBNR.test(id)) throw new Error('station ID must be an IBNR.')
	id = to9Digit(id)
	return _formatStation(id)
}

const defaultProducts = {
	suburban: true,
	subway: true,
	tram: true,
	bus: true,
	ferry: true,
	express: true,
	regional: true
}
const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: formatBitmask(products) + ''
	}
}

const vbbProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://fahrinfo.vbb.de/bin/mgate.exe',
	transformReqBody,

	parseStationName: shorten,
	parseLocation,
	parseLine,
	parseProducts: createParseBitmask(modes.bitmasks),
	parseJourney: createParseJourney,

	formatStation,
	formatProducts,

	journeyPart: true,
	radar: true
}

module.exports = vbbProfile
