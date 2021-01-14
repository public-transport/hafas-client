'use strict'

const products = [{
	id: 'bart',
	mode: 'train',
	bitmasks: [128],
	name: 'BART',
	short: 'BART',
	default: true,
}, {
	id: 'regional-train',
	mode: 'train',
	bitmasks: [8],
	name: 'regional trains (Caltrain, Capitol Corridor, ACE)',
	short: 'regional trains',
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
	name: 'Ferry',
	short: 'Ferry',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [256],
	name: 'Tram',
	short: 'Tram',
	default: true,
}, {
	id: 'cable-car',
	mode: 'train',
	bitmasks: [4],
	name: 'cable car',
	short: 'cable car',
	default: true,
}]

const bartProfile = {
	locale: 'en-US',
	timezone: 'America/Los_Angeles',
	endpoint: 'https://planner.bart.gov/bin/mgate.exe',

	auth: {
		type: 'AID',
		aid: 'kEwHkFUCIL500dym',
	},
	client: {
		id: 'BART',
		type: 'WEB',
		name: 'webapp',
		l: 'vs_webapp',
	},
	ver: '1.25',

	products,

	trip: true,
	radar: true,
	refreshJourney: false, // todo: depends on 8615b85 from #204
	reachableFrom: true,
}

module.exports = bartProfile
