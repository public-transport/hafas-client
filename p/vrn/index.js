'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'IPH', id: 'DB-REGIO-VRN', name: 'VRN', v: '6000400'}
	body.ext = 'DB.R19.04.a'
	body.ver = '1.24'
	body.auth = {type: 'AID', aid: 'p091VRNZz79KtUz5'}

	return body
}

const formatRefreshJourneyReq = ({opt}, refreshToken) => {
	return {
		meth: 'Reconstruction',
		req: {
			outReconL: [{ctx: refreshToken}],
		},
	}
}

module.exports = formatRefreshJourneyReq

const hvvProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://vrn.hafas.de/bin/mgate.exe',

	transformReqBody,

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
