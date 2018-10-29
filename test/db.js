'use strict'

const stations = require('db-stations/full.json')
const a = require('assert')
const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const co = require('./lib/co')
const createClient = require('..')
const dbProfile = require('../p/db')
const products = require('../p/db/products')
const {
	station: createValidateStation,
	journeyLeg: createValidateJourneyLeg
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testDeparturesWithoutRelatedStations = require('./lib/departures-without-related-stations')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')
const testReachableFrom = require('./lib/reachable-from')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const _validateStation = createValidateStation(cfg)
const validateStation = (validate, s, name) => {
	_validateStation(validate, s, name)
	const match = stations.some(station => (
		station.id === s.id ||
		(station.additionalIds && station.additionalIds.includes(s.id))
	))
	if (!match) {
		console.error(name + `.id: unknown ID "${s.id}"`)
	}
}

const validate = createValidate(cfg, {
	station: validateStation
})

const assertValidPrice = (t, p) => {
	t.ok(p)
	if (p.amount !== null) {
		t.equal(typeof p.amount, 'number')
		t.ok(p.amount > 0)
	}
	if (p.hint !== null) {
		t.equal(typeof p.hint, 'string')
		t.ok(p.hint)
	}
}

const test = tapePromise(tape)
const client = createClient(dbProfile, 'public-transport/hafas-client:test')

const berlinHbf = '8011160'
const münchenHbf = '8000261'
const jungfernheide = '8011167'
const blnSchwedterStr = '732652'
const westhafen = '008089116'
const wedding = '008089131'
const württembergallee = '731084'
const regensburgHbf = '8000309'
const blnOstbahnhof = '8010255'

test('journeys – Berlin Schwedter Str. to München Hbf', co(function* (t) {
	const journeys = yield client.journeys(blnSchwedterStr, münchenHbf, {
		results: 3,
		departure: when,
		stopovers: true
	})

	yield testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: blnSchwedterStr,
		toId: münchenHbf
	})
	// todo: find a journey where there pricing info is always available
	for (let journey of journeys) {
		if (journey.price) assertValidPrice(t, journey.price)
	}

	t.end()
}))

// todo: journeys, only one product

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: blnSchwedterStr,
		toId: münchenHbf,
		when,
		products
	})
	t.end()
})

test('Berlin Schwedter Str. to Torfstraße 17', co(function* (t) {
	const torfstr = {
		type: 'location',
		address: 'Torfstraße 17',
		latitude: 52.5416823,
		longitude: 13.3491223
	}
	const journeys = yield client.journeys(blnSchwedterStr, torfstr, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: blnSchwedterStr,
		to: torfstr
	})
	t.end()
}))

test('Berlin Schwedter Str. to ATZE Musiktheater', co(function* (t) {
	const atze = {
		type: 'location',
		id: '991598902',
		name: 'ATZE Musiktheater',
		latitude: 52.542417,
		longitude: 13.350437
	}
	const journeys = yield client.journeys(blnSchwedterStr, atze, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: blnSchwedterStr,
		to: atze
	})
	t.end()
}))

test('journeys: via works – with detour', co(function* (t) {
	// Going from Westhafen to Wedding via Württembergalle without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const journeys = yield client.journeys(westhafen, wedding, {
		via: württembergallee,
		results: 1,
		departure: when,
		stopovers: true
	})

	yield testJourneysWithDetour({
		test: t,
		journeys,
		validate,
		detourIds: [württembergallee]
	})
	t.end()
}))

// todo: walkingSpeed "Berlin - Charlottenburg, Hallerstraße" -> jungfernheide
// todo: without detour

test('earlier/later journeys, Jungfernheide -> München Hbf', co(function* (t) {
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: jungfernheide,
		toId: münchenHbf
	})

	t.end()
}))

test('refreshJourney', co(function* (t) {
	yield testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: jungfernheide,
		toId: münchenHbf,
		when
	})
	t.end()
}))

test('trip details', co(function* (t) {
	const journeys = yield client.journeys(berlinHbf, münchenHbf, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = yield client.trip(p.id, p.line.name, {when})

	const validateJourneyLeg = createValidateJourneyLeg(cfg)
	const validate = createValidate(cfg, {
		journeyLeg: (validate, leg, name) => {
			if (!leg.direction) leg.direction = 'foo' // todo, see #49
			validateJourneyLeg(validate, leg, name)
		}
	})
	validate(t, trip, 'journeyLeg', 'trip')

	t.end()
}))

test('departures at Berlin Schwedter Str.', co(function* (t) {
	const departures = yield client.departures(blnSchwedterStr, {
		duration: 5, when
	})

	yield testDepartures({
		test: t,
		departures,
		validate,
		id: blnSchwedterStr
	})
	t.end()
}))

test('departures with station object', co(function* (t) {
	const deps = yield client.departures({
		type: 'station',
		id: jungfernheide,
		name: 'Berlin Jungfernheide',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
}))

test('departures at Berlin Hbf in direction of Berlin Ostbahnhof', co(function* (t) {
	yield testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: berlinHbf,
		directionIds: [blnOstbahnhof, '8089185', '732676'],
		when,
		validate
	})
	t.end()
}))

test('departures without related stations', co(function* (t) {
	yield testDeparturesWithoutRelatedStations({
		test: t,
		fetchDepartures: client.departures,
		id: '8089051', // Berlin Yorckstr. (S1)
		when,
		products: {bus: false},
		linesOfRelatedStations: ['S 2', 'S 25', 'S 26', 'U 7']
	})
	t.end()
}))

test('arrivals at Berlin Schwedter Str.', co(function* (t) {
	const arrivals = yield client.arrivals(blnSchwedterStr, {
		duration: 5, when
	})

	yield testArrivals({
		test: t,
		arrivals,
		validate,
		id: blnSchwedterStr
	})
	t.end()
}))

test('nearby Berlin Jungfernheide', co(function* (t) {
	const nearby = yield client.nearby({
		type: 'location',
		latitude: 52.530273,
		longitude: 13.299433
	}, {
		results: 2, distance: 400
	})

	validate(t, nearby, 'locations', 'nearby')

	t.equal(nearby.length, 2)

	const s0 = nearby[0]
	// todo: trim IDs
	t.ok(s0.id === '008011167' || s0.id === jungfernheide)
	t.equal(s0.name, 'Berlin Jungfernheide')
	t.ok(isRoughlyEqual(.0005, s0.location.latitude, 52.530408))
	t.ok(isRoughlyEqual(.0005, s0.location.longitude, 13.299424))
	t.ok(s0.distance >= 0)
	t.ok(s0.distance <= 100)

	t.end()
}))

test('locations named Jungfernheide', co(function* (t) {
	const locations = yield client.locations('Jungfernheide', {
		results: 10
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)
	t.ok(locations.some((l) => {
		// todo: trim IDs
		if (l.station) {
			if (l.station.id === '008011167' || l.station.id === jungfernheide) return true
		}
		return l.id === '008011167' || l.id === jungfernheide
	}), 'Jungfernheide not found')

	t.end()
}))

test('station', co(function* (t) {
	const s = yield client.station(regensburgHbf)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, regensburgHbf)

	t.end()
}))

test('reachableFrom', co(function* (t) {
	const torfstr17 = {
		type: 'location',
		address: 'Torfstraße 17',
		latitude: 52.5416823,
		longitude: 13.3491223
	}

	yield testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: torfstr17,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
}))
