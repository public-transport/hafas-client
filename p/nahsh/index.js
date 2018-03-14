'use strict'

const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')
const _createParseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')

const products = require('./products')

// todo: journey prices

const transformReqBody = (body) => {
	// todo: all headers necessary?
	body.client = {
		id: 'NAHSH',
		name: 'NAHSHPROD',
		os: 'iOS',
		type: 'IPH',
		v: '3000700'
	}
	body.ver = '1.16'
	body.auth = {aid: 'r0Ot9FLFNAFxijLW'}
	body.lang = 'de'

	return body
}

const parseLocation = (profile, l, lines) => {
	const res = _parseLocation(profile, l, lines)
	// weird fix for empty lines, e.g. IC/EC at Flensburg Hbf
	if(res.lines){
		res.lines = res.lines.filter(x => x.id && x.name)
	}

	// remove trailing zeroes, todo
	if(res.id && res.id.length > 2){
		while(res.id.slice(0, 1) === '0'){
			res.id = res.id.slice(1)
		}
	}

	return res
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

const nahshProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'http://nah.sh.hafas.de/bin/mgate.exe',
	transformReqBody,

	products: products.allProducts,

	parseProducts: createParseBitmask(products.allProducts, defaultProducts),
	parseLine: createParseLine,
	parseLocation,

	formatProducts,

	journeyLeg: true,
	radar: false // todo: fix nameless station bug
}

module.exports = nahshProfile
