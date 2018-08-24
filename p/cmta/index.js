'use strict'

const products = require('./products')

const transformReqBody = (body) => {
	body.client = {
		type: 'WEB',
		id: 'CMTA',
		name: 'webapp',
		l: '' // todo: what is this?
	}
	body.ext = 'SBB.TZT.1'
	body.ver = '1.13'
	body.auth = {type: 'AID', aid: 'weblwemrcrlwemlcri'}
	// todo: `body.id = 'ztgcgxywk88bgm88'`

	return body
}

const cmtaProfile = {
	locale: 'en-US',
	timezone: 'America/Chicago',
	endpoint: 'https://capmetro.hafas.cloud/bin/mgate.exe',
	transformReqBody,

	products,

	trip: true,
	radar: true,
	refreshJourney: true
}

module.exports = cmtaProfile
