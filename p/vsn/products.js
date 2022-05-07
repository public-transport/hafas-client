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
		name: 'Fernzug',
		short: 'IC/EC/CNL',
		default: true
	},
	{
		id: 'regionalExpress',
		mode: 'train',
		bitmasks: [4],
		name: 'RegionalExpress & InterRegio',
		short: 'RE/IR',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [8],
		name: 'Nahverhehr',
		short: 'NV',
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
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [64],
		name: 'Schiff',
		short: 'F',
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
		name: 'Straßen-/Stadtbahn',
		short: 'T',
		default: true
	},
	{
		id: 'anrufSammelTaxi',
		mode: 'taxi',
		bitmasks: [512],
		name: 'Anruf-Sammel-Taxi',
		short: 'AST',
		default: true
	},
]

export {
	products,
}
