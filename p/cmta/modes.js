'use strict'

const m = {
	bus: {
		category: 1,
		bitmask:  32,
		name:     'Bus',
		mode:     'bus',
		short:    'B',
		product:  'bus'
	},
	rapid: {
		category: 2,
		bitmask:  4096,
		name:     'MetroRapid',
		mode:     'bus',
		short:    'R',
		product: 'rapid'
	},
	rail: {
		category: 3,
		bitmask:  8,
		name:     'MetroRail',
		mode:     'train',
		short:    'M',
		product:  'rail'
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
m.bitmasks[8] = m.rail
m.bitmasks[32] = m.bus
m.bitmasks[4096] = m.rapid

m.categories = [
	m.bus,
	m.rapid,
	m.rail,
	m.unknown
]

m.allProducts = [
	m.bus,
	m.rapid,
	m.rail
]

module.exports = m
