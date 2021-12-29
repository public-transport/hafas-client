'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const zvvProfile = {
	...baseProfile,
	locale: 'de-CH',
	timezone: 'Europe/Zurich',

	products,

	trip: true,
	radar: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
}

module.exports = zvvProfile
