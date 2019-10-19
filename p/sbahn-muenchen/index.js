'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'IPH', id: 'DB-REGIO-MVV', name: 'MuenchenNavigator', v: '5010100'}
	body.ext = 'DB.R15.12.a'
	body.ver = '1.18'
	body.auth = {type: 'AID', aid: 'd491MVVhz9ZZts23'}

	return body
}

const sBahnMunichProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://s-bahn-muenchen.hafas.de/bin/540/mgate.exe',

	salt: Buffer.from('ggnvMVV8RTt67gh1', 'utf8'),
	addMicMac: true,
	transformReqBody,

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true
}

module.exports = sBahnMunichProfile
