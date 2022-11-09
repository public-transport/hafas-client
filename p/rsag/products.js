const products = [
	{
		id: 'ice',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress',
		short: 'ICE',
		default: true
	},
	{
		id: 'ic-ec',
		mode: 'train',
		bitmasks: [2],
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		default: true
	},
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [4],
		name: 'InterRegio/high-speed train',
		short: 'IR/other',
		default: true
	},
	{
		id: 'regional-train', // todo: rename
		mode: 'train',
		bitmasks: [8],
		name: 'regional train',
		short: 'RE/RB',
		default: true
	},
	{
		id: 's-bahn',
		mode: 'train',
		bitmasks: [16],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [64],
		name: 'Schiff',
		short: 'F',
		default: true
	},
	{
		id: 'u-bahn',
		mode: 'train',
		bitmasks: [128],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [256],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		id: 'on-call',
		mode: 'taxi', // todo: or `bus`?
		bitmasks: [512],
		name: 'Taxi/on-call vehicle',
		short: 'AST',
		default: true
	}
]

export {
	products,
}
