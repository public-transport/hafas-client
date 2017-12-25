'use strict'

const m = {
	nationalExp: {
		bitmask: 1,
		name: 'InterCityExpress & RailJet',
		short: 'ICE/RJ',
		mode: 'train',
		product: 'nationalExp'
	},
	national: {
		bitmask: 2 + 4,
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		mode: 'train',
		product: 'national'
	},
	interregional: {
		bitmask: 8 + 4096,
		name: 'Durchgangszug & EuroNight',
		short: 'D/EN',
		mode: 'train',
		product: 'regional'
	},
	regional: {
		bitmask: 16,
		name: 'Regional & RegionalExpress',
		short: 'R/REX',
		mode: 'train',
		product: 'regional'
	},
	suburban: {
		bitmask: 32,
		name: 'S-Bahn',
		short: 'S',
		mode: 'train',
		product: 'suburban'
	},
	bus: {
		bitmask: 64,
		name: 'Bus',
		short: 'B',
		mode: 'bus',
		product: 'bus'
	},
	ferry: {
		bitmask: 128,
		name: 'Ferry',
		short: 'F',
		mode: 'watercraft',
		product: 'ferry'
	},
	subway: {
		bitmask: 256,
		name: 'U-Bahn',
		short: 'U',
		mode: 'train',
		product: 'subway'
	},
	tram: {
		bitmask: 512,
		name: 'Tram',
		short: 'T',
		mode: 'tram',
		product: 'tram'
	},
	onCall: {
		bitmask: 2048,
		name: 'On-call transit',
		short: 'on-call',
		mode: null, // todo
		product: 'onCall'
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
m.bitmasks[4] = m.national
m.bitmasks[8] = m.interregional
m.bitmasks[16] = m.regional
m.bitmasks[32] = m.suburban
m.bitmasks[64] = m.bus
m.bitmasks[128] = m.ferry
m.bitmasks[256] = m.subway
m.bitmasks[512] = m.tram
m.bitmasks[2048] = m.onCall
m.bitmasks[4096] = m.interregional

m.allProducts = [
	m.nationalExp,
	m.national,
	m.interregional,
	m.regional,
	m.suburban,
	m.bus,
	m.ferry,
	m.subway,
	m.tram,
	m.onCall
]

module.exports = m
