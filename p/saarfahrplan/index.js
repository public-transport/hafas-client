'use strict'

const _createParseMovement = require('../../parse/movement')
const products = require('./products')

const transformReqBody = (body) => {
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

const createParseMovement = (profile, opt, data) => {
	const _parseMovement = _createParseMovement(profile, opt, data)
	const parseMovement = (m) => {
		const res = _parseMovement(m)
		// filter out empty stopovers
		res.nextStopovers = res.nextStopovers.filter(st => !!st.stop)
		return res
	}
	return parseMovement
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

	parseMovement: createParseMovement,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
	reachableFrom: true
}

module.exports = saarfahrplanProfile
