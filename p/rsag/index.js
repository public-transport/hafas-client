'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'WEB', id: 'RSAG', name: 'webapp'}
	body.ext = 'VBN.2'
	body.ver = '1.24'
	body.auth = {type: 'AID', aid: 'tF5JTs25rzUhGrrl'}

	return body
}

const hvvProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://fahrplan.rsag-online.de/bin/mgate.exe',

	transformReqBody,

	products,

	trip: true,
	radar: true,
	reachableFrom: true,

	// todo: these fail ver >=1.21, see #164
	refreshJourney: false,
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = hvvProfile
