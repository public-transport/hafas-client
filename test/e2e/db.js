'use strict'

const {full: readStations} = require('db-stations')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const dbProfile = require('../../p/db')
const products = require('../../p/db/products')
const {
	station: createValidateStation,
	trip: createValidateTrip
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testLegCycleAlternatives = require('./lib/leg-cycle-alternatives')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testDeparturesWithoutRelatedStations = require('./lib/departures-without-related-stations')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')
const testReachableFrom = require('./lib/reachable-from')
const testServerInfo = require('./lib/server-info')

const stations = []
const pStations = new Promise((resolve, reject) => {
	readStations()
	.once('error', reject)
	.once('end', () => resolve())
	.on('data', station => stations.push(station))
})

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 46.673100,
	maxLatitude: 55.030671,
	minLongitude: 6.896517,
	maxLongitude: 16.180237
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

const client = createClient(dbProfile, 'public-transport/hafas-client:test')

const berlinHbf = '8011160'
const münchenHbf = '8000261'
const jungfernheide = '8011167'
const blnSchwedterStr = '732652'
const westhafen = '8089116'
const wedding = '8089131'
const württembergallee = '731084'
const regensburgHbf = '8000309'
const blnOstbahnhof = '8010255'
const blnTiergarten = '8089091'
const blnJannowitzbrücke = '8089019'
const potsdamHbf = '8012666'

test('journeys – Berlin Schwedter Str. to München Hbf', async (t) => {
	await pStations

	const res = await client.journeys(blnSchwedterStr, münchenHbf, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: blnSchwedterStr,
		toId: münchenHbf
	})
	// todo: find a journey where there pricing info is always available
	for (let journey of res.journeys) {
		if (journey.price) assertValidPrice(t, journey.price)
	}

	t.end()
})

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

test('Berlin Schwedter Str. to Torfstraße 17', async (t) => {
	await pStations

	const torfstr = {
		type: 'location',
		address: 'Torfstraße 17',
		latitude: 52.5416823,
		longitude: 13.3491223
	}
	const res = await client.journeys(blnSchwedterStr, torfstr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: blnSchwedterStr,
		to: torfstr
	})
	t.end()
})

test('Berlin Schwedter Str. to ATZE Musiktheater', async (t) => {
	await pStations

	const atze = {
		type: 'location',
		id: '991598902',
		poi: true,
		name: 'ATZE Musiktheater',
		latitude: 52.542417,
		longitude: 13.350437
	}
	const res = await client.journeys(blnSchwedterStr, atze, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: blnSchwedterStr,
		to: atze
	})
	t.end()
})

test('journeys: via works – with detour', async (t) => {
	await pStations

	// Going from Westhafen to Wedding via Württembergalle without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const res = await client.journeys(westhafen, wedding, {
		via: württembergallee,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [württembergallee]
	})
	t.end()
})

// todo: walkingSpeed "Berlin - Charlottenburg, Hallerstraße" -> jungfernheide
// todo: without detour

test('earlier/later journeys, Jungfernheide -> München Hbf', async (t) => {
	await pStations

	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: jungfernheide,
		toId: münchenHbf,
		when
	})

	t.end()
})

test.skip('journeys – leg cycle & alternatives', async (t) => {
	await pStations

	await testLegCycleAlternatives({
		test: t,
		fetchJourneys: client.journeys,
		fromId: blnTiergarten,
		toId: blnJannowitzbrücke
	})
	t.end()
})

test('refreshJourney', async (t) => {
	await pStations

	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: jungfernheide,
		toId: münchenHbf,
		when
	})
	t.end()
})

test('trip details', async (t) => {
	await pStations

	const res = await client.journeys(berlinHbf, münchenHbf, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	const validateTrip = createValidateTrip(cfg)
	const validate = createValidate(cfg, {
		trip: (validate, trip, name) => {
			trip = Object.assign({}, trip)
			if (!trip.direction) trip.direction = 'foo' // todo, see #49
			validateTrip(validate, trip, name)
		}
	})
	validate(t, trip, 'trip', 'trip')

	t.end()
})

test('departures at Berlin Schwedter Str.', async (t) => {
	await pStations

	const departures = await client.departures(blnSchwedterStr, {
		duration: 5, when,
		stopovers: true
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: blnSchwedterStr
	})
	t.end()
})

test('departures with station object', async (t) => {
	await pStations

	const deps = await client.departures({
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
})

test('departures at Berlin Hbf in direction of Berlin Ostbahnhof', async (t) => {
	await pStations

	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: berlinHbf,
		directionIds: [blnOstbahnhof, '8089185', '732676'],
		when,
		validate
	})
	t.end()
})

test('departures without related stations', async (t) => {
	await pStations

	await testDeparturesWithoutRelatedStations({
		test: t,
		fetchDepartures: client.departures,
		id: '8089051', // Berlin Yorckstr. (S1)
		when,
		products: {bus: false},
		linesOfRelatedStations: ['S 2', 'S 25', 'S 26', 'U 7']
	})
	t.end()
})

test('arrivals at Berlin Schwedter Str.', async (t) => {
	await pStations

	const arrivals = await client.arrivals(blnSchwedterStr, {
		duration: 5, when,
		stopovers: true
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: blnSchwedterStr
	})
	t.end()
})

test('nearby Berlin Jungfernheide', async (t) => {
	await pStations

	const nearby = await client.nearby({
		type: 'location',
		latitude: 52.530273,
		longitude: 13.299433
	}, {
		results: 2, distance: 400
	})

	validate(t, nearby, 'locations', 'nearby')

	t.equal(nearby.length, 2)

	const s0 = nearby[0]
	t.equal(s0.id, jungfernheide)
	t.equal(s0.name, 'Berlin Jungfernheide')
	t.ok(isRoughlyEqual(.0005, s0.location.latitude, 52.530408))
	t.ok(isRoughlyEqual(.0005, s0.location.longitude, 13.299424))
	t.ok(s0.distance >= 0)
	t.ok(s0.distance <= 100)

	t.end()
})

test('locations named Jungfernheide', async (t) => {
	await pStations

	const locations = await client.locations('Jungfernheide', {
		results: 10
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)
	t.ok(locations.some((l) => {
		return l.station && l.station.id === jungfernheide || l.id === jungfernheide
	}), 'Jungfernheide not found')

	t.end()
})

test('stop', async (t) => {
	await pStations

	const s = await client.stop(regensburgHbf)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, regensburgHbf)

	t.end()
})

test('line with additionalName', async (t) => {
	const departures = await client.departures(potsdamHbf, {
		when,
		duration: 12 * 60, // 12 minutes
		products: {bus: false, suburban: false, tram: false}
	})
	t.ok(departures.some(d => d.line && d.line.additionalName))
	t.end()
})

test.skip('radar', async (t) => {
	await pStations

	const vehicles = await client.radar({
		north: 52.52411,
		west: 13.41002,
		south: 52.51942,
		east: 13.41709
	}, {
		duration: 5 * 60, when
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})

test('reachableFrom', async (t) => {
	await pStations

	const torfstr17 = {
		type: 'location',
		address: 'Torfstraße 17',
		latitude: 52.5416823,
		longitude: 13.3491223
	}

	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: torfstr17,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})

test('serverInfo works', async (t) => {
	await testServerInfo({
		test: t,
		fetchServerInfo: client.serverInfo,
	})
})
