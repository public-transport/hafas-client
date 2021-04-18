'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'de'
	return body
}

const cflProfile = {
	...baseProfile,
	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',
	transformReqBody,

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
