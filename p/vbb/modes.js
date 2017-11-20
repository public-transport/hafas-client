'use strict'

// todo: remove useless keys
const m = {
	suburban: {
		category: 0,
		bitmask:  1,
		name:     'S-Bahn',
		mode:     'train',
		short:    'S',
		type:     'suburban',
		color:    '#008c4f',
		unicode:  '🚈',
		ansi:     ['green'] // `chalk` color code
	},

	subway: {
		category: 1,
		bitmask:  2,
		name:     'U-Bahn',
		mode:     'train',
		short:    'U',
		type:     'subway',
		color:    '#0067ac',
		unicode:  '🚇',
		ansi:     ['blue'] // `chalk` color code
	},

	tram: {
		category: 2,
		bitmask:  4,
		name:     'Tram',
		mode:     'train',
		short:    'T',
		type:     'tram',
		color:    '#e3001b',
		unicode:  '🚋',
		ansi:     ['red'] // `chalk` color code
	},

	bus: {
		category: 3,
		bitmask:  8,
		name:     'Bus',
		mode:     'train',
		short:    'B',
		type:     'bus',
		color:    '#922A7D',
		unicode:  '🚌',
		ansi:     ['dim', 'magenta'] // `chalk` color codes
	},

	ferry: {
		category: 4,
		bitmask:  16,
		name:     'Fähre',
		mode:     'train',
		short:    'F',
		type:     'ferry',
		color:    '#099bd6',
		unicode:  '🚢',
		ansi:     ['cyan'] // `chalk` color code
	},

	express: {
		category: 5,
		bitmask:  32,
		name:     'IC/ICE',
		mode:     'train',
		short:    'E',
		type:     'express',
		color:    '#f4e613',
		unicode:  '🚄',
		ansi:     ['yellow'] // `chalk` color code
	},

	regional: {
		category: 6,
		bitmask:  64,
		name:     'RB/RE',
		mode:     'train',
		short:    'R',
		type:     'regional',
		color:    '#D9222A',
		unicode:  '🚆',
		ansi:     ['red'] // `chalk` color code
	},

	unknown: {
		category: null,
		bitmask:  0,
		name:     'unknown',
		mode:     null,
		short:    '?',
		type:     'unknown',
		color:    '#555555',
		unicode:  '?',
		ansi:     ['gray'] // `chalk` color code
	}
}

m.bitmasks = []
m.bitmasks[1] = m.suburban
m.bitmasks[2] = m.subway
m.bitmasks[4] = m.tram
m.bitmasks[8] = m.bus
m.bitmasks[16] = m.ferry
m.bitmasks[32] = m.express
m.bitmasks[64] = m.regional

m.categories = [
	m.suburban,
	m.subway,
	m.tram,
	m.bus,
	m.ferry,
	m.express,
	m.regional,
	m.unknown
]

// m.parseCategory = (category) => {
// 	return m.categories[parseInt(category)] || m.unknown
// }

// todo: move up
m.stringifyBitmask = (types) => {
	let bitmask = 0
	for (let type in types) {
		if (types[type] === true) bitmask += m[type].bitmask
	}
	return bitmask
}

// todo: move up
m.parseBitmask = (bitmask) => {
	let types = {}, i = 1
	do {
		types[m.bitmasks[i].type] = !!(bitmask & i)
		i *= 2
	} while (m.bitmasks[i] && m.bitmasks[i].type)
	return types
}

module.exports = m
