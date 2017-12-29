'use strict'

const p = {
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
		product: 'interregional'
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
		mode: 'train',
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

p.bitmasks = []
p.bitmasks[1] = p.nationalExp
p.bitmasks[2] = p.national
p.bitmasks[4] = p.national
p.bitmasks[2+4] = p.national
p.bitmasks[8] = p.interregional
p.bitmasks[16] = p.regional
p.bitmasks[32] = p.suburban
p.bitmasks[64] = p.bus
p.bitmasks[128] = p.ferry
p.bitmasks[256] = p.subway
p.bitmasks[512] = p.tram
p.bitmasks[1024] = p.unknown
p.bitmasks[2048] = p.onCall
p.bitmasks[4096] = p.interregional
p.bitmasks[8+4096] = p.interregional

p.allProducts = [
	p.nationalExp,
	p.national,
	p.interregional,
	p.regional,
	p.suburban,
	p.bus,
	p.ferry,
	p.subway,
	p.tram,
	p.onCall
]

module.exports = p
