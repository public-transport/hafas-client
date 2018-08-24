'use strict'

const products = require('./products')

const transformReqBody = (body) => {
	body.client = {type: 'WEB', id: 'CMTA', name: 'webapp', l: ''}
	body.ext = 'SBB.TZT.1'
	body.ver = '1.13'
	body.auth = {type: 'AID', aid: 'weblwemrcrlwemlcri'}

	return body
}

const cmtaProfile = {
	endpoint: 'https://capmetro.hafas.de/bin/mgate.exe',
	locale: 'en-US',
	timezone: 'America/Chicago',
	transformReqBody,

	products,

	journeyLeg: true,
	radar: true
}

module.exports = cmtaProfile
