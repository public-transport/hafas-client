'use strict'

const test = require('tape')

const createClient = require('..')
const rawProfile = require('../p/vsn')
const res = require('./fixtures/vsn-remarks.json')
const expected = require('./fixtures/vsn-remarks.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: 100, // maximum number of remarks
	// filter by time
	from: Date.now(), to: null,
	products: null, // filter by affected products
}

test('parses a remarks() response correctly (VSN)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const warnings = res.msgL.map(w => profile.parseWarning(ctx, w))

	t.deepEqual(warnings, expected)
	t.end()
})
