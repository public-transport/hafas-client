const products = [
	{
		id: 'nationalExpress',
		mode: 'train',
		bitmasks: [1],
		name: 'High-speed rail',
		short: 'ICE/HSR',
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
	{ // todo: also includes EN?
		id: 'interregional',
		mode: 'train',
		bitmasks: [4],
		name: 'Interregional',
		short: 'IR',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [8],
		name: 'Regional & RegionalExpress',
		short: 'RB/RE',
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
		short: 'B',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [64],
		name: 'Ferry',
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
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		id: 'onCall',
		mode: 'bus', // todo: is this correct?
		bitmasks: [512],
		name: 'On-call transit',
		short: 'on-call',
		default: true
	}
]

export {
	products,
}
