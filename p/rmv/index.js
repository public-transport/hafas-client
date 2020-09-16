'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'WEB', id: 'RMV', name: 'webapp'}
	body.ext = 'RMV.1'
	body.ver = '1.18'
	body.auth = {type: 'AID', aid: 'x0k4ZR33ICN9CWmj'}

	return body
}

const hvvProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://www.rmv.de/auskunft/bin/jp/mgate.exe',

	transformReqBody,

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = hvvProfile
