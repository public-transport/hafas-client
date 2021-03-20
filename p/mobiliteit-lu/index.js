'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'de'

	return body
}

const mobiliteitLuProfile = {
	...baseProfile,

	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,

	// Version 1.25 doesn't seem to support getPasslist & stbFltrEquiv
	// for departures()/arrivals().
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = mobiliteitLuProfile;
