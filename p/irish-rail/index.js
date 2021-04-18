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
	salt: Buffer.from('i5s7m3q9z6b4k1c2', 'utf8'),
	addMicMac: true,

	products: products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourney: false, // fails with `CGI_READ_FAILED`
	trip: true,
	radar: true,
}

module.exports = irishRailProfile;
