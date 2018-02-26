'use strict'

const products = require('./products')
const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')

const defaultProducts = {
	nationalExp: true,
	national: true,
	regional: true,
	suburban: true,
	bus: true,
	tram: true,
	tourismTrain: true,
}


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



const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: formatBitmask(products) + ''
	}
}

const formatBitmask = createFormatBitmask(products)


const insaProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'http://reiseauskunft.insa.de/bin/mgate.exe',
	products: products.allProducts,
	transformReqBody,

	defaultProducts,
	parseProducts: createParseBitmask(products.bitmasks),
	formatProducts

	// todo: journeyLeg?
	// todo: radar?
}

module.exports = insaProfile;
