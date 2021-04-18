'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const cmtaProfile = {
	...baseProfile,
	locale: 'en-US',
	timezone: 'America/Chicago',

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarks: true, // `.svcResL[0].res.msgL[]` is missing though 🤔
}

module.exports = cmtaProfile
