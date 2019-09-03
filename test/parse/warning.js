'use strict'

const test = require('tape')
const parse = require('../../parse/warning')

const profile = {
	parseProducts: bitmask => [bitmask],
	parseDateTime: (_, date, time) => date + ':' + time
}

test('parses warnings correctly', (t) => {
	const input = {
		hid: 'some warning ID', // todo: null
		head: 'some<br>summary', // todo: null
		text: 'some long<br>text<br><br />body', // todo: null
		icon: {type: 'HimWarn'}, // todo: null
		prio: 123,
		cat: 1
	}
	const expected = {
		id: 'some warning ID',
		type: 'status',
		summary: 'some\nsummary',
		text: 'some long\ntext\n\nbody',
		icon: {type: 'HimWarn'},
		priority: 123,
		category: 1
	}

	t.deepEqual(parse(profile, input), expected)

	// without basic fields
	t.deepEqual(parse(profile, {...input, hid: null}), {...expected, id: null})
	t.deepEqual(parse(profile, {...input, head: null}), {...expected, summary: null})
	t.deepEqual(parse(profile, {...input, text: null}), {...expected, text: null})
	t.deepEqual(parse(profile, {...input, cat: null}), {...expected, category: null})

	// without icon
	t.deepEqual(parse(profile, {...input, icon: null}), {
		...expected, type: 'warning', icon: null
	})

	// with products
	t.deepEqual(parse(profile, {...input, prod: 123}), {
		...expected, products: [123]
	})

	// validFrom, validUntil, modified
	t.deepEqual(parse(profile, {
		...input,
		sDate: '20190101', sTime: '094020',
		eDate: '20190101', eTime: '114020',
		lModDate: '20190101', lModTime: '084020',
	}), {
		...expected,
		validFrom: '20190101:094020',
		validUntil: '20190101:114020',
		modified: '20190101:084020'
	})

	// todo: .edges, .events
	t.end()
})
