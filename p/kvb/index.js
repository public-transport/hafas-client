'use strict'

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

const vosProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
}

module.exports = vosProfile
