'use strict'

// todo: https://gist.github.com/anonymous/d3323a5d2d6e159ed42b12afd0380434#file-haf_products-properties-L1-L95
const m = {
	nationalExp: {
		bitmask: 1,
		name: 'InterCityExpress',
		short: 'ICE',
		mode: 'train',
		product: 'nationalExp'
	},
	national: {
		bitmask: 2,
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		mode: 'train',
		product: 'national'
	},
	regionalExp: {
		bitmask: 4,
		name: 'InterRegio',
		short: 'IR',
		mode: 'train',
		product: 'regionalExp'
	},
	regional: {
		bitmask: 8,
		name: 'RegionalExpress & Regio',
		short: 'RE/RB',
		mode: 'train',
		product: 'regional'
	},
	suburban: {
		bitmask: 16,
		name: 'S-Bahn',
		short: 'S',
		mode: 'train',
		product: 'suburban'
	},
	bus: {
		bitmask: 32,
		name: 'Bus',
		short: 'B',
		mode: 'bus',
		product: 'bus'
	},
	ferry: {
		bitmask: 64,
		name: 'Ferry',
		short: 'F',
		mode: 'watercraft',
		product: 'ferry'
	},
	subway: {
		bitmask: 128,
		name: 'U-Bahn',
		short: 'U',
		mode: 'train',
		product: 'subway'
	},
	tram: {
		bitmask: 256,
		name: 'Tram',
		short: 'T',
		mode: 'tram',
		product: 'tram'
	},
	taxi: {
		bitmask: 512,
		name: 'Group Taxi',
		short: 'Taxi',
		mode: null, // todo
		product: 'taxi'
	},
	unknown: {
		bitmask: 0,
		name: 'unknown',
		short: '?',
		product: 'unknown'
	}
}

m.bitmasks = []
m.bitmasks[1] = m.nationalExp
m.bitmasks[2] = m.national
m.bitmasks[4] = m.regionalExp
m.bitmasks[8] = m.regional
m.bitmasks[16] = m.suburban
m.bitmasks[32] = m.bus
m.bitmasks[64] = m.ferry
m.bitmasks[128] = m.subway
m.bitmasks[256] = m.tram
m.bitmasks[512] = m.taxi

m.allProducts = [
	m.nationalExp,
	m.national,
	m.regionalExp,
	m.regional,
	m.suburban,
	m.bus,
	m.ferry,
	m.subway,
	m.tram,
	m.taxi
]

module.exports = m
