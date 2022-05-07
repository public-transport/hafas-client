// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L5
// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L47-L234

import {parseHook} from '../../lib/profile-hooks.js'

import {parseLocation as _parseLocation} from '../../parse/location.js'
import {parseMovement as _parseMovement} from '../../parse/movement.js'
const baseProfile = require('./base.json')
import {products} from './products.js'

// ÖBB has some 'stations' **in austria** with no departures/products,
// like station entrances, that are actually POIs.
const fixWeirdPOIs = ({parsed}) => {
	if (
		(parsed.type === 'station' || parsed.type === 'stop') &&
		!parsed.products &&
		parsed.name &&
		parsed.id && parsed.id.length !== 7
	) {
		return Object.assign({
			type: 'location',
			id: parsed.id,
			poi: true,
			name: parsed.name
		}, parsed.location)
	}
	return parsed
}

const fixMovement = ({parsed}, m) => {
	// filter out POIs
	// todo: make use of them, as some of them specify fare zones
	parsed.nextStopovers = parsed.nextStopovers.filter(st => {
		let s = st.stop || {}
		if (s.station) s = s.station
		return s.type === 'stop' || s.type === 'station'
	})
	parsed.frames = parsed.frames.filter((f) => {
		return f.origin.type !== 'location' && f.destination.type !== 'location'
	})
	return parsed
}

const profile = {
	...baseProfile,
	locale: 'de-AT',
	timezone: 'Europe/Vienna',
	defaultLanguage: 'de',

	products: products,

	parseLocation: parseHook(_parseLocation, fixWeirdPOIs),
	parseMovement: parseHook(_parseMovement, fixMovement),

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
	// lines: false, // `.svcResL[0].res.lineL[]` is missing 🤔
}

export {
	profile,
}
