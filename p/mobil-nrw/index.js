'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const cflProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourneyUseOutReconL: true,
	remarks: true,
}

module.exports = cflProfile;
