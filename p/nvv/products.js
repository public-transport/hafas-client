const products = [
	// todo: what is `256`?
	{
		id: 'express',
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
		name: 'EuroCity/InterCity',
		short: 'EC/IC',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [4],
		name: 'Regionalzug',
		short: 'RE/RB',
		default: true
	},
	{
		id: 'regiotram',
		mode: 'train',
		bitmasks: [1024, 16, 8], // it is `1048` actually
		name: 'RegioTram',
		short: 'RegioTram',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [4, 32],
		name: 'Tram',
		short: 'Tram',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [128, 64], // it is `192` actually
		name: 'Bus',
		short: 'Bus',
		default: true
	},
	{
		id: 'on-call',
		mode: 'taxi', // todo: or `bus`?
		bitmasks: [512],
		name: 'AnrufSammelTaxi',
		short: 'Sammeltaxi',
		default: true
	}
]

export {
	products,
}
