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
		name: 'InterCity/EuroCity',
		short: 'IC/EC',
		default: true
	},
	{
		id: 'ir-d',
		mode: 'train',
		bitmasks: [4],
		name: 'Interregio/Schnellzug',
		short: 'IRE',
		default: true
	},
	{
		id: 'region',
		mode: 'train',
		bitmasks: [8],
		name: 'Regio- und Nahverkehr',
		short: 'RE/RB',
		default: true
	},
	{
		id: 'sbahn',
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
		short: 'Bus',
		default: true
	},
	// todo: 64
	{
		id: 'ubahn',
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
		name: 'Straßenbahn',
		short: 'Tram',
		default: true
	},
	{
		id: 'on-call',
		mode: 'taxi', // todo: or `bus`?
		bitmasks: [512],
		name: 'Anrufsammeltaxi',
		short: 'Sammeltaxi',
		default: true
	}
]

export {
	products,
}
