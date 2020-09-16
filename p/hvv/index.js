'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'AND', id: 'HVV', name: 'HVVPROD_ADHOC', v: '4020100'}
	body.ext = 'HVV.1'
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'andcXUmC9Mq6hjrwDIGd2l3oiaMrTUzyH'}

	return body
}

const hvvProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://hvv-app.hafas.de/bin/mgate.exe',

	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	salt: Buffer.from('pqjM3iKEGOAhYbX76k9R5zutv', 'utf-8'),
	addMicMac: true,

	transformReqBody,

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = hvvProfile
