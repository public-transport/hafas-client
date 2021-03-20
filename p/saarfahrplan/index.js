'use strict'

const baseProfile = require('./base.json')
const {parseHook} = require('../../lib/profile-hooks')

const _parseMovement = require('../../parse/movement')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'de'

	return body
}

const fixMovement = ({parsed}, m) => {
	// filter out empty stopovers
	parsed.nextStopovers = parsed.nextStopovers.filter(st => !!st.stop)
	return parsed
}

const saarfahrplanProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	transformReqBody,

	products: products,

	parseMovement: parseHook(_parseMovement, fixMovement),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
	reachableFrom: true
}

module.exports = saarfahrplanProfile
