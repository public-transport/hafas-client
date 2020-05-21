'use strict'

const test = require('tape')

const createClient = require('..')
const rawProfile = require('../p/vbb')
const res = require('./fixtures/vbb-departures.json')
const expected = require('./fixtures/vbb-departures.js')

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

test('parses a departure correctly (VBB)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const departures = res.jnyL.map(d => profile.parseDeparture(ctx, d))

	t.deepEqual(departures, expected)
	t.end()
})
