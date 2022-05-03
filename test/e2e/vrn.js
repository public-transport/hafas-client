'use strict'

const tap = require('tap')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const vrnProfile = require('../../p/vrn')
const products = require('../../p/vrn/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testArrivals = require('./lib/arrivals')

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(vrnProfile.timezone, vrnProfile.locale, T_MOCK)

const cfg = {
	when,
	// stationCoordsOptional: false,
	products,
	minLatitude: 48.462,
	minLongitude: 6.163,
	maxLatitude: 50.440,
	maxLongitude: 10.701,
}

const validate = createValidate(cfg, {})

const client = createClient(vrnProfile, 'public-transport/hafas-client:test')

const ludwigshafen = '8000236'
const meckesheim = '8003932'

tap.test('journeys – Ludwigshafen to Meckesheim', async (t) => {
	const res = await client.journeys(ludwigshafen, meckesheim, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: ludwigshafen,
		toId: meckesheim
	})
	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: ludwigshafen,
		toId: meckesheim,
		when,
		products
	})
	t.end()
})

tap.test('Ludwigshafen to Pestalozzistr. 2, Ludwigshafen', async (t) => {
	const pestalozzistr2 = {
		type: 'location',
		id: '980787337',
		address: 'Ludwigshafen am Rhein - Mitte, Pestalozzistraße 2',
		latitude: 49.474336, longitude: 8.441779,
	}

	const res = await client.journeys(ludwigshafen, pestalozzistr2, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: ludwigshafen,
		to: pestalozzistr2
	})
	t.end()
})

tap.test('Ludwigshafen to Südwest-Stadion', async (t) => {
	const südweststadion = {
		type: 'location',
		id: '991664983',
		poi: true,
		name: 'Ludwigshafen am Rhein, Südwest-Stadion (Sport)',
		latitude: 49.469248, longitude: 8.440691,
	}
	const res = await client.journeys(ludwigshafen, südweststadion, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: ludwigshafen,
		to: südweststadion
	})
	t.end()
})

// todo: via works – with detour
// todo: via works – without detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: ludwigshafen,
		toId: meckesheim,
		when
	})

	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(ludwigshafen, meckesheim, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, p.line.name, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Meckesheim', async (t) => {
	const res = await client.departures(meckesheim, {
		duration: 3 * 60, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: meckesheim
	})
	t.end()
})

tap.test('departures at Meckesheim in direction of Reilsheim', async (t) => {
	const reilsheim = '8005015'
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: meckesheim,
		directionIds: [reilsheim],
		when, duration: 30 * 60,
		validate,
	})
	t.end()
})

tap.test('arrivals at Meckesheim', async (t) => {
	const res = await client.arrivals(meckesheim, {
		duration: 3 * 60, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: meckesheim
	})
	t.end()
})

// todo: nearby

tap.test('locations named Ebertpark', async (t) => {
	const ebertpark = '506453'
	const locations = await client.locations('Ebertpark', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === ebertpark || l.id === ebertpark
	}))

	t.end()
})

tap.test('station Meckesheim', async (t) => {
	const s = await client.stop(meckesheim)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, meckesheim)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 49.4940,
		west: 8.4560,
		south: 49.4774,
		east: 8.4834,
	}, {
		duration: 5 * 60, when, results: 10,
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})
