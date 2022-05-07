const products = [
	{
		id: 'national-train',
		mode: 'train',
		bitmasks: [2],
		name: 'InterCity',
		short: 'IC',
		default: true
	},
	// todo: 4
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [8],
		name: 'Commuter',
		short: 'Commuter',
		default: true
	},
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [16],
		name: 'Dublin Area Rapid Transit',
		short: 'DART',
		default: true
	},
	// todo: 32
	{
		id: 'luas',
		mode: 'train',
		bitmasks: [64],
		name: 'LUAS Tram',
		short: 'LUAS',
		default: true
	}
]

export {
	products,
}
