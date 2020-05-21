'use strict'

const test = require('tape')

const createClient = require('..')
const rawProfile = require('../p/db')
const res = require('./fixtures/db-arrivals.json')
const expected = require('./fixtures/db-arrivals.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	direction: null,
	duration: 10,
	linesOfStops: true,
	remarks: true,
	stopovers: true,
	includeRelatedStations: true,
	when: '2019-08-19T20:30:00+02:00',
	products: {}
}

test('parses an arrival correctly (DB)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const arrivals = res.jnyL.map(d => profile.parseArrival(ctx, d))

	t.deepEqual(arrivals, expected)
	t.end()
})
