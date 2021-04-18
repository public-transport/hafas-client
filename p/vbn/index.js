'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const insaProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	// https://gist.github.com/derhuerst/fd2f81a597bde66cb1f689006d574d7f#file-config-txt-L22-L23
	salt: Buffer.from('SP31mBufSyCLmNxp', 'utf-8'),
	addMicMac: true,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourneyUseOutReconL: true,
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
}

module.exports = insaProfile;
