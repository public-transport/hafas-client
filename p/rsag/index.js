'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const rsagProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourneyUseOutReconL: true,
}

module.exports = rsagProfile
