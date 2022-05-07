const products = [
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [1],
		name: 'local train (TGV/ICE)',
		short: 'TGV/ICE',
		default: true
	},
	{
		id: 'national-train',
		mode: 'train',
		bitmasks: [2, 4],
		name: 'national train (IC/RE/IRE)',
		short: 'IC/RE/IRE',
		default: true
	},
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [8],
		name: 'local train (RB/TER)',
		short: 'RB/TER',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'Bus',
		short: 'Bus',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [256],
		name: 'Tram',
		short: 'Tram',
		default: true
	}
]

export {
	products,
}
