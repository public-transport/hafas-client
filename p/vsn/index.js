'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'de'

	return body
}

const formatRefreshJourneyReq = (ctx, refreshToken) => {
	// eslint-disable-next-line no-unused-vars
	const {profile, opt} = ctx

	return {
		meth: 'Reconstruction',
		req: {
			outReconL: [{ctx: refreshToken}],
			getIST: true, // todo: make an option
			getPasslist: !!opt.stopovers,
			getPolyline: !!opt.polylines,
			getTariff: !!opt.tickets
		}
	}
}

const vsnProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	formatRefreshJourneyReq,

	products: products,

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false
}

module.exports = vsnProfile
