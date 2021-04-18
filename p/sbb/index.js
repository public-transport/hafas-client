'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const sbbProfile = {
	...baseProfile,
	locale: 'de-CH',
	timezone: 'Europe/Zurich',

	products: products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

const withLocale = (locale) => ({...sbbProfile, locale})

sbbProfile.withLocale = withLocale
module.exports = sbbProfile
