'use strict'

module.exports = [
	{
		product: 'nationalExp',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress',
		short: 'ICE',
		default: true
	},
	{
		product: 'national',
		mode: 'train',
		bitmasks: [2],
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		default: true
	},
	{
		product: 'regional',
		mode: 'train',
		bitmasks: [8],
		name: 'RegionalExpress & RegionalBahn',
		short: 'RE/RB',
		default: true
	},
	{
		product: 'suburban',
		mode: 'train',
		bitmasks: [16],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		product: 'tram',
		mode: 'train',
		bitmasks: [32],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		product: 'bus',
		mode: 'bus',
		bitmasks: [64, 128],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		product: 'tourismTrain',
		mode: 'train',
		bitmasks: [256],
		name: 'Tourism Train',
		short: 'TT',
		default: true
	}
]
