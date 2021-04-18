'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const invgProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
}

module.exports = invgProfile
