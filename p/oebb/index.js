'use strict'

// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L5
// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L47-L234

const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')
const _createParseLine = require('../../parse/line')
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

const createParseLine = (profile, operators) => {
	const parseLine = _createParseLine(profile, operators)

	const parseLineWithMode = (l) => {
		const res = parseLine(l)

		res.mode = res.product = null
		if ('class' in res) {
			const data = products.bitmasks[parseInt(res.class)]
			if (data) {
				res.mode = data.mode
				res.product = data.product
			}
		}

		return res
	}
	return parseLineWithMode
}

const parseLocation = (profile, l, lines) => {
	// ÖBB has some 'stations' **in austria** with no departures/products,
	// like station entrances, that are actually POIs.
	const res = _parseLocation(profile, l, lines)
	if (
		res.type === 'station' &&
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

const createParseMovement = (profile, locations, lines, remarks) => {
	const _parseMovement = _createParseMovement(profile, locations, lines, remarks)
	const parseMovement = (m) => {
		const res = _parseMovement(m)
		// filter out POIs
		// todo: make use of them, as some of them specify fare zones
		res.nextStops = res.nextStops.filter(s => s.type === 'station')
		res.frames = res.frames.filter((f) => {
			return f.origin.type !== 'location' && f.destination.type !== 'location'
		})
		return res
	}
	return parseMovement
}

const defaultProducts = {
	nationalExp: true,
	national: true,
	interregional: true,
	regional: true,
	suburban: true,
	bus: true,
	ferry: true,
	subway: true,
	tram: true,
	onCall: true
}
const formatBitmask = createFormatBitmask(products)
const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: formatBitmask(products) + ''
	}
}

const oebbProfile = {
	locale: 'de-AT',
	timezone: 'Europe/Vienna',
	// todo: there is also https://beta.verkehrsauskunft.at/bin/mgate.exe
	endpoint: 'http://fahrplan.oebb.at/bin/mgate.exe',
	transformReqBody,

	products: products.allProducts,

	parseProducts: createParseBitmask(products.allProducts, defaultProducts),
	parseLine: createParseLine,
	parseLocation,
	parseMovement: createParseMovement,

	formatProducts,

	journeyLeg: true,
	radar: true
}

module.exports = oebbProfile
