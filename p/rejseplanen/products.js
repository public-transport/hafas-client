const products = [
	{
		id: 'national-train',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCity',
		short: 'IC',
		default: true,
	},
	{
		id: 'national-train-2',
		mode: 'train',
		bitmasks: [2],
		name: 'ICL', // todo: find proper name
		short: 'ICL',
		default: true,
	},
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [4],
		name: 'Regional',
		short: 'RE',
		default: true,
	},
	{
		id: 'o',
		mode: 'train', // todo: correct?
		bitmasks: [8],
		name: 'Ø', // todo: find proper name
		short: 'Ø',
		default: true,
	},
	{
		id: 's-tog',
		mode: 'train',
		bitmasks: [16],
		name: 'S-Tog A/B/Bx/C/E/F/H',
		short: 'S',
		default: true,
	}
]

export {
	products,
}
