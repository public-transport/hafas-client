'use strict'

const {readFileSync} = require('fs')
const {join} = require('path')
const {Agent} = require('https')
const baseProfile = require('./base.json')

const products = [{
	id: 'train-and-s-bahn',
	mode: 'train',
	bitmasks: [1, 2],
	name: 'Bahn & S-Bahn',
	short: 'Bahn & S-Bahn',
	default: true,
}, {
	id: 'u-bahn',
	mode: 'train',
	bitmasks: [4],
	name: 'U-Bahn',
	short: 'U-Bahn',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [16],
	name: 'Straßenbahn',
	short: 'Straßenbahn',
	default: true,
}, {
	id: 'city-bus',
	mode: 'bus',
	bitmasks: [128],
	name: 'Stadtbus',
	short: 'Stadtbus',
	default: true,
}, {
	id: 'regional-bus',
	mode: 'bus',
	bitmasks: [64],
	name: 'Regionalbus',
	short: 'Regionalbus',
	default: true,
}, {
	id: 'long-distance-bus',
	mode: 'bus',
	bitmasks: [32],
	name: 'Fernbus',
	short: 'Fernbus',
	default: true,
}, {
	id: 'other-bus',
	mode: 'bus',
	bitmasks: [2048],
	name: 'sonstige Busse',
	short: 'sonstige Busse',
	default: true,
}, {
	id: 'aerial-lift',
	mode: 'gondola',
	bitmasks: [256],
	name: 'Seil-/Zahnradbahn',
	short: 'Seil-/Zahnradbahn',
	default: true,
}, {
	id: 'ferry',
	mode: 'watercraft',
	bitmasks: [512],
	name: 'Schiff',
	short: 'Schiff',
	default: true,
}, {
	id: 'on-call',
	mode: 'taxi',
	bitmasks: [1024],
	name: 'Anrufsammeltaxi',
	short: 'AST',
	default: true,
}]

// `fahrplan.ivb.at:443` doesn't provide the necessary CA certificate chain for
// Node.js to trust the certificate, so we manually add it.
// todo: fix this properly, e.g. by letting them know
const ca = readFileSync(join(__dirname, 'digicert-tls-rsa-sha256-2020-ca1.crt.pem'))
const agent = new Agent({ca})
const transformReq = (ctx, req) => ({...req, agent})

const ivbProfile = {
	...baseProfile,
	ver: '1.32',
	transformReq,

	locale: 'at-DE',
	timezone: 'Europe/Vienna',

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
}

module.exports = ivbProfile
