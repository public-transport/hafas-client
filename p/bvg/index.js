'use strict'

const shorten = require('vbb-short-station-name')
const {to12Digit, to9Digit} = require('vbb-translate-ids')
const parseLineName = require('vbb-parse-line')
const getStations = require('vbb-stations')

const _createParseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _createParseDeparture = require('../../parse/departure')
const _createParseJourneyLeg = require('../../parse/journey-leg')
const _formatStation = require('../../format/station')

const products = require('./products')

const transformReqBody = (body) => {
	body.client = {type: 'IPA', id: 'BVG', name: 'FahrInfo', v: '6020000'}
	body.ext = 'BVG.1'
	body.ver = '1.21'
	body.auth = {type: 'AID', aid: 'Mz0YdF9Fgx0Mb9'}

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

const createParseJourneyLeg = (profile, opt, data) => {
	const _parseJourneyLeg = _createParseJourneyLeg(profile, opt, data)
	const parseJourneyLeg = (journey, leg, parseStopovers = true) => {
		if (leg.type === 'KISS') {
			const icon = data.icons[leg.icoX]
			if (icon && icon.type === 'prod_berl') {
				const res = _parseJourneyLeg(journey, {...leg, type: 'WALK'}, parseStopovers)
				delete res.walking

				const mcp = leg.dep.mcp || {}
				const mcpData = mcp.mcpData || {}
				// todo: mcp.lid
				// todo: mcpData.occupancy, mcpData.type
				// todo: journey.trfRes.bkgData
				res.line = {
					type: 'line',
					id: null, // todo
					// todo: fahrtNr?
					name: mcpData.providerName,
					public: true,
					mode: 'taxi',
					product: 'berlkoenig'
					// todo: operator
				}
				return res
			}
		}
		return _parseJourneyLeg(journey, leg, parseStopovers)
	}
	return parseJourneyLeg
}

const validIBNR = /^\d+$/
const formatStation = (id) => {
	if ('string' !== typeof id) throw new Error('station ID must be a string.')
	const l = id.length
	if ((l !== 7 && l !== 9 && l !== 12) || !validIBNR.test(id)) {
		throw new Error('station ID must be a valid IBNR.')
	}
	// BVG has some 7-digit stations. We don't convert them to 12 digits,
	// because it only recognizes in the 7-digit format. see derhuerst/vbb-hafas#22
	if (l !== 7) id = to9Digit(id)
	return _formatStation(id)
}

// use the Berlkönig ride sharing service?
const requestJourneysWithBerlkoenig = (query, opt) => {
	if (('numF' in query) && opt.berlkoenig) {
		// todo: check if this is still true
		throw new Error('The `berlkoenig` and `results` options are mutually exclusive.')
	}
	query.jnyFltrL.push({type: 'GROUP', mode: 'INC', value: 'OEV'})
	if (opt.berlkoenig) query.jnyFltrL.push({type: 'GROUP', mode: 'INC', value: 'BERLKOENIG'})
	query.gisFltrL = [{meta: 'foot_speed_normal', type: 'M', mode: 'FB'}]
	return query
}

// todo: adapt/extend `vbb-parse-ticket` to support the BVG markup

const bvgProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://bvg-apps.hafas.de/bin/mgate.exe',

	transformReqBody,
	transformJourneysQuery: requestJourneysWithBerlkoenig,

	products,

	parseStationName: shorten,
	parseLocation,
	parseLine: createParseLine,
	parseDeparture: createParseDeparture,
	parseJourneyLeg: createParseJourneyLeg,

	formatStation,

	departuresGetPasslist: false, // `departures()` method: support for `getPasslist` field?
	departuresStbFltrEquiv: false, // `departures()` method: support for `stbFltrEquiv` field?
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true
}

module.exports = bvgProfile
