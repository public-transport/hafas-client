'use strict'

const products = [{
	id: 'ice',
	mode: 'train',
	bitmasks: [1],
	name: 'ICE',
	short: 'ICE',
	default: true,
}, {
	id: 'national-train',
	mode: 'train',
	bitmasks: [2],
	name: 'IC/EC',
	short: 'IC/EC',
	default: true,
}, {
	id: 'express-train',
	mode: 'train',
	bitmasks: [4],
	name: 'IR, sonstiger Schnellzug',
	short: 'IR',
	default: true,
}, {
	id: 'local-train',
	mode: 'train',
	bitmasks: [8],
	name: 'Nahverkehr',
	short: 'Nahverkehr',
	default: true,
}, {
	id: 'suburban-train',
	mode: 'train',
	bitmasks: [16],
	name: 'S-Bahn',
	short: 'S',
	default: true,
}, {
	id: 'bus',
	mode: 'bus',
	bitmasks: [32],
	name: 'Bus',
	short: 'Bus',
	default: true,
}, {
	id: 'ferry',
	mode: 'watercraft',
	bitmasks: [64],
	name: 'Schiff',
	short: 'Schiff',
	default: true,
}, {
	id: 'subway',
	mode: 'train',
	bitmasks: [128],
	name: 'U-Bahn',
	short: 'U',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [256],
	name: 'Tram',
	short: 'T',
	default: true,
}, {
	id: 'on-call',
	mode: 'taxi',
	bitmasks: [512],
	name: 'Anrufverkehr',
	short: 'AST',
	default: true,
}]

const vosProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://fahrplan.vos.info/bin/mgate.exe',

	auth: {
		type: 'AID',
		aid: 'PnYowCQP7Tp1V',
	},
	client: {
		id: 'SWO',
		type: 'WEB',
		name: 'webapp',
		l: 'vs_swo',
	},
	ver: '1.32',

	products,

	trip: true,
	radar: true,
	refreshJourney: false, // todo: depends on 8615b85 from #204
	reachableFrom: true,
}

module.exports = vosProfile
