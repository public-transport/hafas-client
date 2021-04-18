'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const sBahnMunichProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	salt: Buffer.from('ggnvMVV8RTt67gh1', 'utf8'),
	addMicMac: true,

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true
}

module.exports = sBahnMunichProfile
