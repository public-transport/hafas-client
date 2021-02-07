'use strict'

const products = [{ // todo: what is `8`?
	id: 'trains',
	mode: 'train',
	bitmasks: [1, 2],
	name: 'Bahn & S-Bahn',
	short: 'Bahn & S',
	default: true,
}, {
	id: 'subway',
	mode: 'train',
	bitmasks: [4],
	name: 'U-Bahn',
	short: 'U',
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

const vvtProfile = {
	locale: 'at-DE',
	timezone: 'Europe/Vienna',
	endpoint: 'https://smartride.vvt.at/bin/mgate.exe',

	auth: {
		type: 'AID',
		aid: 'wf7mcf9bv3nv8g5f',
	},
	client: {
		id: 'VAO',
		type: 'WEB',
		name: 'webapp',
		l: 'vs_vvt',
	},
	ver: '1.32',
	// todo: lang

	products,

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	refreshJourney: false, // todo: depends on 8615b85 from #204
	reachableFrom: true,
}

module.exports = vvtProfile
