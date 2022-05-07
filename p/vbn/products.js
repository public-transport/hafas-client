const products = [
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress',
		short: 'ICE',
		default: true
	},
	{
		id: 'national-train',
		mode: 'train',
		bitmasks: [2, 4],
		name: 'InterCity, EuroCity, CityNightLine, InterRegio',
		short: 'IC/EC/CNL/IR',
		default: true
	},
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [8],
		name: 'Nahverkehr',
		short: 'Nahv.',
		default: true
	},
	{
		id: 'suburban',
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
	{
		id: 'watercraft',
		mode: 'watercraft',
		bitmasks: [64],
		name: 'Schiff',
		short: 'Schiff',
		default: true
	},
	{
		id: 'subway',
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
		short: 'Tram',
		default: true
	},
	{
		id: 'dial-a-ride',
		mode: 'taxi', // todo: or `bus`?
		bitmasks: [256],
		name: 'Anrufverkehr',
		short: 'AST',
		default: true
	}
]

export {
	products,
}
