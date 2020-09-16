'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'IPH',
		id: 'HAFAS',
		v: '4000000',
		name: 'cflPROD-STORE',
		os: 'iPhone OS 9.3.5'
	}
	body.ver = '1.16'
	body.auth = {aid: 'ALT2vl7LAFDFu2dz'}
	body.lang = 'de'

	return body
}

const cflProfile = {
	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',
	endpoint: 'https://horaires.cfl.lu/bin/mgate.exe',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	// todo: reachableFrom?
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = cflProfile;
