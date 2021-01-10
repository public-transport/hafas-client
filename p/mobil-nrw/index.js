'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		id: 'DB-REGIO-NRW',
		name: 'NRW',
		os: 'iOS 12.4.9',
		type: 'IPH',
		v: '6000300',
	}
	body.ver = '1.24'
	body.auth = {
		type: 'AID',
		aid: 'Kdf0LNRWYg5k3499'
	}
	body.lang = 'de'
	// body.ext = 'DB.R19.04.a'

	return body
}

const cflProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://nrw.hafas.de/bin/mgate.exe',
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
