'use strict'

const {parseHook} = require('../../lib/profile-hooks')

const _parseMovement = require('../../parse/movement')
const baseProfile = require('./base.json')
const products = require('./products')

const fixMovement = ({parsed}, m) => {
	// filter out empty stopovers
	parsed.nextStopovers = parsed.nextStopovers.filter(st => !!st.stop)
	return parsed
}

const saarfahrplanProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	salt: Buffer.from('HJtlubisvxiJxss', 'utf8'),
	addMicMac: true,

	products: products,

	parseMovement: parseHook(_parseMovement, fixMovement),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true
}

module.exports = saarfahrplanProfile
