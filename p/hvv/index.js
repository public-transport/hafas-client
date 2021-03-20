'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const hvvProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	salt: Buffer.from(baseProfile.salt, 'utf8'),
	addMicMac: true,

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
	lines: false, // fails with `FAIL` "HCI Service: request failed"
}

module.exports = hvvProfile
