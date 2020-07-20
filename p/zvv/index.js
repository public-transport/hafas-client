'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'IPH', id: 'ZVV', name: 'zvvPROD-STORE', v: '6000400'}
	body.ext = 'ZVV.2'
	body.ver = '1.24'
	body.auth = {type: 'AID', aid: 'TLRUqdDPF7ttB824Yoy2BN8mk'}

	return body
}

const zvvProfile = {
	locale: 'de-CH',
	timezone: 'Europe/Zurich',
	endpoint: 'https://online.fahrplan.zvv.ch/bin/mgate.exe',

	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	salt: Buffer.from('jCcZ864meuAbqGZ', 'utf-8'),
	addMicMac: true,

	transformReqBody,

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,

	trip: true,
	radar: true,
	// todo: fails with "Parser error: root.svcReqL.svcReqL.req(ctxRecon)"
	refreshJourney: false,
	reachableFrom: true,
}

module.exports = zvvProfile
