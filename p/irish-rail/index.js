'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'ga'

	return body
}

const irishRailProfile = {
	...baseProfile,

	locale: 'en-IE',
	timezone: 'Europe/Dublin',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
}

module.exports = irishRailProfile;
