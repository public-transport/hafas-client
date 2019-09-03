'use strict'

const test = require('tape')
const parse = require('../../parse/operator')

test('parses an operator correctly', (t) => {
	const profile = {}

	const op = {
		"name": "Berliner Verkehrsbetriebe",
		"icoX": 1,
		"id": "Berliner Verkehrsbetriebe"
	}

	t.deepEqual(parse(profile, op), {
		type: 'operator',
		id: 'berliner-verkehrsbetriebe',
		name: 'Berliner Verkehrsbetriebe'
	})
	t.end()
})
