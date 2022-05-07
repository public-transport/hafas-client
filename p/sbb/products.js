const products = [
	{
		id: 'express-train',
		mode: 'train',
		bitmasks: [1],
		name: 'ICE/EN/CNL/ES/RJ/TGV/THA',
		short: 'ICE/TGV/RJ',
		default: true,
	},
	{
		id: 'international-train',
		mode: 'train',
		bitmasks: [2],
		name: 'EC/IC/ICN/OEC',
		short: 'EC/IC',
		default: true,
	},
	{
		id: 'interregional-train',
		mode: 'train',
		bitmasks: [4],
		name: 'IR/PE',
		short: 'IR',
		default: true,
	},
	{
		id: 'regional-express-train',
		mode: 'train',
		bitmasks: [8],
		name: 'RE/D',
		short: 'RE',
		default: true,
	},
	{
		id: 'watercraft',
		mode: 'watercraft',
		bitmasks: [16],
		name: 'Schiff/Fähre/Dampfschiff',
		short: 'Schiff',
		default: true,
	},
	{
		id: 'suburban-train',
		mode: 'train',
		bitmasks: [32],
		name: 'S/SN/R/TER/RB',
		short: 'S',
		default: true,
	},
	{
		id: 'bus-taxi',
		mode: 'bus',
		bitmasks: [64],
		name: 'Bus/Taxi',
		short: 'Bus',
		default: true,
	},
	{
		id: 'gondola',
		mode: 'gondola',
		// e.g. `FUN 13` ("Gurtenbahn") at Gurten Kulm (ID `8507099`)
		bitmasks: [128],
		name: 'Standseilbahn/Gondelbahn/Luftseilbahn/Sesselbahn',
		short: 'Seilbahn/Zahnradbahn',
		default: true,
	},
	{
		id: 'car-train',
		mode: 'train',
		bitmasks: [256], // todo: correct?
		name: 'Autoreisezug/Extrazug',
		short: 'ARZ/EXT',
		default: true,
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [512],
		name: 'Tram/Metro',
		short: 'Tram/Metro',
		default: true,
	},
]

export {
	products,
}
