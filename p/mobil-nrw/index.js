'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'de'

	return body
}

const cflProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	transformReqBody,

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourneyUseOutReconL: true,
	remarks: true,
}

module.exports = cflProfile;
