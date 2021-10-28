'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/bvg')
const res = require('./fixtures/bvg-arrivals.json')
const expected = require('./fixtures/bvg-arrivals.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	direction: null,
	duration: 10,
	linesOfStops: true,
	remarks: true,
	stopovers: true,
	includeRelatedStations: true,
	when: '2021-10-28T10:35:00+02:00',
	products: {}
}

tap.test('parses an arrival correctly (BVG)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const arrivals = res.jnyL.map(d => profile.parseArrival(ctx, d))

	t.same(arrivals, expected)
	t.end()
})
