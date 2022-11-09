// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import {parseHook} from '../../lib/profile-hooks.js'

import {parseAndAddLocationDHID} from './parse-loc-dhid.js'
import {parseLine as _parseLine} from '../../parse/line.js'
import {parseLocation as _parseLocation} from '../../parse/location.js'
import {parseJourney as _parseJourney} from '../../parse/journey.js'
import {parseDeparture as _parseDeparture} from '../../parse/departure.js'

const baseProfile = require('./base.json')
import {products} from './products.js'

const parseLineWithShortName = ({parsed}, p) => {
	parsed.name = p.name.replace(/^(bus|tram)\s+/i, '')
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

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,

	parseLine: parseHook(_parseLine, parseLineWithShortName),
	parseLocation: parseHook(_parseLocation, parseLocation),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseDeparture: parseHook(_parseDeparture, parseDepartureRenameRingbahn),

	journeysWalkingSpeed: true,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

export {
	profile,
}
