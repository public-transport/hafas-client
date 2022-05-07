const products = [
	{
		id: 'high-speed-train',
		mode: 'train',
		bitmasks: [1, 2],
		name: 'ExpressInterCity & ExpressInterCity Premium & InterCityExpress',
		short: 'EIC/EIP/ICE',
		default: true
	},
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [4],
		name: 'InterCity & Twoje Linie Kolejowe & EuroCity & EuroNight',
		short: 'IC/TLK/EC/EN',
		default: true
	},
	{
		id: 'regional-train',
		mode: 'train',
		bitmasks: [8],
		name: 'Regional',
		short: 'R',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'Bus',
		short: 'B',
		default: true
	}
]

export {
	products,
}
