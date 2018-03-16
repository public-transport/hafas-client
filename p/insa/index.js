'use strict'

const _createParseLine = require('../../parse/line')
const products = require('./products')

const transformReqBody = (body) => {
	body.client = {
		type: 'IPH',
		id: 'NASA',
		v: '4000200',
		name: 'nasaPROD',
		os: 'iPhone OS 11.2.5'
	}
	body.ver = '1.11'
	body.auth = {aid: "nasa-apps"}
	body.lang = 'en' // todo: `de`?

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

const insaProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'http://reiseauskunft.insa.de/bin/mgate.exe',
	transformReqBody,

	products: products.allProducts,

	journeyLeg: true,
	radar: true
}

module.exports = insaProfile;
