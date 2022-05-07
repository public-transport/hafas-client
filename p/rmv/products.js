const products = [
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress/Fernzug',
		short: 'ICE',
		default: true
	},
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [2],
		name: 'EuroCity/InterCity/EuroNight/InterRegio',
		short: 'EC/IC/EN/IR',
		default: true
	},
	{
		id: 'regiona-train',
		mode: 'train',
		bitmasks: [4],
		name: 'RegionalExpress/Regionalbahn',
		short: 'RE/RB',
		default: true
	},
	{
		id: 's-bahn',
		mode: 'train',
		bitmasks: [8],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'u-bahn',
		mode: 'train',
		bitmasks: [16],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [32],
		name: 'Straßenbahn',
		short: 'Tram',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [64, 128],
		name: 'Bus',
		short: 'Bus',
		default: true
	},
	{
		id: 'watercraft',
		mode: 'watercraft',
		bitmasks: [256],
		name: 'Schiff',
		short: 'Schiff',
		default: true
	},
	{
		id: 'ast',
		mode: 'taxi', // todo: or `bus`?
		bitmasks: [512],
		name: 'Anruf-Sammel-Taxi',
		short: 'AST',
		default: true
	},
	{
		id: 'cable-car',
		mode: 'gondola',
		bitmasks: [1024],
		name: 'Seilbahn',
		short: 'Seilbahn',
		default: true
	}
	// todo: remaining bitmask `1015`
]

export {
	products,
}
