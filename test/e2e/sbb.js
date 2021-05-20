'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const sbbProfile = require('../../p/sbb')
const products = require('../../p/sbb/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')
const testReachableFrom = require('./lib/reachable-from')

const when = createWhen(sbbProfile.timezone, sbbProfile.locale)

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 40.288,
	minLongitude: 1.406,
	maxLatitude: 54.591,
	maxLongitude: 20.303,
}

const validate = createValidate(cfg)

const client = createClient(sbbProfile, 'public-transport/hafas-client:test')

const basel = '22'
const baselSBB = '8500010'
const lausanne = '8501120'
const oetwilAmSee = {
	type: 'location',
	address: '8618 Oetwil am See, Morgental 3',
	latitude: 47.278873, longitude: 8.726485,
}

tap.test('journeys – Basel to Lausanne', async (t) => {
	const res = await client.journeys(basel, lausanne, {
		results: 4,
		departure: when,
		stopovers: true,
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromIds: [basel, baselSBB],
		toId: lausanne,
	})
	t.end()
})

tap.test('Lausanne to 8618 Oetwil am See, Morgental', async (t) => {
	const res = await client.journeys(lausanne, oetwilAmSee, {
		results: 3,
		departure: when,
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: lausanne,
		to: oetwilAmSee,
	})
	t.end()
})

tap.test('Lausanne to ETH Institut für Pflanzenwissenschaften', async (t) => {
	const ethPflanzenwissenschaften = {
		type: 'location',
		id: '980008611',
		poi: true,
		name: 'Lindau, ETH Zürich Institut für Pflanzenwissenscha',
		latitude: 47.44948, longitude: 8.681971,
	}
	const res = await client.journeys(lausanne, ethPflanzenwissenschaften, {
		results: 3,
		departure: when,
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: lausanne,
		to: ethPflanzenwissenschaften,
	})
	t.end()
})

// todo: via works – with detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: baselSBB,
		toId: lausanne,
		when
	})

	t.end()
})

tap.test('refreshJourney', async (t) => {
	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: baselSBB,
		toId: lausanne,
		when
	})
	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(baselSBB, lausanne, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

// todo: fails with `CGI_READ_FAILED`
tap.skip('departures at Lausanne', async (t) => {
	const departures = await client.departures(lausanne, {
		duration: 10, when,
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: lausanne
	})
	t.end()
})

// todo: fails with `CGI_READ_FAILED`
tap.skip('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: '8501120',
		name: 'Lausanne',
		location: {
			type: 'location',
			id: '8501120',
			latitude: 46.516777, longitude: 6.629095,
		},
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

// todo: fails with `CGI_READ_FAILED`
tap.skip('arrivals at Lausanne', async (t) => {
	const arrivals = await client.arrivals(lausanne, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: lausanne
	})
	t.end()
})

// todo: nearby

tap.test('locations named "ETH Hönggerberg"', async (t) => {
	const locations = await client.locations('ETH Hönggerberg', {
		results: 10,
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	const ethHönggerberg = '8591122'
	t.ok(locations.some((l) => {
		return l.station && l.station.id === ethHönggerberg || l.id === ethHönggerberg
	}))

	t.end()
})

tap.test('stop Lausanne', async (t) => {
	const s = await client.stop(lausanne)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, lausanne)

	t.end()
})

tap.test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 46.9984,
		west: 7.3495,
		south: 7.5565,
		east: 46.8882,
	}, {
		duration: 5 * 60, when, results: 10,
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})

tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: oetwilAmSee,
		when,
		maxDuration: 15,
		validate,
	})
	t.end()
})
