'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const invgProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
}

module.exports = invgProfile
