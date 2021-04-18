'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const hvvProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	// https://gist.github.com/derhuerst/b20adde9f614ceb6b2a8b9c7f4487da8#file-hafas-config-L31-L32
	salt: Buffer.from('7x8d3n2a5m1b3c6z', 'utf-8'),
	addMicMac: true,

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = hvvProfile
