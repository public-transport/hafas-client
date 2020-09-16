'use strict'

const {parseHook} = require('../../lib/profile-hooks')

const parseLocation = require('../../parse/location')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'AND', id: 'HAFAS', name: 'Rozklad-PKP', v: '1000110'}
	body.ver = '1.18' // 1.24 is used by the app, but that version doesn't support getPassList for departures/arrivals
	body.auth = {type: 'AID', aid: 'DrxJYtYZQpEBCtcb'}

	return body
}

const trimStopName = ({parsed}, l) => {
	if (parsed.type === 'stop' || parsed.type === 'station' && parsed.name) {
		parsed.name = parsed.name.replace(/(^-|-$)/g, '')
	}
	return parsed
}

const pkpProfile = {
	locale: 'pl-PL',
	timezone: 'Europe/Warsaw',
	endpoint: 'https://mobil.rozklad-pkp.pl:8019/bin/mgate.exe',

	transformReqBody,

	products,

	parseLocation: parseHook(parseLocation, trimStopName),

	trip: true,
	radar: true,
	refreshJourney: false,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = pkpProfile
