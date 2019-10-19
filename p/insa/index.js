'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'IPH',
		id: 'NASA',
		v: '4000200',
		name: 'nasaPROD',
		os: 'iPhone OS 11.2.5'
	}
	body.ver = '1.11'
	body.auth = {aid: "nasa-apps"}
	body.lang = 'en' // todo: `de`?

	return body
}

const insaProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://reiseauskunft.insa.de/bin/mgate.exe',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	refreshJourney: false
	// todo: upgrade to version `1.13` in order to enable `reachableFrom: true`
}

module.exports = insaProfile;
