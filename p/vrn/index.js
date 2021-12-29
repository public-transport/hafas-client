'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const hvvProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourney: true,
	refreshJourneyUseOutReconL: true,
}

module.exports = hvvProfile
