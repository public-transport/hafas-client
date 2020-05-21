'use strict'

const test = require('tape')

const createClient = require('..')
const rawProfile = require('../p/db')
const res = require('./fixtures/db-journey.json')
const expected = require('./fixtures/db-journey.js')

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
	departure: '2020-04-10T20:33+02:00',
	products: {}
}

test('parses a journey with a DEVI leg correctly (DB)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journey = profile.parseJourney(ctx, res.outConL[2])

	t.deepEqual(journey, expected)
	t.end()
})
