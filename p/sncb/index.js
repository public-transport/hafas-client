'use strict'

const {readFileSync} = require('fs')
const {join} = require('path')
const {Agent} = require('https')
const {strictEqual: eql} = require('assert')
const {parseHook} = require('../../lib/profile-hooks')
const parseLine = require('../../parse/line')
const baseProfile = require('./base.json')
const products = require('./products')

// `www.belgianrail.be:443` doesn't provide the necessary CA certificate
// chain for Node.js to trust the certificate, so we manually add it.
// todo: fix this properly, e.g. by letting them know
const ca = readFileSync(join(__dirname, 'digicert-sha2-secure-server-ca.crt.pem'))
const agent = new Agent({ca})
const transformReq = (ctx, req) => ({...req, agent})

// todo: this is ugly
const lineNameWithoutFahrtNr = ({parsed}) => {
	const {name, fahrtNr} = parsed
	if (!name || !fahrtNr || !/s\d/i.test(name)) return parsed
	const i = name.indexOf(fahrtNr)
	if (i < 0) return parsed

	if (
		/\s/.test(name[i - 1] || '') && // space before
		name.length === i + fahrtNr.length // nothing behind
	) return {
		...parsed,
		name: name.slice(0, i - 1) + name.slice(i + fahrtNr.length + 1),
	}
	return parsed
}
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'THA 123', fahrtNr: '123'}
}).name, 'THA 123')
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1 123', fahrtNr: '123'}
}).name, 'S1')
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1-123', fahrtNr: '123'}
}).name, 'S1-123')
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1 123a', fahrtNr: '123'}
}).name, 'S1 123a')

const sncbProfile = {
	...baseProfile,
	locale: 'fr-BE',
	timezone: 'Europe/Brussels',

	transformReq,

	products,

	parseLine: parseHook(parseLine, lineNameWithoutFahrtNr),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	refreshJourney: true,
	radar: true,
	reachableFrom: false, // todo: fails with `H9240`
}

module.exports = sncbProfile
