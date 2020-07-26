'use strict'

const test = require('tape')

const createClient = require('..')
const rawProfile = require('../p/db')
const res = require('./fixtures/db-journey-polyline.json')
const expected = require('./fixtures/db-journey-polyline.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: null,
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
	departure: '2020-07-27T10:00+02:00',
	products: {},
}

test('parses a journey with an embedded polyline correctly', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journey = profile.parseJourney(ctx, res.outConL[0])

	t.deepEqual(journey, expected)
	t.end()
})
