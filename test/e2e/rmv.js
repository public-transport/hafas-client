'use strict'

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const rmvProfile = require('../../p/rmv')
const products = require('../../p/rmv/products')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testRefreshJourney = require('./lib/refresh-journey')
const testArrivals = require('./lib/arrivals')
const testReachableFrom = require('./lib/reachable-from')

const when = createWhen(rmvProfile.timezone, rmvProfile.locale)

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 47,
	maxLatitude: 54,
	minLongitude: 6,
	maxLongitude: 11,
}

const validate = createValidate(cfg)

const client = createClient(rmvProfile, 'public-transport/hafas-client:test')

const frankfurtOstendstr = '3000525'
const wiesbadenHbf = '3006907'

test('journeys – Frankfurt Ostendstr. to Wiesbaden Hbf', async (t) => {
	const res = await client.journeys(frankfurtOstendstr, wiesbadenHbf, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: frankfurtOstendstr,
		toId: wiesbadenHbf
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

test('trip details', async (t) => {
	const res = await client.journeys(frankfurtOstendstr, wiesbadenHbf, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('arrivals at Wiesbaden Hbf', async (t) => {
	const arrivals = await client.arrivals(wiesbadenHbf, {
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
