const products = [
	{
		id: 'nationalExpress',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress & RailJet',
		short: 'ICE/RJ',
		default: true
	},
	{
		id: 'national',
		mode: 'train',
		bitmasks: [2, 4],
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		default: true
	},
	{
		id: 'interregional',
		mode: 'train',
		bitmasks: [8, 4096],
		name: 'Durchgangszug & EuroNight',
		short: 'D/EN',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [16],
		name: 'Regional & RegionalExpress',
		short: 'R/REX',
		default: true
	},
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [32],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [64],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [128],
		name: 'Ferry',
		short: 'F',
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
		id: 'tram',
		mode: 'train',
		bitmasks: [512],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		id: 'onCall',
		mode: null, // todo
		bitmasks: [2048],
		name: 'on-call transit, lifts, etc',
		short: 'on-call/lift',
		default: true
	}
]

export {
	products,
}
