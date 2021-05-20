'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/db')
const res = require('./fixtures/db-journey-2.json')
const expected = require('./fixtures/db-journey-2.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: 4,
	via: null,
	stopovers: true,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	tickets: true,
	polylines: true,
	remarks: true,
	walkingSpeed: 'normal',
	startWithWalking: true,
	scheduledDays: false,
	departure: '2020-11-16T10:00:00+01:00',
	products: {}
}

tap.test('parses a journey remarks without failing', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journey = profile.parseJourney(ctx, res.outConL[2])

	t.same(journey, expected)
	t.end()
})
