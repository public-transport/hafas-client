'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const zvvProfile = {
	...baseProfile,
	locale: 'de-CH',
	timezone: 'Europe/Zurich',

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,

	trip: true,
	radar: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
}

module.exports = zvvProfile
