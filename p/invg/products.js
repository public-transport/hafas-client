const products = [
	// https://github.com/public-transport/hafas-client/issues/93#issuecomment-437868265
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [1, 16],
		name: 'Bus',
		short: 'Bus',
		default: true // the other `bus` has `false`
	},
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [2],
		name: 'High-speed train',
		short: 'Train',
		default: false
	},
	{
		id: 'regional-train',
		mode: 'train',
		bitmasks: [4],
		name: 'Regional train',
		short: 'Train',
		default: false
	},
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [8],
		name: 'Nahverkehrszug',
		short: 'Zug',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [32],
		name: 'Ferry',
		short: 'Ferry',
		default: false
	},
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [64],
		name: 'Subway',
		short: 'Subway',
		default: false
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [128],
		name: 'Tram',
		short: 'Tram',
		default: false
	},
	{
		id: 'on-demand',
		mode: 'bus', // todo: correct?
		bitmasks: [256],
		name: 'On-demand traffic',
		short: 'on demand',
		default: false
	}
]

export {
	products,
}
