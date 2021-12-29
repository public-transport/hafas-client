'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const rmvProfile = require('../../p/rmv')
const products = require('../../p/rmv/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testArrivals = require('./lib/arrivals')
const testReachableFrom = require('./lib/reachable-from')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(rmvProfile.timezone, rmvProfile.locale, T_MOCK)

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

tap.test('journeys – Frankfurt Ostendstr. to Wiesbaden Hbf', async (t) => {
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

tap.test('trip details', async (t) => {
	const res = await client.journeys(frankfurtOstendstr, wiesbadenHbf, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, p.line.name, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('arrivals at Wiesbaden Hbf', async (t) => {
	const res = await client.arrivals(wiesbadenHbf, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: wiesbadenHbf,
	})
	t.end()
})

// todo: nearby

tap.test('radar', async (t) => {
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

tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: {
			type: 'location',
			id: '9001709',
			name: 'Frankfurt (Main) Musterschule',
			poi: true,
			latitude: 50.122027, longitude: 8.68536,
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
