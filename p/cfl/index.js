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

	trip: true,
	radar: true,
	// todo: reachableFrom?
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = cflProfile;
