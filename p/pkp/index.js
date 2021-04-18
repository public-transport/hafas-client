'use strict'

const {parseHook} = require('../../lib/profile-hooks')

const parseLocation = require('../../parse/location')
const baseProfile = require('./base.json')
const products = require('./products')

const trimStopName = ({parsed}, l) => {
	if (parsed.type === 'stop' || parsed.type === 'station' && parsed.name) {
		parsed.name = parsed.name.replace(/(^-|-$)/g, '')
	}
	return parsed
}

const pkpProfile = {
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

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = pkpProfile
