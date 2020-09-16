'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {type: 'IPH', id: 'HAFAS', name: 'VMT', v: '2040100'}
	body.ver = '1.18'
	body.auth = {type: 'AID', aid: 't2h7u1e6r4i8n3g7e0n'}

	return body
}

const hvvProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	// todo: what about `https://vmt.hafas.de/bin/mgate.exe`?
	endpoint: 'https://vmt.hafas.de/bin/ticketing/mgate.exe',

	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	// https://gist.github.com/derhuerst/b20adde9f614ceb6b2a8b9c7f4487da8#file-hafas-config-L31-L32
	salt: Buffer.from('7x8d3n2a5m1b3c6z', 'utf-8'),
	addMicMac: true,

	transformReqBody,

	products,

	trip: true,
	refreshJourney: true,
	reachableFrom: true,
	// fails with `CGI_READ_FAILED`
	// radar: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = hvvProfile
