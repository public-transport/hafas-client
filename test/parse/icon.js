import tap from 'tap'
import {parseIcon as parse} from '../../parse/icon.js'

const ctx = {
	data: {},
	opt: {},
	profile: {}
}

tap.test('parses icons correctly', (t) => {
	const text = {
		"res": "BVG",
		"text": "Berliner Verkehrsbetriebe"
	}
	t.same(parse(ctx, text), {
		type: 'BVG',
		title: 'Berliner Verkehrsbetriebe'
	})

	const txtS = {
		"res": "PROD_BUS",
		"txtS": "18"
	}
	t.same(parse(ctx, txtS), {
		type: 'PROD_BUS',
		title: '18'
	})

	const txt = {
		"res": "RBB",
		"txt": "Regionalbus Braunschweig GmbH"
	}
	t.same(parse(ctx, txt), {
		type: 'RBB',
		title: 'Regionalbus Braunschweig GmbH'
	})

	const noText = {
		"res": "attr_bike_r"
	}
	t.same(parse(ctx, noText), {
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
	t.same(parse(ctx, withColor), {
		type: 'prod_sub_t',
		title: null,
		fgColor: {r: 255, g: 255, b: 255, a: 255},
		bgColor: {r: 0, g: 51, b: 153, a: 255}
	})

	const empty = {
		"res": "Empty"
	}
	t.equal(parse(ctx, empty), null)

	t.end()
})
