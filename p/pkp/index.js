import {parseHook} from '../../lib/profile-hooks.js'

import {parseLocation} from '../../parse/location.js'
import baseProfile from './base.json'
import {products} from './products.js'

const trimStopName = ({parsed}, l) => {
	if (parsed.type === 'stop' || parsed.type === 'station' && parsed.name) {
		parsed.name = parsed.name.replace(/(^-|-$)/g, '')
	}
	return parsed
}

const profile = {
	...baseProfile,
	locale: 'pl-PL',
	timezone: 'Europe/Warsaw',

	products,

	parseLocation: parseHook(parseLocation, trimStopName),

	trip: true,
	radar: true,
	refreshJourney: false,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

export {
	profile,
}
