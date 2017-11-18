'use strict'

const shorten = require('vbb-short-station-name')

const _formatStation = require('../../format/station')
const _parseLine = require('../../parse/line')
const _parseLocation = require('../../parse/location')

const modes = require('./modes')

const transformReqBody = (body) => {
	body.client = {type: 'IPA', id: 'BVG'}
	body.ext = 'VBB.2'
	body.ver = '1.11'
	body.auth = {type: 'AID', aid: 'hafas-vbb-apps'}

	return body
}

const parseLine = (profile, l) => {
	const res = _parseLine(profile, l)

	res.mode = res.product = null
	if ('class' in res) {
		const data = modes.bitmasks[parseInt(res.class)]
		if (data) {
			res.mode = data.mode
			res.product = data.product
		}
	}

	return res
}

const parseLocation = (profile, l) => {
	const res = _parseLocation(profile, l)
	res.name = shorten(res.name)
	return res
}

const isIBNR = /^\d{9,}$/
const formatStation = (id) => {
	// todo: convert short to long IDs
	if (!isIBNR.test(id)) throw new Error('station ID must be an IBNR.')
	return _formatStation(id)
}

const defaultProducts = {
	suburban: true,
	subway: true,
	tram: true,
	bus: true,
	ferry: true,
	express: true,
	regional: true
}
const formatProducts = (products) => {
	products = Object.assign(Object.create(null), defaultProducts, products)
	return {
		type: 'PROD',
		mode: 'INC',
		value: modes.stringifyBitmask(products) + ''
	}
}

const vbbProfile = {
	timezone: 'Europe/Berlin',
	endpoint: 'https://fahrinfo.vbb.de/bin/mgate.exe',
	transformReqBody,

	parseLocation,
	parseLine,
	parseProducts: modes.parseBitmask,

	formatProducts
}

module.exports = vbbProfile
