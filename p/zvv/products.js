const products = [
	{
		id: 'high-speed-train',
		mode: 'train',
		bitmasks: [1, 2, 4, 8],
		name: 'High Speed Train',
		short: 'High Speed',
		default: true,
	},
	{
		id: 'urban-train',
		mode: 'train',
		bitmasks: [32],
		name: 'Urban Train',
		short: 'Urban',
		default: true,
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [512],
		name: 'Tram',
		short: 'Tram',
		default: true,
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [64],
		name: 'Bus',
		short: 'Bus',
		default: true,
	},
	{
		id: 'boat',
		mode: 'watercraft',
		bitmasks: [16],
		name: 'Boat',
		short: 'Boat',
		default: true,
	},
	{
		id: 'cable-car',
		mode: 'gondola',
		bitmasks: [128],
		name: 'Cable Car',
		short: 'Cable Car',
		default: true,
	},
	{
		id: 'night-train',
		mode: 'train',
		bitmasks: [256],
		name: 'Night Train',
		short: 'Night Train',
		default: true,
	},
]

export {
	products,
}
