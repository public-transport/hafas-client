const products = [
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [1],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [2],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [4],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [8],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [16],
		name: 'Fähre',
		short: 'F',
		default: true
	},
	{
		id: 'express',
		mode: 'train',
		bitmasks: [32],
		name: 'IC/ICE',
		short: 'E',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [64],
		name: 'RB/RE',
		short: 'R',
		default: true
	}
]

export {
	products,
}
