'use strict'

const baseProfile = require('./base.json')

const products = [{
	id: 'bus',
	mode: 'bus',
	bitmasks: [32],
	name: 'Bus',
	short: 'Bus',
	default: true,
}]

const dartProfile = {
	...baseProfile,
	locale: 'en-US',
	timezone: 'America/Chicago',

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
	radar: true,
}

module.exports = dartProfile
