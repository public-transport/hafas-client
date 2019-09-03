'use strict'

const test = require('tape')
const parse = require('../../parse/hint')

const profile = {}

test('parses hints correctly', (t) => {
	const input = {
		type: 'A',
		code: 'bf',
		prio: 123,
		txtN: 'some text'
	}
	const expected = {
		type: 'hint',
		code: 'bf',
		text: 'some text'
	}

	t.deepEqual(parse(profile, input), expected)
	t.deepEqual(parse(profile, {
		...input, type: 'I'
	}), expected)

	// alternative trip
	t.deepEqual(parse(profile, {
		...input, type: 'L', jid: 'trip id'
	}), {
		...expected, type: 'status', code: 'alternative-trip', tripId: 'trip id'
	})

	// type: M
	t.deepEqual(parse(profile, {
		...input, type: 'M', txtS: 'some summary'
	}), {
		...expected, type: 'status', summary: 'some summary'
	})

	// type: D
	for (const type of ['D', 'U', 'R', 'N', 'Y']) {
		t.deepEqual(parse(profile, {...input, type}), {
			...expected, type: 'status'
		})
	}

	// .code via .icon
	t.deepEqual(parse(profile, {
		...input, code: null, icon: {type: 'cancel'}
	}), {...expected, code: 'cancelled'})

	// invalid
	t.equal(parse(profile, {...input, type: 'X'}), null)

	t.end()
})
