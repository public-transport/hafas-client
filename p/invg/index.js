'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'IPH',
		id: 'INVG',
		name: 'invgPROD-APPSTORE-LIVE',
		v: '1040000'
	}
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'GITvwi3BGOmTQ2a5'}

	return body
}

const invgProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://fpa.invg.de/bin/mgate.exe',

	// https://github.com/public-transport/hafas-client/issues/93#issuecomment-437594291
	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	// https://gist.github.com/derhuerst/840c72ad19065f6c55657cf1bc7aa52a#file-config-txt-L23-L24
	salt: Buffer.from('ERxotxpwFT7uYRsI', 'utf8'),
	addMicMac: true,

	transformReqBody,

	products,

	trip: true,
	radar: true,
	refreshJourney: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = invgProfile
