'use strict'

const test = require('tape')
const parse = require('../../parse/operator')

const ctx = {
	data: {},
	opt: {},
	profile: {}
}
test('parses an operator correctly', (t) => {
	const op = {
		"name": "Berliner Verkehrsbetriebe",
		"icoX": 1,
		"id": "Berliner Verkehrsbetriebe"
	}

	t.deepEqual(parse(ctx, op), {
		type: 'operator',
		id: 'berliner-verkehrsbetriebe',
		name: 'Berliner Verkehrsbetriebe'
	})
	t.end()
})
