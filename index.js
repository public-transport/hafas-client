'use strict'

const parseLocation = require('./parse/location')
const parseLine = require('./parse/line')
const parseRemark = require('./parse/remark')
const parseOperator = require('./parse/operator')
const request = require('./lib/request')

const id = x => x

const defaultProfile = {
	transformReqBody: id,
	transformReq: id,
	parseLocation: parseLocation,
	parseLine: parseLine,
	parseRemark: parseRemark,
	parseOperator: parseOperator
}

const createClient = (profile) => {
	profile = Object.assign({}, defaultProfile, profile)
	if ('function' !== profile.transformReqBody) {
		throw new Error('profile.transformReqBody must be a function.')
	}
	if ('function' !== profile.transformReq) {
		throw new Error('profile.transformReq must be a function.')
	}
	if ('function' !== profile.parseLocation) {
		throw new Error('profile.parseLocation must be a function.')
	}
	if ('function' !== profile.parseLine) {
		throw new Error('profile.parseLine must be a function.')
	}
	if ('function' !== profile.parseRemark) {
		throw new Error('profile.parseRemark must be a function.')
	}
	if ('function' !== profile.parseOperator) {
		throw new Error('profile.parseOperator must be a function.')
	}

	const client = data => request(profile, data)
	return client
}

module.exports = createRequest
