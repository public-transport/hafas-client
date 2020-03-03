'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'IPH', id: 'VBN', name: 'vbn', v: '6000000'}
	body.ver = '1.27'
	body.auth = {type: 'AID', aid: 'kaoxIXLn03zCr2KR'}

	return body
}

const insaProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://fahrplaner.vbn.de/bin/mgate.exe',

	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	// https://gist.github.com/derhuerst/fd2f81a597bde66cb1f689006d574d7f#file-config-txt-L22-L23
	salt: Buffer.from('SP31mBufSyCLmNxp', 'utf-8'),
	addMicMac: true,

	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,

	// todo: these fail with ver >= 1.21, see #164
	refreshJourney: false,
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = insaProfile;
