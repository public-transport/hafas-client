'use strict'

const {readFileSync} = require('fs')
const {join: pathJoin} = require('path')
const {Agent} = require('https')
const baseProfile = require('./base.json')

const products = [{
	id: 'stadtbahn',
	mode: 'train',
	bitmasks: [2],
	name: 'Stadtbahn',
	short: 'Stadtbahn',
	default: true,
}, {
	id: 'bus',
	mode: 'bus',
	bitmasks: [8],
	name: 'Bus',
	short: 'Bus',
	default: true,
}, {
	id: 'taxibus',
	mode: 'bus',
	bitmasks: [256],
	name: 'Taxibus',
	short: 'Taxibus',
	default: true,
}, {
	id: 's-bahn',
	mode: 'train',
	bitmasks: [1],
	name: 'S-Bahn',
	short: 'S',
	default: true,
}, {
	id: 'regionalverkehr',
	mode: 'train',
	bitmasks: [46],
	name: 'Regionalverkehr',
	short: 'Regionalverkehr',
	default: true,
}, {
	id: 'fernverkehr',
	mode: 'train',
	bitmasks: [32],
	name: 'Fernverkehr',
	short: 'Fernverkehr',
	default: true,
}]

// `auskunft.kvb.koeln:443` doesn't provide the necessary CA certificate chain for
// Node.js to trust the certificate, so we manually add it.
// todo: fix this properly, e.g. by letting them know
const ca = readFileSync(pathJoin(__dirname, 'thawte-rsa-ca-2018.pem'))
const agent = new Agent({ca})
const transformReq = (ctx, req) => ({...req, agent})

const vosProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	transformReq,

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
}

module.exports = vosProfile
