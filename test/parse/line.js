'use strict'

const test = require('tape')
const parse = require('../../parse/line')

const profile = {
	products: [
		{id: 'train', bitmasks: [1]},
		{id: 'ferry', bitmasks: [2]},
		{id: 'bus', bitmasks: [4, 8]}
	]
}
const ctx = {
	data: {},
	opt: {},
	profile
}

test('parses lines correctly', (t) => {
	const input = {
		line: 'foo line',
		prodCtx: {
			lineId: 'Foo ',
			num: 123
		}
	}
	const expected = {
		type: 'line',
		id: 'foo',
		fahrtNr: 123,
		name: 'foo line',
		public: true
	}

	t.deepEqual(parse(ctx, input), expected)

	t.deepEqual(parse(ctx, {
		...input, line: null, addName: input.line
	}), expected)
	t.deepEqual(parse(ctx, {
		...input, line: null, name: input.line
	}), expected)

	// no prodCtx.lineId
	t.deepEqual(parse(ctx, {
		...input, prodCtx: {...input.prodCtx, lineId: null}
	}), {
		...expected, id: 'foo-line'
	})
	// no prodCtx
	t.deepEqual(parse(ctx, {
		...input, prodCtx: undefined
	}), {
		...expected, id: 'foo-line', fahrtNr: null
	})
	t.end()
})
