const products = [
	{
		id: 'nationalExpress',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress',
		short: 'ICE',
		default: true
	},
	{
		id: 'national',
		mode: 'train',
		bitmasks: [2],
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [8],
		name: 'RegionalExpress & RegionalBahn',
		short: 'RE/RB',
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
		id: 'tram',
		mode: 'train',
		bitmasks: [32],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [64, 128],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		id: 'tourismTrain',
		mode: 'train',
		bitmasks: [256],
		name: 'Tourism Train',
		short: 'TT',
		default: true
	}
]

export {
	products,
}
