'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/rsag')
const res = require('./fixtures/rsag-journey.json')
const expected = require('./fixtures/rsag-journey.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	stopovers: false,
	tickets: false,
	polylines: false,
	subStops: true,
	entrances: true,
	remarks: true,
	products: {}
}

tap.test('parses a journey correctly (RSAG)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journey = profile.parseJourney(ctx, res.outConL[0])

	t.same(journey, expected)
	t.end()
})
