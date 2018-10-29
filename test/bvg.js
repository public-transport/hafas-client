'use strict'

// todo: DRY with vbb tests

const stations = require('vbb-stations-autocomplete')
const a = require('assert')
const shorten = require('vbb-short-station-name')
const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const co = require('./lib/co')
const createClient = require('..')
const bvgProfile = require('../p/bvg')
const products = require('../p/bvg/products')
const createValidate = require('./lib/validate-fptf-with')
const {
	cfg,
	validateStation,
	validateLine,
	validateJourneyLeg,
	validateDeparture,
	validateMovement
} = require('./lib/vbb-bvg-validators')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testJourneysWalkingSpeed = require('./lib/journeys-walking-speed')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testDeparturesWithoutRelatedStations = require('./lib/departures-without-related-stations')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')
const testReachableFrom = require('./lib/reachable-from')

const when = cfg.when

const validateDirection = (dir, name) => {
	if (!stations(dir, true, false)[0]) {
		console.error(name + `: station "${dir}" is unknown`)
	}
}

const validate = createValidate(cfg, {
	station: validateStation,
	line: validateLine,
	journeyLeg: validateJourneyLeg,
	departure: validateDeparture,
	movement: validateMovement
})

const test = tapePromise(tape)
const client = createClient(bvgProfile, 'public-transport/hafas-client:test')

const amrumerStr = '900000009101'
const spichernstr = '900000042101'
const bismarckstr = '900000024201'
const westhafen = '900000001201'
const wedding = '900000009104'
const württembergallee = '900000026153'

test('journeys – Spichernstr. to Bismarckstr.', co(function* (t) {
	const journeys = yield client.journeys(spichernstr, bismarckstr, {
		results: 3,
		departure: when,
		stopovers: true
	})

	yield testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: spichernstr,
		toId: bismarckstr
	})
	// todo: find a journey where there ticket info is always available

	t.end()
}))

test('journeys – only subway', co(function* (t) {
	const journeys = yield client.journeys(spichernstr, bismarckstr, {
		results: 20,
		departure: when,
		products: {
			suburban: false,
			subway:   true,
			tram:     false,
			bus:      false,
			ferry:    false,
			express:  false,
			regional: false
		}
	})

	validate(t, journeys, 'journeys', 'journeys')
	t.ok(journeys.length > 1)
	for (let i = 0; i < journeys.length; i++) {
		const journey = journeys[i]
		for (let j = 0; j < journey.legs.length; j++) {
			const leg = journey.legs[j]

			const name = `journeys[${i}].legs[${i}].line`
			if (leg.line) {
				t.equal(leg.line.mode, 'train', name + '.mode is invalid')
				t.equal(leg.line.product, 'subway', name + '.product is invalid')
			}
			t.ok(journey.legs.some(l => l.line), name + '.legs has no subway leg')
		}
	}

	t.end()
}))

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: spichernstr,
		toId: bismarckstr,
		when,
		products
	})
	t.end()
})

test('journeys: walkingSpeed', co(function* (t) {
	const hallerstr = {
		type: 'location',
		address: '10587 Berlin-Charlottenburg, Hallerstr.',
		latitude: 52.522326,
		longitude: 13.32356
	}

	yield testJourneysWalkingSpeed({
		test: t,
		journeys: client.journeys,
		validate,
		from: hallerstr,
		to: bismarckstr,
		products: {bus: false},
		difference: 5 * 60 * 1000
	})
	t.end()
}))

test('earlier/later journeys', co(function* (t) {
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: spichernstr,
		toId: bismarckstr
	})

	t.end()
}))

test('refreshJourney', co(function* (t) {
	yield testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: spichernstr,
		toId: bismarckstr,
		when
	})
	t.end()
}))

test('trip details', co(function* (t) {
	const journeys = yield client.journeys(spichernstr, amrumerStr, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = yield client.trip(p.id, p.line.name, {when})

	validate(t, trip, 'journeyLeg', 'trip')
	t.end()
}))

test('journeys – station to address', co(function* (t) {
	const torfstr = {
		type: 'location',
		address: '13353 Berlin-Wedding, Torfstr. 17',
		latitude: 52.541797,
		longitude: 13.350042
	}
	const journeys = yield client.journeys(spichernstr, torfstr, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: spichernstr,
		to: torfstr
	})
	t.end()
}))

test('journeys – station to POI', co(function* (t) {
	const atze = {
		type: 'location',
		id: '900980720',
		name: 'Berlin, Atze Musiktheater für Kinder',
		latitude: 52.543333,
		longitude: 13.351686
	}
	const journeys = yield client.journeys(spichernstr, atze, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: spichernstr,
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

// todo: without detour test

test('departures', co(function* (t) {
	const departures = yield client.departures(spichernstr, {
		duration: 5, when
	})

	yield testDepartures({
		test: t,
		departures,
		validate,
		id: spichernstr
	})
	t.end()
}))

test('departures with station object', co(function* (t) {
	const deps = yield client.departures({
		type: 'station',
		id: spichernstr,
		name: 'U Spichernstr',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
}))

test('departures at Spichernstr. in direction of Westhafen', co(function* (t) {
	yield testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: spichernstr,
		directionIds: [westhafen],
		when,
		validate
	})
	t.end()
}))

test('departures at 7-digit station', co(function* (t) {
	const eisenach = '8010097' // see derhuerst/vbb-hafas#22
	yield client.departures(eisenach, {when})
	t.pass('did not fail')
	t.end()
}))

test('departures without related stations', co(function* (t) {
	yield testDeparturesWithoutRelatedStations({
		test: t,
		fetchDepartures: client.departures,
		id: '900000024101', // Charlottenburg
		when,
		products: {bus: false, suburban: false, regional: false},
		linesOfRelatedStations: ['U7']
	})
	t.end()
}))

test('arrivals', co(function* (t) {
	const arrivals = yield client.arrivals(spichernstr, {
		duration: 5, when
	})

	yield testArrivals({
		test: t,
		arrivals,
		validate,
		id: spichernstr
	})
	t.end()
}))

test('nearby', co(function* (t) {
	const berlinerStr = '900000044201'
	const landhausstr = '900000043252'

	// Berliner Str./Bundesallee
	const nearby = yield client.nearby({
		type: 'location',
		latitude: 52.4873452,
		longitude: 13.3310411
	}, {distance: 200})

	validate(t, nearby, 'locations', 'nearby')

	t.equal(nearby[0].id, berlinerStr)
	t.equal(nearby[0].name, 'U Berliner Str.')
	t.ok(nearby[0].distance > 0)
	t.ok(nearby[0].distance < 100)

	t.equal(nearby[1].id, landhausstr)
	t.equal(nearby[1].name, 'Landhausstr.')
	t.ok(nearby[1].distance > 100)
	t.ok(nearby[1].distance < 200)

	t.end()
}))

test('locations', co(function* (t) {
	const locations = yield client.locations('Alexanderplatz', {results: 20})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.find(s => !s.name && s.address)) // addresses

	t.end()
}))

test('station', co(function* (t) {
	const s = yield client.station(spichernstr)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, spichernstr)

	t.end()
}))

test('radar', co(function* (t) {
	const vehicles = yield client.radar({
		north: 52.52411,
		west: 13.41002,
		south: 52.51942,
		east: 13.41709
	}, {
		duration: 5 * 60, when
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
}))

test('reachableFrom', co(function* (t) {
	const torfstr17 = {
		type: 'location',
		address: '13353 Berlin-Wedding, Torfstr. 17',
		latitude: 52.541797,
		longitude: 13.350042
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
