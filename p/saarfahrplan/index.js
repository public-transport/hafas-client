'use strict'

const {parseHook} = require('../../lib/profile-hooks')

const _parseMovement = require('../../parse/movement')
const products = require('./products')

const transformReqBody = (ctx, body) => {
	body.client = {
		type: 'AND',
		id: 'ZPS-SAAR',
		v: 1000070,
		name: 'Saarfahrplan',
		os: 'Android 9'
	}
	body.ver = '1.21'
	body.auth = {type: 'AID', aid: '51XfsVqgbdA6oXzHrx75jhlocRg6Xe'}
	body.lang = 'de'

	return body
}

const fixMovement = ({parsed}, m) => {
	// filter out empty stopovers
	parsed.nextStopovers = parsed.nextStopovers.filter(st => !!st.stop)
	return parsed
}

const saarfahrplanProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://saarfahrplan.de/bin/mgate.exe',
	transformReqBody,

	// decrypted form of https://gist.github.com/derhuerst/f5a8c07f9b3226ecad6c8f64d83df6a2#file-haf_config_base-properties-L70
	salt: Buffer.from('HJtlubisvxiJxss', 'utf8'),
	addMicMac: true,

	products: products,

	parseMovement: parseHook(_parseMovement, fixMovement),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
	reachableFrom: true
}

module.exports = saarfahrplanProfile
