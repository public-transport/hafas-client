'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const formatRefreshJourneyReq = ({opt}, refreshToken) => {
	return {
		meth: 'Reconstruction',
		req: {
			outReconL: [{ctx: refreshToken}],
		},
	}
}

const hvvProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourney: true,
	formatRefreshJourneyReq,

	departuresGetPasslist: false, // `departures()`: support for `getPasslist`?
	departuresStbFltrEquiv: false, // `departures()`: support for `stbFltrEquiv`?
}

module.exports = hvvProfile
