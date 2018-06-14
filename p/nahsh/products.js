'use strict'

const p = {
	nationalExp: {
		bitmask: 1,
		name: 'High-speed rail',
		short: 'ICE/HSR',
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
	interregional: { // todo: also includes EN?
		bitmask: 4,
		name: 'Interregional',
		short: 'IR',
		mode: 'train',
		product: 'interregional'
	},
	regional: {
		bitmask: 8,
		name: 'Regional & RegionalExpress',
		short: 'RB/RE',
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
		mode: 'train',
		product: 'tram'
	},
	onCall: {
		bitmask: 512,
		name: 'On-call transit',
		short: 'on-call',
		mode: null, // todo
		product: 'onCall'
	}
}

p.bitmasks = []
p.bitmasks[1] = p.nationalExp
p.bitmasks[2] = p.national
p.bitmasks[4] = p.interregional
p.bitmasks[8] = p.regional
p.bitmasks[16] = p.suburban
p.bitmasks[32] = p.bus
p.bitmasks[64] = p.ferry
p.bitmasks[128] = p.subway
p.bitmasks[256] = p.tram
p.bitmasks[512] = p.onCall

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
