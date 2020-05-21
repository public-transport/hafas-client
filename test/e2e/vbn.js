'use strict'

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const vbnProfile = require('../../p/vbn')
const products = require('../../p/vbn/products')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testRefreshJourney = require('./lib/refresh-journey')
const testArrivals = require('./lib/arrivals')
const testReachableFrom = require('./lib/reachable-from')

const when = createWhen(vbnProfile.timezone, vbnProfile.locale)

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 51.817,
	maxLatitude: 53.657,
	minLongitude: 5.248,
	maxLongitude: 11.719
}

const validate = createValidate(cfg)

const client = createClient(vbnProfile, 'public-transport/hafas-client:test')

const oldenburg = '8000291'
const bremenHumboldtstr = '9013973'

test('journeys – Oldenburg to Bremen Humboldtstr.', async (t) => {
	const res = await client.journeys(oldenburg, bremenHumboldtstr, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: oldenburg,
		toId: bremenHumboldtstr
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

test('trip details', async (t) => {
	const res = await client.journeys(oldenburg, bremenHumboldtstr, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('arrivals at Bremen Humboldtstr.', async (t) => {
	const arrivals = await client.arrivals(bremenHumboldtstr, {
		duration: 10, when
	})

	validate(t, arrivals, 'arrivals', 'arrivals')
	t.ok(arrivals.length > 0, 'must be >0 arrivals')
	t.deepEqual(arrivals, arrivals.sort((a, b) => t.when > b.when))
	t.end()
})

// todo: nearby

test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 53.090516,
		west: 8.750106,
		south: 53.062859,
		east: 8.847423
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})

test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: {
			type: 'location',
			id: '910001421',
			name: 'Rathaus, Bremen',
			poi: true,
			latitude: 53.076053, longitude: 8.808008,
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
