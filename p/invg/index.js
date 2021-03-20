'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const invgProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = invgProfile
