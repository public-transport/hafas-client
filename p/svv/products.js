const products = [
	{
		id: 'bahn-s-bahn',
		mode: 'train',
		bitmasks: [1, 2],
		name: 'Bahn & S-Bahn',
		short: 'S/Zug',
		default: true
	},
	{
		id: 'u-bahn',
		mode: 'train',
		bitmasks: [4],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'strassenbahn',
		mode: 'train',
		bitmasks: [16],
		name: 'Strassenbahn',
		short: 'Str',
		default: true
	},
	{
		id: 'fernbus',
		mode: 'bus',
		bitmasks: [32],
		name: 'Fernbus',
		short: 'Bus',
		default: true
	},
	{
		id: 'regionalbus',
		mode: 'bus',
		bitmasks: [64],
		name: 'Regionalbus',
		short: 'Bus',
		default: true
	},
	{
		id: 'stadtbus',
		mode: 'bus',
		bitmasks: [128],
		name: 'Stadtbus',
		short: 'Bus',
		default: true
	},
	{
		id: 'seilbahn-zahnradbahn',
		mode: 'gondola',
		bitmasks: [256],
		name: 'Seil-/Zahnradbahn',
		short: 'Seil-/Zahnradbahn',
		default: true
	},
	{
		id: 'schiff',
		mode: 'watercraft',
		bitmasks: [512],
		name: 'Schiff',
		short: 'F',
		default: true
	},
]

export {
	products,
}
