'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const mobiliteitLuProfile = {
	...baseProfile,
	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,

	refreshJourneyUseOutReconL: true,
}

module.exports = mobiliteitLuProfile;
