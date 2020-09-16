'use strict'

// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L5
// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L47-L234

const {parseHook} = require('../../lib/profile-hooks')

const _parseLocation = require('../../parse/location')
const _parseMovement = require('../../parse/movement')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	// todo: necessary headers?
	body.client = {
		type: 'IPA',
		id: 'OEBB',
		v: '6000500',
		name: 'oebbIPAD_ADHOC',
		os: 'iOS 10.3.3'
	}
	// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L33 shows 1.16
	body.ver = '1.16'
	body.auth = {aid: 'OWDL4fE4ixNiPBBm'}
	body.lang = 'de'

	return body
}

// ÖBB has some 'stations' **in austria** with no departures/products,
// like station entrances, that are actually POIs.
const fixWeirdPOIs = ({parsed}) => {
	if (
		(parsed.type === 'station' || parsed.type === 'stop') &&
		!parsed.products &&
		parsed.name &&
		parsed.id && parsed.id.length !== 7
	) {
		return Object.assign({
			type: 'location',
			id: parsed.id,
			poi: true,
			name: parsed.name
		}, parsed.location)
	}
	return parsed
}

const fixMovement = ({parsed}, m) => {
	// filter out POIs
	// todo: make use of them, as some of them specify fare zones
	parsed.nextStopovers = parsed.nextStopovers.filter(st => {
		let s = st.stop || {}
		if (s.station) s = s.station
		return s.type === 'stop' || s.type === 'station'
	})
	parsed.frames = parsed.frames.filter((f) => {
		return f.origin.type !== 'location' && f.destination.type !== 'location'
	})
	return parsed
}

const oebbProfile = {
	locale: 'de-AT',
	timezone: 'Europe/Vienna',
	// todo: there is also https://beta.verkehrsauskunft.at/bin/mgate.exe
	endpoint: 'http://fahrplan.oebb.at/bin/mgate.exe',
	transformReqBody,

	products: products,

	parseLocation: parseHook(_parseLocation, fixWeirdPOIs),
	parseMovement: parseHook(_parseMovement, fixMovement),

	trip: true,
	radar: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = oebbProfile
