'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/sbb')
const res = require('./fixtures/sbb-journeys.json')
const expected = require('./fixtures/sbb-journeys.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: null,
	via: null,
	stopovers: false,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	walkingSpeed: 'normal',
	startWithWalking: true,
	tickets: false,
	polylines: false,
	subStops: true,
	entrances: true,
	remarks: true,
	scheduledDays: false,
	departure: '2020-12-07T13:29+01:00',
	products: {},
}

tap.test('parses a journeys() response correctly (SBB)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journeys = res.outConL.map(j => profile.parseJourney(ctx, j))

	t.same(journeys, expected)
	t.end()
})
