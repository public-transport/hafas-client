'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const hvvProfile = require('../../p/hvv')
const products = require('../../p/hvv/products')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testArrivals = require('./lib/arrivals')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	// stationCoordsOptional: false,
	products,
	// minLatitude: 50.7,
	// maxLatitude: 53.2,
	// minLongitude: 10.25,
	// maxLongitude: 13.4
}

const validate = createValidate(cfg, {})

const client = createClient(hvvProfile, 'public-transport/hafas-client:test')

const tiefstack = '4117'
const barmbek = '4933'
const altona = '20626'
// const hasselbachplatzSternstrasse = '6545'
// const stendal = '8010334'
// const dessau = '8010077'

test('journeys – Hamburg Tiefstack to Hamburg Barmbek', async (t) => {
	const res = await client.journeys(tiefstack, barmbek, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: tiefstack,
		toId: barmbek
	})
	t.end()
})

// todo: journeys, only one product

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: tiefstack,
		toId: barmbek,
		when,
		products
	})
	t.end()
})

test('Hamburg Tiefstack to Gilbertstr. 30, Hamburg', async (t) => {
	const gilbertstr30 = {
		type: 'location',
		id: '970026640',
		address: 'Hamburg, Gilbertstraße 30',
		latitude: 53.554791,
		longitude: 9.95781
	}

	const res = await client.journeys(tiefstack, gilbertstr30, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: tiefstack,
		to: gilbertstr30
	})
	t.end()
})

test('Hamburg Tiefstack to Hamburger Meile', async (t) => {
	const meile = {
		type: 'location',
		id: '980001829',
		poi: true,
		name: 'Hamburger Meile',
		latitude: 53.572455,
		longitude: 10.030541
	}
	const res = await client.journeys(tiefstack, meile, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: tiefstack,
		to: meile
	})
	t.end()
})

// todo: via works – with detour
// todo: via works – without detour

test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: tiefstack,
		toId: barmbek,
		when
	})

	t.end()
})

test('trip details', async (t) => {
	const res = await client.journeys(tiefstack, barmbek, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('departures at Hamburg Barmbek', async (t) => {
	const departures = await client.departures(barmbek, {
		duration: 5, when,
		stopovers: true
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: barmbek
	})
	t.end()
})

test('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: tiefstack,
		name: 'Hamburg Tiefstack',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

test('departures at Barmbek in direction of Altona', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: barmbek,
		directionIds: [altona],
		when,
		validate
	})
	t.end()
})

test('arrivals at Hamburg Barmbek', async (t) => {
	const arrivals = await client.arrivals(barmbek, {
		duration: 5, when
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: barmbek
	})
	t.end()
})

// todo: nearby

test('locations named Elbphilharmonie', async (t) => {
	const elbphilharmonie = '6242'
	const locations = await client.locations('Elbphilharmonie', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === elbphilharmonie || l.id === elbphilharmonie
	}))

	t.end()
})

test('station Hamburg Barmbek', async (t) => {
	const s = await client.stop(barmbek)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, barmbek)

	t.end()
})

test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 53.569,
		west: 10.022,
		south: 53.55,
		east: 10.0436
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})
