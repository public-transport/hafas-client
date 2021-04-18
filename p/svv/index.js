'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const svvProfile = {
	...baseProfile,
	locale: 'at-DE',
	timezone: 'Europe/Vienna',

	products,

	trip: true,
	refreshJourney: true,
	reachableFrom: true,
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = svvProfile
