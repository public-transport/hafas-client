const products = [
	{
		id: 'regional-train',
		mode: 'train',
		bitmasks: [8],
		// todo: specify explicitly which
		name: 'regional train',
		short: 'regional train',
		default: true,
	},
	{
		id: 'urban-train',
		mode: 'train',
		bitmasks: [16],
		name: 'urban train',
		short: 'urban train',
		default: true,
	},
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [128],
		name: 'subway',
		short: 'subway',
		default: true,
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [256],
		name: 'tram',
		short: 'tram',
		default: true,
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'bus',
		short: 'bus',
		default: true,
	},
	{
		id: 'dial-a-ride',
		mode: 'taxi',
		bitmasks: [512],
		name: 'dial-a-ride',
		short: 'dial-a-ride',
		default: true,
	},
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [4],
		// todo: specify explicitly which
		name: 'long-distance train',
		short: 'long-distance train',
		default: true,
	},
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [1],
		name: 'ICE',
		short: 'ICE',
		default: true,
	},
	{
		id: 'ec-ic',
		mode: 'ec-ic',
		bitmasks: [2],
		name: 'EC/IC',
		short: 'EC/IC',
		default: true,
	}
]

export {
	products,
}
