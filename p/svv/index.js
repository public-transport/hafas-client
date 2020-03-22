'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'WEB', id: 'VAO', name: 'webapp'}
	body.ext = 'VAO.11'
	body.ver = '1.20'
	body.auth = {type: 'AID', aid: 'wf7mcf9bv3nv8g5f'}
	return body
}

const svvProfile = {
	locale: 'at-DE',
	timezone: 'Europe/Vienna',
	endpoint: 'https://fahrplan.salzburg-verkehr.at/bin/mgate.exe',

	transformReqBody,

	products,

	trip: true,
	refreshJourney: true,
	reachableFrom: true,
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = svvProfile
