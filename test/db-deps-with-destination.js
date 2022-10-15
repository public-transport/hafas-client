'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/db')
const res = require('./fixtures/db-deps-with-destination.json')
// const expected = require('./fixtures/db-deps-with-destination.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	direction: null,
	duration: 10,
	linesOfStops: true,
	remarks: true,
	stopovers: true,
	includeRelatedStations: true,
	when: '2022-10-15T15:45:00+02:00',
	products: {},
}

tap.test('parses departure.destination correctly (DB)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const departure = profile.parseDeparture(ctx, res.jnyL[0])

	t.ok(departure.destination, 'missing departure.destination')
	t.equal(departure.destination.type, 'stop', 'invalid departure.destination.type')
	t.equal(departure.destination.id, '930200', 'invalid departure.destination.id')
	t.end()
})
