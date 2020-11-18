'use strict'

const products = require('./products')

const transformReqBody = (ctx, body) => {
	// sourced from https://github.com/marudor/BahnhofsAbfahrten/blob/1c99d8b/packages/server/HAFAS/profiles.ts#L344-L361
	body.client = {
		type: 'AND',
		id: 'DBZUGRADARNETZ',
		v: '',
	}
	body.ver = '1.18'
	body.auth = { aid: 'hf7mcf9bv3nv8g5f', type:'AID' }
	body.lang = 'deu'

	return body
}

const sbbProfile = {
	locale: 'de-CH',
	timezone: 'Europe/Zurich',
	// todo: find a way to use https:
	endpoint: 'http://fahrplan.sbb.ch/bin/mgate.exe',
	transformReqBody,

	products: products,

	trip: true,
	radar: true,
	reachableFrom: true,
}

const withLocale = (locale) => ({...sbbProfile, locale})

sbbProfile.withLocale = withLocale
module.exports = sbbProfile
