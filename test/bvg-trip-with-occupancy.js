'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/bvg')
const res = require('./fixtures/bvg-trip-with-occupancy.json')
const expected = require('./fixtures/bvg-trip-with-occupancy.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	stopovers: true,
	polyline: true,
	subStops: false,
	entrances: true,
	remarks: true,
	scheduledDays: true,
	when: '2021-10-28T09:28:00+02:00',
}

tap.test('parses an trip with occupancy correctly (BVG)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const trip = profile.parseTrip(ctx, res.journey)

	t.same(trip, expected)
	t.end()
})
