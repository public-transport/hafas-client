'use strict'

module.exports = [
	{
		product: 'suburban',
		mode: 'train',
		bitmasks: [1],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		product: 'subway',
		mode: 'train',
		bitmasks: [2],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		product: 'tram',
		mode: 'train',
		bitmasks: [4],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		product: 'bus',
		mode: 'bus',
		bitmasks: [8],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		product: 'ferry',
		mode: 'watercraft',
		bitmasks: [16],
		name: 'Fähre',
		short: 'F',
		default: true
	},
	{
		product: 'express',
		mode: 'train',
		bitmasks: [32],
		name: 'IC/ICE',
		short: 'E',
		default: true
	},
	{
		product: 'regional',
		mode: 'train',
		bitmasks: [64],
		name: 'RB/RE',
		short: 'R',
		default: true
	}
]
