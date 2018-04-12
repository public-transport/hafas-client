'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.ext = 'DK.9'
	body.client = {type: 'AND', id: 'DK'}
	body.ver = '1.21'
	body.auth = {type: 'AID', aid: 'irkmpm9mdznstenr-android'}

	return body
}

const rejseplanenProfile = {
	locale: 'da-DK',
	timezone: 'Europe/Copenhagen',
	endpoint: 'https://mobilapps.rejseplanen.dk/bin/iphone.exe',
	transformReqBody,

	products: products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
}

module.exports = rejseplanenProfile;
