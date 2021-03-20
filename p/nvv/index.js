'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'de'

	return body
}

const saarfahrplanProfile = {
	baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	transformReqBody,

	products: products,

	departuresGetPasslist: true,
	trip: true,
	radar: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = saarfahrplanProfile
