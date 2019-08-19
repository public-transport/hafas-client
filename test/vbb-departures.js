'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')

const createClient = require('..')
const rawProfile = require('../p/vbb')
const raw = require('./fixtures/vbb-departures.json')
const expected = require('./fixtures/vbb-departures.js')

const test = tapePromise(tape)
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
	const common = profile.parseCommon(profile, opt, raw)
	const parseDeparture = profile.parseDeparture(profile, opt, common)
	const departures = raw.jnyL.map(parseDeparture)

	t.deepEqual(departures, expected)
	t.end()
})
