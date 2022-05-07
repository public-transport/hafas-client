// todo: what is `512`?
const products = [
	{
		id: 'long-distance-train',
		mode: 'train',
		bitmasks: [1, 2, 4],
		name: 'long-distance train',
		short: 'ICE/IC/EC',
		default: true
	},
	{
		id: 'regional-train',
		mode: 'train',
		// 8 is *not* always RB, 16 is *not* always RE!
		bitmasks: [8, 16],
		name: 'regional train',
		short: 'RE/RB',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [32],
		name: 'tram',
		short: 'tram',
		default: true
	},
	// todo: what are `64` & `128`?
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [256],
		name: 'bus',
		short: 'bus',
		default: true
	}
]

export {
	products,
}
