const products = [
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [1],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [2],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [4],
		name: 'Tram',
		short: 'T',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [8],
		name: 'Bus',
		short: 'B',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [16],
		name: 'Fähre',
		short: 'F',
		default: true
	},
	{
		id: 'express',
		mode: 'train',
		bitmasks: [32],
		name: 'IC/ICE',
		short: 'E',
		default: true
	},
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [64],
		name: 'RB/RE',
		short: 'R',
		default: true
	},
	// 🤔
	// {
	// 	name: '',
	// 	nameS: '693',
	// 	number: '693',
	// 	icoX: 0,
	// 	cls: 512,
	// 	prodCtx: {
	// 		name: '        ',
	// 		num: '999999',
	// 		line: '693',
	// 		lineId: '693',
	// 		matchId: '693',
	// 		catOut: '',
	// 		catOutS: 'UUU',
	// 		catOutL: '',
	// 		catIn: 'UUU',
	// 		catCode: '9',
	// 		admin: ''
	// 	},
	// 	icon: {
	// 		type: 'prod_gen',
	// 		title: null,
	// 		fgColor: { r: 255, g: 255, b: 255 },
	// 		bgColor: { r: 0, g: 0, b: 0 }
	// 	}
	// }
	// {
	// 	name: '',
	// 	nameS: '616',
	// 	number: '616',
	// 	icoX: 0,
	// 	cls: 512,
	// 	prodCtx: {
	// 		name: '        ',
	// 		num: '999999',
	// 		line: '616',
	// 		lineId: '616',
	// 		matchId: '616',
	// 		catOut: '',
	// 		catOutS: 'UUU',
	// 		catOutL: '',
	// 		catIn: 'UUU',
	// 		catCode: '9',
	// 		admin: ''
	// 	},
	// 	icon: {
	// 		type: 'prod_gen',
	// 		title: null,
	// 		fgColor: { r: 255, g: 255, b: 255 },
	// 		bgColor: { r: 0, g: 0, b: 0 }
	// 	}
	// }
	// {
	// 	name: '',
	// 	number: '61024',
	// 	icoX: 0,
	// 	cls: 512,
	// 	prodCtx: {
	// 		name: '        ',
	// 		num: '61024',
	// 		matchId: '61024',
	// 		catOut: '',
	// 		catOutS: 'UUU',
	// 		catOutL: '',
	// 		catIn: 'UUU',
	// 		catCode: '9',
	// 		admin: ''
	// 	},
	// 	icon: {
	// 		type: 'prod_gen',
	// 		title: null,
	// 		fgColor: { r: 255, g: 255, b: 255 },
	// 		bgColor: { r: 0, g: 0, b: 0 }
	// 	}
	// }
	// {
	// 	name: '',
	// 	nameS: 'RB16',
	// 	number: 'RB16',
	// 	icoX: 0,
	// 	cls: 512,
	// 	prodCtx: {
	// 		name: '        ',
	// 		num: '999999',
	// 		line: 'RB16',
	// 		lineId: 'RB16',
	// 		matchId: 'RB16',
	// 		catOut: '',
	// 		catOutS: 'UUU',
	// 		catOutL: '',
	// 		catIn: 'UUU',
	// 		catCode: '9',
	// 		admin: ''
	// 	},
	// 	icon: {
	// 		type: 'prod_gen',
	// 		title: null,
	// 		fgColor: { r: 255, g: 255, b: 255 },
	// 		bgColor: { r: 0, g: 0, b: 0 }
	// 	}
	// }
	// {
	// 	name: '',
	// 	nameS: 'RB33',
	// 	number: 'RB33',
	// 	icoX: 0,
	// 	cls: 512,
	// 	prodCtx: {
	// 		name: '        ',
	// 		num: '999999',
	// 		line: 'RB33',
	// 		lineId: 'RB33',
	// 		matchId: 'RB33',
	// 		catOut: '',
	// 		catOutS: 'UUU',
	// 		catOutL: '',
	// 		catIn: 'UUU',
	// 		catCode: '9',
	// 		admin: ''
	// 	},
	// 	icon: {
	// 		type: 'prod_gen',
	// 		title: null,
	// 		fgColor: { r: 255, g: 255, b: 255 },
	// 		bgColor: { r: 0, g: 0, b: 0 }
	// 	}
	// }
	{
		id: 'unknown',
		mode: null,
		bitmasks: [512],
		name: 'unknown',
		short: '?',
		default: false,
	}
]

export {
	products,
}
