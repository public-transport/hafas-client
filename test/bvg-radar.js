'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')

const createClient = require('..')
const rawProfile = require('../p/bvg')
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
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const movements = res.jnyL.map(m => profile.parseMovement(ctx, m))

	t.deepEqual(movements, expected)
	t.end()
})
