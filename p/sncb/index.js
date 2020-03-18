'use strict'

const {readFileSync} = require('fs')
const {join} = require('path')
const {Agent} = require('https')
const products = require('./products')

// `www.belgianrail.be:443` doesn't provide the necessary CA certificate
// chain for Node.js to trust the certificate, so we manually add it.
// todo: fix this properly, e.g. by letting them know
const ca = readFileSync(join(__dirname, 'digicert-sha2-secure-server-ca.crt.pem'))
const agent = new Agent({ca})
const transformReq = (ctx, req) => ({...req, agent})

const transformReqBody = ({opt}, body) => {
	body.client = {type: 'IPH', id: 'SNCB', name: 'sncb', v: '4030200'}
	body.ver = '1.16'
	body.auth = {type: 'AID', aid: 'sncb-mobi'}
	body.lang = opt.language || 'fr'

	return body
}

const sncbProfile = {
	locale: 'fr-BE',
	timezone: 'Europe/Brussels',
	endpoint: 'https://www.belgianrail.be/jp/sncb-nmbs-routeplanner/mgate.exe',

	transformReq,
	transformReqBody,

	products,

	trip: true,
	refreshJourney: true,
	radar: true,
	// todo: `reachableFrom: true` fails with `H9240`
}

module.exports = sncbProfile
