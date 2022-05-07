const products = [ // todo: what is `512`?
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [1],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [2],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'akn',
		mode: 'train',
		bitmasks: [4],
		name: 'AKN',
		short: 'A',
		default: true
	},
	{
		id: 'regional-express-train',
		mode: 'train',
		bitmasks: [8],
		name: 'RegionalExpress',
		short: 'RE',
		default: true
	},
	{
		id: 'regional-train',
		mode: 'train',
		bitmasks: [16],
		name: 'Regionalbahn',
		short: 'RB',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [32],
		name: 'Fähre',
		short: 'F',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [128],
		name: 'Bus',
		short: 'Bus',
		default: true
	},
	{
		id: 'express-bus',
		mode: 'bus',
		bitmasks: [256],
		name: 'Schnellbus',
		short: 'Schnellbus',
		default: true
	},
	{
		id: 'anruf-sammel-taxi',
		mode: null, // todo
		bitmasks: [1024],
		name: 'Anruf-Sammel-Taxi',
		short: 'AST',
		default: true
	},
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [4096, 64],
		name: 'Fernzug',
		short: 'ICE/IC/EC/EN',
		default: false
	},
	{
		id: 'long-distance-bus',
		mode: 'bus',
		bitmasks: [2048],
		name: 'Fernbus',
		short: 'Fernbus',
		default: false
	}
]

export {
	products,
}
