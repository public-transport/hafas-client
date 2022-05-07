// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import {parseHook} from '../../lib/profile-hooks.js'

import {parseLocation as _parseLocation} from '../../parse/location.js'
import {parseJourney as _parseJourney} from '../../parse/journey.js'
import {parseMovement as _parseMovement} from '../../parse/movement.js'
const baseProfile = require('./base.json')
import {products} from './products.js'

// todo: journey prices

const fixLocation = ({parsed}, l) => {
	// weird fix for empty lines, e.g. IC/EC at Flensburg Hbf
	if (parsed.lines) {
		parsed.lines = parsed.lines.filter(x => x.id && x.name)
	}

	// remove leading zeroes, todo
	if (parsed.id && parsed.id.length > 0) {
		parsed.id = parsed.id.replace(/^0+/, '')
	}

	return parsed
}

const parseJourneyWithTickets = ({parsed}, j) => {
	if (
		j.trfRes &&
		Array.isArray(j.trfRes.fareSetL) &&
		j.trfRes.fareSetL.length > 0
	) {
		parsed.tickets = []

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
				parsed.tickets.push(ticket)
			}
		}
	}

	return parsed
}

const fixMovement = ({parsed}, m) => {
	// filter out empty nextStopovers entries
	parsed.nextStopovers = parsed.nextStopovers.filter((f) => {
		return f.stop !== null || f.arrival !== null || f.departure !== null
	})
	return parsed
}

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	parseLocation: parseHook(_parseLocation, fixLocation),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseMovement: parseHook(_parseMovement, fixMovement),

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

export {
	profile,
}
