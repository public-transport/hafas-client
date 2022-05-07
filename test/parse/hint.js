import tap from 'tap'
import {parseHint as parse} from '../../parse/hint.js'

const ctx = {
	data: {},
	opt: {},
	profile: {}
}

tap.test('parses hints correctly', (t) => {
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

	t.same(parse(ctx, input), expected)
	t.same(parse(ctx, {
		...input, type: 'I'
	}), expected)

	// alternative trip
	t.same(parse(ctx, {
		...input, type: 'L', jid: 'trip id'
	}), {
		...expected, type: 'status', code: 'alternative-trip', tripId: 'trip id'
	})

	// type: M
	t.same(parse(ctx, {
		...input, type: 'M', txtS: 'some summary'
	}), {
		...expected, type: 'status', summary: 'some summary'
	})

	// type: D
	for (const type of ['D', 'U', 'R', 'N', 'Y']) {
		t.same(parse(ctx, {...input, type}), {
			...expected, type: 'status'
		})
	}

	// .code via .icon
	t.same(parse(ctx, {
		...input, code: null, icon: {type: 'cancel'}
	}), {...expected, code: 'cancelled'})

	// invalid
	t.equal(parse(ctx, {...input, type: 'X'}), null)

	t.end()
})
