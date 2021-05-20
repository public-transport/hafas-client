'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/insa')
const res = require('./fixtures/insa-stop.json')
const expected = require('./fixtures/insa-stop.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	linesOfStops: false, // parse & expose lines at the stop/station?
	remarks: true,
}

tap.test('parses a stop() response correctly (INSA)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const stop = profile.parseLocation(ctx, res.locL[0])

	t.same(stop, expected)
	t.end()
})
