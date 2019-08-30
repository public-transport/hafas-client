'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const insaProfile = require('../../p/insa')
const products = require('../../p/insa/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 50.7,
	maxLatitude: 53.2,
	minLongitude: 10.25,
	maxLongitude: 13.4
}

const validate = createValidate(cfg, {})

const test = tapePromise(tape)
const client = createClient(insaProfile, 'public-transport/hafas-client:test')

const magdeburgHbf = '8010224'
const magdeburgBuckau = '8013456'
const leiterstr = '7464'
const hasselbachplatzSternstrasse = '6545'
const stendal = '8010334'
const dessau = '8010077'
const universitaet = '19686'

test('journeys – Magdeburg Hbf to Magdeburg-Buckau', async (t) => {
	const res = await client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau
	})
	t.end()
})

// todo: journeys, only one product

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau,
		when,
		products
	})
	t.end()
})

test('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', async (t) => {
	const sternStr = {
		type: 'location',
		address: 'Magdeburg - Altenstadt, Sternstraße 10',
		latitude: 52.118414,
		longitude: 11.422332
	}

	const res = await client.journeys(magdeburgHbf, sternStr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: magdeburgHbf,
		to: sternStr
	})
	t.end()
})

test('Magdeburg Hbf to Kloster Unser Lieben Frauen', async (t) => {
	const kloster = {
		type: 'location',
		id: '970012223',
		poi: true,
		name: 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)',
		latitude: 52.127601,
		longitude: 11.636437
	}
	const res = await client.journeys(magdeburgHbf, kloster, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: magdeburgHbf,
		to: kloster
	})
	t.end()
})

test('journeys: via works – with detour', async (t) => {
	// Going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Stendal
	// via Dessau without detour is currently impossible. We check if the routing
	// engine computes a detour.
	const res = await client.journeys(hasselbachplatzSternstrasse, stendal, {
		via: dessau,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [dessau]
	})
	t.end()
})

// todo: without detour

test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau,
		when
	})

	t.end()
})

test('trip details', async (t) => {
	const res = await client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs[0]
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('departures at Magdeburg Leiterstr.', async (t) => {
	const departures = await client.departures(leiterstr, {
		duration: 5, when,
		stopovers: true
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: leiterstr
	})
	t.end()
})

test('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: magdeburgHbf,
		name: 'Magdeburg Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

test('departures at Leiterstr in direction of Universität', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: leiterstr,
		directionIds: [universitaet],
		when,
		validate
	})
	t.end()
})

test('arrivals at Magdeburg Leiterstr.', async (t) => {
	const arrivals = await client.arrivals(leiterstr, {
		duration: 5, when
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: leiterstr
	})
	t.end()
})

// todo: nearby

test('locations named Magdeburg', async (t) => {
	const nordpark = '7480'
	const locations = await client.locations('nordpark', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === nordpark || l.id === nordpark
	}))

	t.end()
})

test('station Magdeburg-Buckau', async (t) => {
	const s = await client.stop(magdeburgBuckau)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, magdeburgBuckau)

	t.end()
})

test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 52.148364,
		west: 11.600826,
		south: 52.108486,
		east: 11.651451
	}, {
		duration: 5 * 60, when, results: 10
	})

	const customCfg = Object.assign({}, cfg, {
		stationCoordsOptional: true, // see #28
	})
	const validate = createValidate(customCfg, {})
	validate(t, vehicles, 'movements', 'vehicles')

	t.end()
})
