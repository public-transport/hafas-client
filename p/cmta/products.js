const products = [
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'MetroBus',
		short: 'B',
		default: true
	},
	{
		id: 'rapid',
		mode: 'bus',
		bitmasks: [4096],
		name: 'MetroRapid',
		short: 'R',
		default: true
	},
	{
		id: 'rail',
		mode: 'train',
		bitmasks: [8],
		name: 'MetroRail',
		short: 'M',
		default: true
	}
]

export {
	products,
}
