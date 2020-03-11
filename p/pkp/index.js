'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'AND', id: 'HAFAS', name: 'Rozklad-PKP', v: '1000110'}
	body.ver = '1.18' // 1.24 is used by the app, but that version doesn't support getPassList for departures/arrivals
	body.auth = {type: 'AID', aid: 'DrxJYtYZQpEBCtcb'}

	return body
}

const pkpProfile = {
	locale: 'pl-PL',
	timezone: 'Europe/Warsaw',
	endpoint: 'https://mobil.rozklad-pkp.pl:8019/bin/mgate.exe',

	transformReqBody,

	products,

	trip: true,
	radar: true,
	refreshJourney: false,
	reachableFrom: true
}

module.exports = pkpProfile
