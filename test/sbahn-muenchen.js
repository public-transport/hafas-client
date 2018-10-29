'use strict'

const assert = require('assert')
const tapePromise = require('tape-promise').default
const tape = require('tape')

const {createWhen} = require('./lib/util')
const co = require('./lib/co')
const createClient = require('..')
const sMunichProfile = require('../p/sbahn-muenchen')
const products = require('../p/sbahn-muenchen/products')
const {movement: _validateMovement} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')
const testReachableFrom = require('./lib/reachable-from')

const when = createWhen(sMunichProfile.timezone, sMunichProfile.locale)

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const validateMovement = (val, m, name = 'movement') => {
	const dummyStopA = {type: 'stop', id: '123'}
	const dummyStopB = {type: 'stop', id: '321'}

	const withFakeFrame = Object.assign({}, m)
	if (!m.frames.length) {
		withFakeFrame.frames = [
			{t: 5, origin: dummyStopA, destination: dummyStopB}
		]
	}
	_validateMovement(val, withFakeFrame, name)
}

const validate = createValidate(cfg, {
	movement: validateMovement
})

const test = tapePromise(tape)
const client = createClient(sMunichProfile, 'public-transport/hafas-client:test')

const mittersendling = '8004154'
const karlTheodorStr = '621790' // Karl-Theodor-Straße
const lehel = '000624826'
const poetschnerstr = {
	type: 'location',
	address: 'Pötschnerstraße 3, Neuhausen',
	latitude: 48.152499,
	longitude: 11.531695
}

test('journeys – Mittersendling to Karl-Theodor-Straße', co(function* (t) {
	const journeys = yield client.journeys(mittersendling, karlTheodorStr, {
		results: 3,
		departure: when,
		stopovers: true
	})

	yield testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: mittersendling,
		toId: karlTheodorStr
	})
	t.end()
}))

// todo: journeys, only one product

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: mittersendling,
		toId: karlTheodorStr,
		when,
		products
	})
	t.end()
})

test('Karl-Theodor-Straße to Pötschnerstraße 3, Neuhausen', co(function*(t) {
	const journeys = yield client.journeys(karlTheodorStr, poetschnerstr, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: karlTheodorStr,
		to: poetschnerstr
	})
	t.end()
}))

test('Karl-Theodor-Straße to Hofbräuhaus', co(function*(t) {
	const hofbraeuhaus = {
		type: 'location',
		id: '970006201',
		name: 'München, Hofbräuhaus',
		latitude: 48.137739,
		longitude: 11.579823
	}
	const journeys = yield client.journeys(karlTheodorStr, hofbraeuhaus, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: karlTheodorStr,
		to: hofbraeuhaus
	})
	t.end()
}))

// todo: walkingSpeed "München - Freimann, Gyßlingstraße 78" -> lehel
// todo: via works – with detour
// todo: without detour

test('earlier/later journeys', co(function* (t) {
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: mittersendling,
		toId: karlTheodorStr
	})

	t.end()
}))

test('refreshJourney', co(function* (t) {
	yield testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: mittersendling,
		toId: karlTheodorStr,
		when
	})
	t.end()
}))

test('trip details', co(function* (t) {
	const journeys = yield client.journeys(mittersendling, karlTheodorStr, {
		results: 1, departure: when
	})

	const p = journeys[0].legs.find(leg => leg.line)
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = yield client.trip(p.id, p.line.name, {when})

	validate(t, trip, 'journeyLeg', 'trip')
	t.end()
}))

test('departures at Karl-Theodor-Straße', co(function*(t) {
	const departures = yield client.departures(karlTheodorStr, {
		duration: 10, when
	})

	yield testDepartures({
		test: t,
		departures,
		validate,
		id: karlTheodorStr
	})
	t.end()
}))

test('departures with station object', co(function* (t) {
	const deps = yield client.departures({
		type: 'station',
		id: mittersendling,
		name: 'Mittersendling',
		location: {
			type: 'location',
			latitude: 48.107418,
			longitude: 11.536306
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
}))

test('arrivals at Karl-Theodor-Straße', co(function*(t) {
	const arrivals = yield client.arrivals(karlTheodorStr, {
		duration: 10, when
	})

	yield testArrivals({
		test: t,
		arrivals,
		validate,
		id: karlTheodorStr
	})
	t.end()
}))

// todo: nearby

test('locations named "Nationaltheater"', co(function*(t) {
	const nationaltheater = '624639'
	const locations = yield client.locations('Nationaltheater', {
		results: 10
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.some((l) => {
		const trim = str => str && str.replace(/^0+/, '')
		return l.station && trim(l.station.id) === nationaltheater || trim(l.id) === nationaltheater
	}))

	t.end()
}))

test('station Karl-Theodor-Straße', co(function* (t) {
	const s = yield client.station(karlTheodorStr)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, karlTheodorStr)

	t.end()
}))

test('radar', co(function* (t) {
	const vehicles = yield client.radar({
		north: 48.145121,
		west: 11.543736,
		south: 48.138339,
		east: 11.553776
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
}))

test('reachableFrom', co(function* (t) {
	yield testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: poetschnerstr,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
}))
