'use strict'

const getStations = require('db-stations').full
const tapePromise = require('tape-promise').default
const tape = require('tape')
const co = require('co')
const isRoughlyEqual = require('is-roughly-equal')

const createClient = require('..')
const dbProfile = require('../p/db')
const modes = require('../p/db/modes')
const {
	assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidLine,
	assertValidStopover,
	when, isValidWhen
} = require('./util.js')

const assertValidStationProducts = (t, p) => {
	t.ok(p)
	t.equal(typeof p.nationalExp, 'boolean')
	t.equal(typeof p.national, 'boolean')
	t.equal(typeof p.regionalExp, 'boolean')
	t.equal(typeof p.regional, 'boolean')
	t.equal(typeof p.suburban, 'boolean')
	t.equal(typeof p.bus, 'boolean')
	t.equal(typeof p.ferry, 'boolean')
	t.equal(typeof p.subway, 'boolean')
	t.equal(typeof p.tram, 'boolean')
	t.equal(typeof p.taxi, 'boolean')
}

const findStation = (id) => new Promise((yay, nay) => {
	const stations = getStations()
	stations
	.once('error', nay)
	.on('data', (s) => {
		if (
			s.id === id ||
			(s.additionalIds && s.additionalIds.includes(id))
		) {
			yay(s)
			stations.destroy()
		}
	})
	.once('end', yay)
})

const isJungfernheide = (s) => {
	return s.type === 'station' &&
	(s.id === '008011167' || s.id === '8011167') &&
	s.name === 'Berlin Jungfernheide' &&
	s.location &&
	isRoughlyEqual(s.location.latitude, 52.530408, .0005) &&
	isRoughlyEqual(s.location.longitude, 13.299424, .0005)
}

const assertIsJungfernheide = (t, s) => {
	t.equal(s.type, 'station')
	t.ok(s.id === '008011167' || s.id === '8011167', 'id should be 8011167')
	t.equal(s.name, 'Berlin Jungfernheide')
	t.ok(s.location)
	t.ok(isRoughlyEqual(s.location.latitude, 52.530408, .0005))
	t.ok(isRoughlyEqual(s.location.longitude, 13.299424, .0005))
}

// todo: this doesnt seem to work
// todo: DRY with assertValidStationProducts
const assertValidProducts = (t, p) => {
	for (let k of Object.keys(modes)) {
		t.ok('boolean', typeof modes[k], 'mode ' + k + ' must be a boolean')
	}
}

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

test('Berlin Jungfernheide to München Hbf', co.wrap(function* (t) {
	const journeys = yield client.journeys('8011167', '8000261', {
		when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		assertValidStation(t, journey.origin)
		assertValidStationProducts(t, journey.origin.products)
		if (!(yield findStation(journey.origin.id))) {
			console.error('unknown station', journey.origin.id, journey.origin.name)
		}
		if (journey.origin.products) {
			assertValidProducts(t, journey.origin.products)
		}
		t.ok(isValidWhen(journey.departure))

		assertValidStation(t, journey.destination)
		assertValidStationProducts(t, journey.origin.products)
		if (!(yield findStation(journey.origin.id))) {
			console.error('unknown station', journey.destination.id, journey.destination.name)
		}
		if (journey.destination.products) {
			assertValidProducts(t, journey.destination.products)
		}
		t.ok(isValidWhen(journey.arrival))

		t.ok(Array.isArray(journey.legs))
		t.ok(journey.legs.length > 0, 'no legs')
		const leg = journey.legs[0]

		assertValidStation(t, leg.origin)
		assertValidStationProducts(t, leg.origin.products)
		if (!(yield findStation(leg.origin.id))) {
			console.error('unknown station', leg.origin.id, leg.origin.name)
		}
		t.ok(isValidWhen(leg.departure))
		t.equal(typeof leg.departurePlatform, 'string')

		assertValidStation(t, leg.destination)
		assertValidStationProducts(t, leg.origin.products)
		if (!(yield findStation(leg.destination.id))) {
			console.error('unknown station', leg.destination.id, leg.destination.name)
		}
		t.ok(isValidWhen(leg.arrival))
		t.equal(typeof leg.arrivalPlatform, 'string')

		assertValidLine(t, leg.line)

		t.ok(Array.isArray(leg.passed))
		for (let stopover of leg.passed) assertValidStopover(t, stopover)

		if (journey.price) assertValidPrice(t, journey.price)
	}

	t.end()
}))

test('Berlin Jungfernheide to Torfstraße 17', co.wrap(function* (t) {
	const journeys = yield client.journeys('8011167', {
		type: 'location', address: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const leg = journey.legs[journey.legs.length - 1]

	assertValidStation(t, leg.origin)
	assertValidStationProducts(t, leg.origin.products)
	if (!(yield findStation(leg.origin.id))) {
		console.error('unknown station', leg.origin.id, leg.origin.name)
	}
	if (leg.origin.products) assertValidProducts(t, leg.origin.products)
	t.ok(isValidWhen(leg.departure))
	t.ok(isValidWhen(leg.arrival))

	const d = leg.destination
	assertValidAddress(t, d)
	t.equal(d.address, 'Torfstraße 17')
	t.ok(isRoughlyEqual(.0001, d.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, d.longitude, 13.3491223))

	t.end()
}))

test('Berlin Jungfernheide to ATZE Musiktheater', co.wrap(function* (t) {
	const journeys = yield client.journeys('8011167', {
		type: 'location', id: '991598902', name: 'ATZE Musiktheater',
		latitude: 52.542417, longitude: 13.350437
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const leg = journey.legs[journey.legs.length - 1]

	assertValidStation(t, leg.origin)
	assertValidStationProducts(t, leg.origin.products)
	if (!(yield findStation(leg.origin.id))) {
		console.error('unknown station', leg.origin.id, leg.origin.name)
	}
	if (leg.origin.products) assertValidProducts(t, leg.origin.products)
	t.ok(isValidWhen(leg.departure))
	t.ok(isValidWhen(leg.arrival))

	const d = leg.destination
	assertValidPoi(t, d)
	t.equal(d.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, d.latitude, 52.542399))
	t.ok(isRoughlyEqual(.0001, d.longitude, 13.350402))

	t.end()
}))

test('departures at Berlin Jungfernheide', co.wrap(function* (t) {
	const deps = yield client.departures('8011167', {
		duration: 5, when
	})

	t.ok(Array.isArray(deps))
	for (let dep of deps) {
		assertValidStation(t, dep.station)
		assertValidStationProducts(t, dep.station.products)
		if (!(yield findStation(dep.station.id))) {
			console.error('unknown station', dep.station.id, dep.station.name)
		}
		if (dep.station.products) assertValidProducts(t, dep.station.products)
		t.ok(isValidWhen(dep.when))
	}

	t.end()
}))

test('nearby Berlin Jungfernheide', co.wrap(function* (t) {
	const nearby = yield client.nearby(52.530273, 13.299433, {
		results: 2, distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsJungfernheide(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	for (let n of nearby) {
		if (n.type === 'station') assertValidStation(t, n)
		else assertValidLocation(t, n)
	}

	t.end()
}))

test('locations named Jungfernheide', co.wrap(function* (t) {
	const locations = yield client.locations('Jungfernheide', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let l of locations) {
		if (l.type === 'station') assertValidStation(t, l)
		else assertValidLocation(t, l)
	}
	t.ok(locations.some(isJungfernheide))

	t.end()
}))
