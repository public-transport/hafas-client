'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const saarfahrplanProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,

	departuresGetPasslist: true,
	trip: true,
	radar: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = saarfahrplanProfile
