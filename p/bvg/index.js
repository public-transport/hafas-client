'use strict'

const shorten = require('vbb-short-station-name')
const {to12Digit, to9Digit} = require('vbb-translate-ids')
const parseLineName = require('vbb-parse-line')
const getStations = require('vbb-stations')
const {parseHook} = require('../../lib/profile-hooks')

const {
	parseLine: _parseLine,
	parseLocation: _parseLocation,
	parseArrival: _parseArrival,
	parseDeparture: _parseDeparture,
	parseStopover: _parseStopover,
	parseJourneyLeg: _parseJourneyLeg,
	formatStation: _formatStation,
} = require('../../lib/default-profile')

const baseProfile = require('./base.json')
const products = require('./products')

// todo: there's also a referenced icon `{"res":"occup_fig_{low,mid}"}`
const addOccupancy = (item, occupancyCodes) => {
	const remIdx = (item.remarks || [])
	.findIndex(r => r.code && occupancyCodes.has(r.code))
	if (remIdx < 0) return;
	const rem = item.remarks[remIdx]

	item.occupancy = occupancyCodes.get(rem.code)
	item.remarks = [
		...item.remarks.slice(0, remIdx),
		...item.remarks.slice(remIdx + 1),
	]
}
const stopoverOccupancyCodes = new Map([
	['text.occup.loc.max.11', 'low'],
	['text.occup.loc.max.12', 'medium'],
	['text.occup.loc.max.13', 'high'],
])
const journeyLegOccupancyCodes = new Map([
	['text.occup.jny.max.11', 'low'],
	['text.occup.jny.max.12', 'medium'],
	['text.occup.jny.max.13', 'high'],
])

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
	if (parsed.type === 'stop' || parsed.type === 'station') {
		parsed.name = shorten(parsed.name)
		parsed.id = to12Digit(parsed.id)
		if (!parsed.location.latitude || !parsed.location.longitude) {
			const [s] = getStations(parsed.id)
			if (s) Object.assign(parsed.location, s.location)
		}
	}
	return parsed
}

// todo: S45, S46?
const ringbahnClockwise = /^ringbahn s\s?41$/i
const ringbahnAnticlockwise = /^ringbahn s\s?42$/i
const parseDepartureRenameRingbahn = ({parsed}, dep) => {
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
const parseArrivalRenameRingbahn = ({parsed}, arr) => {
	if (parsed.line && parsed.line.product === 'suburban') {
		const p = parsed.provenance && parsed.provenance.trim()
		if (ringbahnClockwise.test(p)) {
			parsed.provenance = 'Ringbahn S41 ⟳'
		} else if (ringbahnAnticlockwise.test(p)) {
			parsed.provenance = 'Ringbahn S42 ⟲'
		}
	}
	return parsed
}

const parseArrDepWithOccupancy = ({parsed}, d) => {
	addOccupancy(parsed, stopoverOccupancyCodes)
	return parsed
}

const parseStopoverWithOccupancy = ({parsed}, st, date) => {
	addOccupancy(parsed, stopoverOccupancyCodes)
	return parsed
}

const parseJourneyLegWithBerlkönig = (ctx, leg, date) => {
	if (leg.type === 'KISS') {
		const icon = ctx.common.icons[leg.icoX]
		if (icon && icon.type === 'prod_berl') {
			const res = _parseJourneyLeg(ctx, {
				...leg, type: 'WALK'
			}, date)
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
	return _parseJourneyLeg(ctx, leg, date)
}
const parseJourneyLegWithOccupancy = ({parsed}, leg, date) => {
	if (leg.type === 'JNY') {
		addOccupancy(parsed, journeyLegOccupancyCodes)
	}
	return parsed
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
const requestJourneysWithBerlkoenig = ({opt}, query) => {
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
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	transformJourneysQuery: requestJourneysWithBerlkoenig,

	products,

	parseLine: parseHook(_parseLine, parseLineWithMoreDetails),
	parseLocation: parseHook(_parseLocation, parseLocation),
	parseStationName: (ctx, name) => shorten(name),
	parseArrival: parseHook(
		parseHook(_parseArrival, parseArrivalRenameRingbahn),
		parseArrDepWithOccupancy,
	),
	parseDeparture: parseHook(
		parseHook(_parseDeparture, parseDepartureRenameRingbahn),
		parseArrDepWithOccupancy,
	),
	parseStopover: parseHook(_parseStopover, parseStopoverWithOccupancy),
	parseJourneyLeg: parseHook(
		parseJourneyLegWithBerlkönig,
		parseJourneyLegWithOccupancy,
	),

	formatStation,

	departuresGetPasslist: false, // `departures()` method: support for `getPasslist` field?
	departuresStbFltrEquiv: false, // `departures()` method: support for `stbFltrEquiv` field?
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true
}

module.exports = bvgProfile
