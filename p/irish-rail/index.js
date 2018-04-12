'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'IPA',
		id: 'IRISHRAIL',
		v: '4000100',
		name: 'IrishRailPROD-APPSTORE',
		os: 'iOS 12.4.8',
	}
	body.ver = '1.18'

	body.auth = {type: 'AID', aid: 'P9bplgVCGnozdgQE'}
	body.lang = 'ga'

	return body
}

const irishRailProfile = {
	locale: 'en-IE',
	timezone: 'Europe/Dublin',
	endpoint: 'https://journeyplanner.irishrail.ie/bin/mgate.exe',
	transformReqBody,

	salt: Buffer.from('i5s7m3q9z6b4k1c2', 'utf8'),
	addMicMac: true,

	products: products,

	trip: true,
	radar: true,
}

module.exports = irishRailProfile;
