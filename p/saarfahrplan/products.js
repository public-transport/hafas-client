const products = [
	{
		id: 'nationalExpress',
		mode: 'train',
		bitmasks: [8192],
		name: 'Hochgeschwindigkeitszug',
		short: 'ICE',
		default: true
	},
	{
		id: 'national',
		mode: 'train',
		bitmasks: [4096],
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		default: true
	},
	{
		id: 'interregional',
		mode: 'train',
		bitmasks: [2048],
		name: 'InterRegio',
		short: 'IR',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [1024],
		name: 'Regionalzug',
		short: 'RB ?', // todo
		default: true
	},
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [512],
		name: 'S-Bahn',
		short: 'S-Bahn',
		default: true
	},
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [256],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'saarbahn',
		mode: 'train',
		bitmasks: [128],
		name: 'Saarbahn',
		short: 'S',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [64],
		name: 'Bus',
		short: 'Bus',
		default: true
	},
	{
		id: 'watercraft',
		mode: 'watercraft',
		bitmasks: [32], // todo: correct?
		name: 'Schiff',
		short: 'Schiff',
		default: true
	},
	{
		id: 'onCall',
		mode: null, // todo
		bitmasks: [16],
		name: 'Anruf-Sammel-Taxi',
		short: 'AST',
		default: true
	},
	{
		id: 'school-bus',
		mode: 'bus',
		bitmasks: [8],
		name: 'Schulbus',
		short: 'Schulbus',
		default: true
	}
	// todo: `1`, `2`, `4` bitmasks?
]

export {
	products,
}
