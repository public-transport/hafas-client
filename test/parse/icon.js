'use strict'

const test = require('tape')
const parse = require('../../parse/icon')

test('parses icons correctly', (t) => {
	const profile = {}

	const text = {
		"res": "BVG",
		"text": "Berliner Verkehrsbetriebe"
	}
	t.deepEqual(parse(profile, text), {
		type: 'BVG',
		title: 'Berliner Verkehrsbetriebe'
	})

	const txtS = {
		"res": "PROD_BUS",
		"txtS": "18"
	}
	t.deepEqual(parse(profile, txtS), {
		type: 'PROD_BUS',
		title: '18'
	})

	const txt = {
		"res": "RBB",
		"txt": "Regionalbus Braunschweig GmbH"
	}
	t.deepEqual(parse(profile, txt), {
		type: 'RBB',
		title: 'Regionalbus Braunschweig GmbH'
	})

	const noText = {
		"res": "attr_bike_r"
	}
	t.deepEqual(parse(profile, noText), {
		type: 'attr_bike_r',
		title: null
	})

	const withColor = {
		"res": "prod_sub_t",
		"fg": {
			"r": 255,
			"g": 255,
			"b": 255,
			"a": 255
		},
		"bg": {
			"r": 0,
			"g": 51,
			"b": 153,
			"a": 255
		}
	}
	t.deepEqual(parse(profile, withColor), {
		type: 'prod_sub_t',
		title: null,
		fgColor: {r: 255, g: 255, b: 255, a: 255},
		bgColor: {r: 0, g: 51, b: 153, a: 255}
	})
	t.end()
})
