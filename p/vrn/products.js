const products = [
	// todo: what is `64`?
	{
		id: 'regional-train',
		mode: 'train',
		bitmasks: [8],
		name: 'regional train',
		short: 'RE/RB',
		default: true,
	},
	{
		id: 'urban-train',
		mode: 'train',
		bitmasks: [16],
		name: 'urban train',
		short: 'S',
		default: true,
	},
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [128],
		name: 'subway',
		short: 'U',
		default: true,
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [256],
		name: 'tram',
		short: 'Tram',
		default: true,
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'Bus',
		short: 'Bus',
		default: true,
	},
	{
		id: 'dial-a-ride',
		mode: 'taxi',
		bitmasks: [512],
		name: 'dial-a-ride',
		short: 'taxi',
		default: true,
	},
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [1, 2, 4],
		name: 'long-distance train',
		short: 'ICE/IC/EC/EN',
		default: false,
	},
]

export {
	products,
}
