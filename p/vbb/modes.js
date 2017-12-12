'use strict'

// todo: remove useless keys
const m = {
	suburban: {
		category: 0,
		bitmask:  1,
		name:     'S-Bahn',
		mode:     'train',
		short:    'S',
		product: 'suburban'
	},

	subway: {
		category: 1,
		bitmask:  2,
		name:     'U-Bahn',
		mode:     'train',
		short:    'U',
		product: 'subway'
	},

	tram: {
		category: 2,
		bitmask:  4,
		name:     'Tram',
		mode:     'train',
		short:    'T',
		product: 'tram'
	},

	bus: {
		category: 3,
		bitmask:  8,
		name:     'Bus',
		mode: 'bus',
		short:    'B',
		product: 'bus'
	},

	ferry: {
		category: 4,
		bitmask:  16,
		name:     'Fähre',
		mode: 'ferry',
		short:    'F',
		product: 'ferry'
	},

	express: {
		category: 5,
		bitmask:  32,
		name:     'IC/ICE',
		mode:     'train',
		short:    'E',
		product: 'express'
	},

	regional: {
		category: 6,
		bitmask:  64,
		name:     'RB/RE',
		mode:     'train',
		short:    'R',
		product: 'regional'
	},

	unknown: {
		category: null,
		bitmask:  0,
		name:     'unknown',
		mode:     null,
		short:    '?',
		product: 'unknown'
	}
}

m.bitmasks = []
m.bitmasks[1] = m.suburban
m.bitmasks[2] = m.subway
m.bitmasks[4] = m.tram
m.bitmasks[8] = m.bus
m.bitmasks[16] = m.ferry
m.bitmasks[32] = m.express
m.bitmasks[64] = m.regional

m.categories = [
	m.suburban,
	m.subway,
	m.tram,
	m.bus,
	m.ferry,
	m.express,
	m.regional,
	m.unknown
]

m.allProducts = [
	m.suburban,
	m.subway,
	m.tram,
	m.bus,
	m.ferry,
	m.express,
	m.regional
]

// m.parseCategory = (category) => {
// 	return m.categories[parseInt(category)] || m.unknown
// }

module.exports = m
