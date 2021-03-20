'use strict'

const baseProfile = require('./base.json')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.lang = 'deu'

	return body
}

const sbbProfile = {
	...baseProfile,

	locale: 'de-CH',
	timezone: 'Europe/Zurich',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,
}

const withLocale = (locale) => ({...sbbProfile, locale})

sbbProfile.withLocale = withLocale
module.exports = sbbProfile
