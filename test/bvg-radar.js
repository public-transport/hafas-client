'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')

const createClient = require('..')
const rawProfile = require('../p/bvg')
const createParse = require('../lib/create-parse')
const res = require('./fixtures/bvg-radar.json')
const expected = require('./fixtures/bvg-radar.js')

const test = tapePromise(tape)
const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: 256,
	duration: 30,
	frames: 3,
	products: null,
	polylines: true,
	departure: '2019-08-19T21:00:00+02:00',
	products: {}
}

test('parses a radar() response correctly (BVG)', (t) => {
	const ctx = {profile, opt, res}
	ctx.parse = createParse(ctx)
	ctx.common = ctx.parse('common')

	const movements = res.jnyL.map(m => ctx.parse('movement', m))

	t.deepEqual(movements, expected)
	t.end()
})
