'use strict'

// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L5
// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L47-L234

const _parseLocation = require('../../parse/location')
const _createParseMovement = require('../../parse/movement')

const products = require('./products')

const transformReqBody = (body) => {
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

const parseLocation = (profile, opt, data, l) => {
	// ÖBB has some 'stations' **in austria** with no departures/products,
	// like station entrances, that are actually POIs.
	const res = _parseLocation(profile, opt, data, l)
	if (
		(res.type === 'station' || res.type === 'stop') &&
		!res.products &&
		res.name &&
		res.id && res.id.length !== 7
	) {
		return Object.assign({
			type: 'location',
			id: res.id,
			name: res.name
		}, res.location)
	}
	return res
}

const createParseMovement = (profile, opt, data) => {
	const _parseMovement = _createParseMovement(profile, opt, data)
	const parseMovement = (m) => {
		const res = _parseMovement(m)
		// filter out POIs
		// todo: make use of them, as some of them specify fare zones
		res.nextStopovers = res.nextStopovers.filter(st => {
			const s = st.stop || {}
			if (s.station) {
				s = s.station
				if (s.station.type === 'stop' || s.station.type === 'station') return true
			}
			return s.type === 'stop' || s.type === 'station'
		})
		res.frames = res.frames.filter((f) => {
			return f.origin.type !== 'location' && f.destination.type !== 'location'
		})
		return res
	}
	return parseMovement
}

const oebbProfile = {
	locale: 'de-AT',
	timezone: 'Europe/Vienna',
	// todo: there is also https://beta.verkehrsauskunft.at/bin/mgate.exe
	endpoint: 'http://fahrplan.oebb.at/bin/mgate.exe',
	transformReqBody,

	products: products,

	parseLocation,
	parseMovement: createParseMovement,

	trip: true,
	radar: true,
	reachableFrom: true
}

module.exports = oebbProfile
