'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const cmtaProfile = {
	...baseProfile,
	locale: 'en-US',
	timezone: 'America/Chicago',

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
	lines: false, // seems like ver >= 1.16 is required
}

module.exports = cmtaProfile
