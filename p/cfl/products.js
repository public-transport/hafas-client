const products = [
	// todo: other bits
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [1, 2],
		name: 'TGV, ICE, EuroCity',
		short: 'TGV/ICE/EC',
		default: true
	},
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [8, 16],
		name: 'local trains',
		short: 'local',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [256],
		name: 'tram',
		short: 'tram',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'bus',
		short: 'bus',
		default: true
	},
	{
		id: 'gondola',
		mode: 'gondola',
		bitmasks: [512],
		name: 'Fun', // taken from the horaires.cfl.lu website
		short: 'Fun', // abbreviation for funicular?
		default: true
	}
]

export {
	products,
}
