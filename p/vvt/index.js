import baseProfile from './base.js';

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
}];

const profile = {
	...baseProfile,
	locale: 'at-DE',
	timezone: 'Europe/Vienna',
	ver: '1.39',

	products,

	trip: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
};

export {
	profile,
};
