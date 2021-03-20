'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'en' // todo: `de`?

	return body
}

const insaProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	refreshJourney: false,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = insaProfile;
