'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'WEB',
		id: 'MMILUX',
		name: 'webapp',
		l: 'vs_webapp',
	}
	body.ver = '1.25'
	body.auth = {type: 'AID', aid: 'SkC81GuwuzL4e0'}
	body.lang = 'de'

	return body
}

const mobiliteitLuProfile = {
	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',
	endpoint: 'https://cdt.hafas.de/bin/mgate.exe',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,

	// Version 1.25 doesn't seem to support getPasslist & stbFltrEquiv
	// for departures()/arrivals().
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = mobiliteitLuProfile;
