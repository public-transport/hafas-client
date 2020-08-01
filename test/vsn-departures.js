'use strict'

const test = require('tape')

const createClient = require('..')
const rawProfile = require('../p/vsn')
const res = require('./fixtures/vsn-departures.json')
const expected = require('./fixtures/vsn-departures.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	// results: null,
	// via: null,
	// stopovers: true,
	// transfers: -1,
	// transferTime: 0,
	// accessibility: 'none',
	// bike: false,
	// tickets: true,
	// polylines: true,
	// remarks: true,
	// walkingSpeed: 'normal',
	// startWithWalking: true,
	// scheduledDays: false,
	// departure: '2020-04-10T20:33+02:00',
	// products: {}
}

test('parses departures correctly (VSN)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}

	const dep = profile.parseDeparture(ctx, res.jnyL[0])
	t.deepEqual(dep, expected)
	t.end()
})
