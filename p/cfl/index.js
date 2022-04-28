'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const cflProfile = {
	...baseProfile,
	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',
	defaultLanguage: 'de',

	products: products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
	remarksGetPolyline: false,
}

module.exports = cflProfile;
