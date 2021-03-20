'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const hvvProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	refreshJourney: true,
	reachableFrom: true,
	// fails with `CGI_READ_FAILED`
	// radar: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = hvvProfile
