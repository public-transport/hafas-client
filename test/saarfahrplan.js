'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const { createWhen } = require('./lib/util')
const co = require('./lib/co')
const createClient = require('..')
const saarfahrplanProfile = require('../p/saarfahrplan')
const products = require('../p/saarfahrplan/products')
const {
	station: createValidateStation,
	stop: validateStop
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testJourneysWithDetour = require('./lib/journeys-with-detour')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	// stationCoordsOptional: false, @todo
	products,
	minLatitude: 49,
	maxLatitude: 49.6,
	minLongitude: 6.1,
	maxLongitude: 7.5
}

// @todo validateDirection: search list of stations for direction

const validate = createValidate(cfg)

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
const client = createClient(saarfahrplanProfile, 'public-transport/hafas-client:test')

const saarbrueckenHbf = '8000323'
// This seems to be the bus/tram stop. 🙄
const hauptbahnhofSaarbruecken = '10600'
const saarlouisHbf = '8005247'
const metzVille = '8700019'
const saarbrueckenUhlandstr = '10609'

const thomasMannStr = {
	type: 'location',
	address: 'Neunkirchen, Thomas-Mann-Straße 1',
	latitude: 49.348307,
	longitude: 7.183613
}

// @todo prices/tickets
// @todo journeys, only one product

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: saarbrueckenHbf,
		toId: saarlouisHbf,
		when,
		products
	})
	t.end()
})

test('Saarbrücken Hbf to Neunkirchen, Thomas-Mann-Straße 1', co(function * (t) {
	const journeys = yield client.journeys(saarbrueckenHbf, thomasMannStr, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: saarbrueckenHbf,
		to: thomasMannStr
	})
	t.end()
}))

test('Saarbrücken Hbf to Schlossberghöhlen', co(function * (t) {
	const schlossberghoehlen = {
		type: 'location',
		latitude: 49.32071,
		longitude: 7.343764,
		name: 'Homburg, Schlossberghöhlen',
		id: '9000185'
	}
	const journeys = yield client.journeys(saarbrueckenHbf, schlossberghoehlen, {
		results: 3, departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: saarbrueckenHbf,
		to: schlossberghoehlen
	})
	t.end()
}))

test.skip('journeys: via works – with detour', co(function* (t) {
	// Going from Stephansplatz to Schottenring via Donauinsel without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const stephansplatz = '1390167'
	const schottenring = '1390163'
	const donauinsel = '1392277'
	const donauinselPassed = '922001'
	const journeys = yield client.journeys(stephansplatz, schottenring, {
		via: donauinsel,
		results: 1,
		departure: when,
		stopovers: true
	})

	yield testJourneysWithDetour({
		test: t,
		journeys,
		validate,
		detourIds: [donauinsel, donauinselPassed]
	})
	t.end()
}))

test.skip('journeys: via works – without detour', co(function* (t) {
	// When going from Karlsplatz to Praterstern via Museumsquartier, there is
	// *no need* to change trains / no need for a "detour".
	const karlsplatz = '1390461'
	const praterstern = '1290201'
	const museumsquartier = '1390171'
	const museumsquartierPassed = '901014'

	const journeys = yield client.journeys(karlsplatz, praterstern, {
		via: museumsquartier,
		results: 1,
		departure: when,
		stopovers: true
	})

	validate(t, journeys, 'journeys', 'journeys')

	const l1 = journeys[0].legs.some((leg) => {
		return (
			leg.destination.id === museumsquartier ||
			leg.destination.id === museumsquartierPassed
		)
	})
	t.notOk(l1, 'transfer at Museumsquartier')

	const l2 = journeys[0].legs.some((leg) => {
		return leg.stopovers && leg.stopovers.some((stopover) => {
			return stopover.stop.id === museumsquartierPassed
		})
	})
	t.ok(l2, 'Museumsquartier is not being passed')

	t.end()
}))

test('earlier/later journeys, Saarbrücken Hbf -> Saarlouis Hbf', co(function * (t) {
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: saarbrueckenHbf,
		toId: saarlouisHbf,
		when
	})

	t.end()
}))

test('trip details', co(function * (t) {
	const journeys = yield client.journeys(saarlouisHbf, metzVille, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = yield client.trip(p.id, p.line.name, { when })

	validate(t, trip, 'journeyLeg', 'trip')
	t.end()
}))

test('departures', co(function* (t) {
	const departures = yield client.departures(saarbrueckenUhlandstr, {
		duration: 5, when
	})

	validate(t, departures, 'departures', 'departures')
	t.ok(departures.length > 0, 'must be >0 departures')
	for (let i = 0; i < departures.length; i++) {
		let stop = departures[i].stop
		let name = `departures[${i}].stop`
		if (stop.station) {
			stop = stop.station
			name += '.station'
		}

		t.equal(stop.id, saarbrueckenUhlandstr, name + '.id is invalid')
	}

	// todo: move into deps validator
	t.deepEqual(departures, departures.sort((a, b) => t.when > b.when))
	t.end()
}))

test('departures with stop object', co(function* (t) {
	const deps = yield client.departures({
		type: 'stop',
		id: '8000323',
		name: 'Saarbrücken Hbf',
		location: {
			type: 'location',
			latitude: 49.241066,
			longitude: 6.991019
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
}))

test('departures at Karlsplatz in direction of Pilgramgasse', co(function* (t) {
	const saarbrueckenLandwehrplatz = '10606'
	yield testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: saarbrueckenUhlandstr,
		directionIds: [saarbrueckenLandwehrplatz],
		when,
		validate
	})
	t.end()
}))

// todo: arrivals

test('nearby Saarbrücken Hbf', co(function * (t) {
	const nearby = yield client.nearby({
		type: 'location',
		latitude: 49.241066,
		longitude: 6.991019
	}, {
		results: 5, distance: 400
	})

	validate(t, nearby, 'locations', 'nearby')
	t.equal(nearby.length, 5)

	const s = nearby[0]
	t.equal(s.id, saarbrueckenHbf, 'id should be ' + saarbrueckenHbf)
	t.equal(s.name, 'Saarbrücken Hbf')
	t.ok(isRoughlyEqual(0.0005, s.location.latitude, 49.241066))
	t.ok(isRoughlyEqual(0.0005, s.location.longitude, 6.991019))
	t.ok(s.distance >= 0)
	t.ok(s.distance <= 100)

	t.end()
}))

test('locations named Saarbrücken', co(function * (t) {
	const locations = yield client.locations('Saarbrücken', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.some((s) => {
		return s.station && s.station.id === saarbrueckenHbf || s.id === saarbrueckenHbf
	}))

	t.end()
}))

test('station', co(function* (t) {
	const s = yield client.station(saarbrueckenUhlandstr)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, saarbrueckenUhlandstr)

	t.end()
}))

test('radar', co(function* (t) {
	const vehicles = yield client.radar({
		north: 49.27,
		west: 6.97,
		south: 49.22,
		east: 7.02
	}, {
		duration: 5 * 60, when
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
}))
