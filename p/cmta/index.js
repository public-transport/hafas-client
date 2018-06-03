'use strict'

const _createParseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')
const _createParseJourney = require('../../parse/journey')
const _createParseDeparture = require('../../parse/departure')
const _formatStation = require('../../format/station')
const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')

const modes = require('./modes')

const formatBitmask = createFormatBitmask(modes)

const transformReqBody = (body) => {
	body.client = {type: 'WEB', id: 'CMTA', name: 'webapp', l: ''}
	body.ext = 'SBB.TZT.1'
	body.ver = '1.13'
	body.auth = {type: 'AID', aid: 'weblwemrcrlwemlcri'}

	return body
}

const defaultProducts = {
  bus: true,
  rapid: true,
  rail: true
}

const formatBitmask = createFormatBitmask(modes)

const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: formatBitmask(products) + ''
	}
}

const cmtaProfile = {
	endpoint: 'https://capmetro.hafas.de/bin/mgate.exe',
	locale: 'en-US',
	timezone: 'America/Chicago',
	products: modes.allProducts,
	transformReqBody,
	formatProducts,
	parseProducts: createParseBitmask(modes.allProducts, defaultProducts),
	radar: true
}

module.exports = cmtaProfile
