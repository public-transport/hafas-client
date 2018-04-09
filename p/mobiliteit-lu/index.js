'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'IPH',
		id: 'HAFAS',
		v: '4000200',
		name: 'mobiliteit.luPROD',
		os: 'iPhone OS 9.3.5',
	}
	body.ver = '1.15'
	body.auth = {aid: 'Aqf9kNqJLjxFx6vv'}
	body.lang = 'de'

	return body
}

const mobiliteitLuProfile = {
	locale: 'de-LU',
	timezone: 'Europe/Luxembourg',
	endpoint: 'https://travelplanner.mobiliteit.lu/hafas/mgate.exe',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,
}

module.exports = mobiliteitLuProfile;
