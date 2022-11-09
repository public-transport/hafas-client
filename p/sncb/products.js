// https://www.belgiantrain.be/en/support/faq/faq-routes-schedules/faq-train-types
const products = [ // todo: 2, 8, 32, 128
	{
		id: 'high-speed-train',
		mode: 'train',
		bitmasks: [1],
		name: 'high-speed train',
		short: 'HST',
		default: true
	},
	{
		id: 'intercity-p',
		mode: 'train',
		bitmasks: [4],
		name: 'InterCity/Peak',
		short: 'IC/P',
		default: true
	},
	{
		id: 's-train',
		mode: 'train',
		bitmasks: [16],
		name: 'S-train',
		short: 'S',
		default: true
	},
	{
		id: 'local-train',
		mode: 'train',
		bitmasks: [64],
		name: 'local train',
		short: 'L',
		default: true
	},
	{
		id: 'metro',
		mode: 'train',
		bitmasks: [256],
		name: 'Metro',
		short: 'M',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [512],
		name: 'bus',
		short: 'bus',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [1024],
		name: 'tram',
		short: 'tram',
		default: true
	}
]

export {
	products,
}
