'use strict'

// TODO Jannis R.: DRY
const p = {
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
	regional: {
		bitmask: 8,
		name: 'RegionalExpress & RegionalBahn',
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
	tram: {
		bitmask: 32,
		name: 'Tram',
		short: 'T',
		mode: 'train',
		product: 'tram'
	},
	bus: {
		bitmask: 64+128,
		name: 'Bus',
		short: 'B',
		mode: 'bus',
		product: 'bus'
	},
	tourismTrain: {
		bitmask: 256,
		name: 'Tourism Train',
		short: 'TT',
		mode: 'train',
		product: 'tourismTrain'
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
p.bitmasks[8] = p.regional
p.bitmasks[16] = p.suburban
p.bitmasks[32] = p.tram
p.bitmasks[64+128] = p.bus
p.bitmasks[256] = p.tourismTrain

p.allProducts = [
	p.nationalExp,
	p.national,
	p.regional,
	p.suburban,
	p.tram,
	p.bus,
	p.tourismTrain
]

module.exports = p
