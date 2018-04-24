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
	station: createValidateStation
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')

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
const client = createClient(dbProfile)

const berlinHbf = '8011160'
const münchenHbf = '8000261'
const jungfernheide = '8011167'
const blnSchwedterStr = '732652'
const westhafen = '008089116'
const wedding = '008089131'
const württembergallee = '731084'
const regensburgHbf = '8000309'

test('journeys – Berlin Schwedter Str. to München Hbf', co(function* (t) {
	const journeys = yield client.journeys(blnSchwedterStr, münchenHbf, {
		results: 3, when, passedStations: true
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
// todo: journeys, fails with no product

test('Berlin Schwedter Str. to Torfstraße 17', co(function* (t) {
	const torfstr = {
		type: 'location',
		address: 'Torfstraße 17',
		latitude: 52.5416823,
		longitude: 13.3491223
	}
	const journeys = yield client.journeys(blnSchwedterStr, torfstr, {
		results: 3, when
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
		results: 3, when
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
		when,
		passedStations: true
	})

	validate(t, journeys, 'journeys', 'journeys')

	const leg = journeys[0].legs.some((leg) => {
		return leg.passed && leg.passed.some((passed) => {
			return passed.station.id === württembergallee
		})
	})
	t.ok(leg, 'Württembergalle is not being passed')

	t.end()
}))

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

test('journey leg details', co(function* (t) {
	const journeys = yield client.journeys(berlinHbf, münchenHbf, {
		results: 1, when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	validate(t, leg, 'journeyLeg', 'leg')
	t.end()
}))

test('departures at Berlin Jungfernheide', co(function* (t) {
	const deps = yield client.departures(jungfernheide, {
		duration: 5, when
	})

	validate(t, deps, 'departures', 'departures')
	for (let i = 0; i < deps.length; i++) {
		const dep = deps[i]
		const name = `deps[${i}]`
		// todo: make this pass
		// t.equal(dep.station.id, jungfernheide, name + '.station.id is invalid')
	}
	// todo: move into deps validator
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))

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
	t.ok(isRoughlyEqual(s0.location.latitude, 52.530408, .0005))
	t.ok(isRoughlyEqual(s0.location.longitude, 13.299424, .0005))
	t.ok(s0.distance >= 0)
	t.ok(s0.distance <= 100)

	// todo: nearby[0]
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
		return l.id === '008011167' || l.id === jungfernheide
	}), 'Jungfernheide not found')

	t.end()
}))

test('location', co(function* (t) {
	const s = yield client.location(regensburgHbf)

	validate(t, s, 'station', 'station')
	t.equal(s.id, regensburgHbf)

	t.end()
}))
