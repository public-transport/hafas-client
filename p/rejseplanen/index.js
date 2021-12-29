'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const rejseplanenProfile = {
	...baseProfile,
	locale: 'da-DK',
	timezone: 'Europe/Copenhagen',

	products: products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
}

module.exports = rejseplanenProfile;
