'use strict'

const getStations = require('db-stations').full
const tapePromise = require('tape-promise').default
const tape = require('tape')
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
	s.coordinates &&
	isRoughlyEqual(s.coordinates.latitude, 52.530408, .0005) &&
	isRoughlyEqual(s.coordinates.longitude, 13.299424, .0005)
}

const assertIsJungfernheide = (t, s) => {
	t.equal(s.type, 'station')
	t.ok(s.id === '008011167' || s.id === '8011167', 'id should be 8011167')
	t.equal(s.name, 'Berlin Jungfernheide')
	t.ok(s.coordinates)
	t.ok(isRoughlyEqual(s.coordinates.latitude, 52.530408, .0005))
	t.ok(isRoughlyEqual(s.coordinates.longitude, 13.299424, .0005))
}

const assertValidProducts = (t, p) => {
	for (let k of Object.keys(modes)) {
		t.ok('boolean', typeof modes[k], 'mode ' + k + ' must be a boolean')
	}
}

const test = tapePromise(tape)
const client = createClient(dbProfile)

test('Berlin Jungfernheide to München Hbf', async (t) => {
	const journeys = await client.journeys('8011167', '8000261', {
		when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		assertValidStation(t, journey.origin)
		if (!await findStation(journey.origin.id)) {
			console.error('unknown station', journey.origin.id, journey.origin.name)
		}
		if (journey.origin.products) {
			assertValidProducts(t, journey.origin.products)
		}
		t.ok(isValidWhen(journey.departure))

		assertValidStation(t, journey.destination)
		if (!await findStation(journey.origin.id)) {
			console.error('unknown station', journey.destination.id, journey.destination.name)
		}
		if (journey.destination.products) {
			assertValidProducts(t, journey.destination.products)
		}
		t.ok(isValidWhen(journey.arrival))

		t.ok(Array.isArray(journey.parts))
		t.ok(journey.parts.length > 0, 'no parts')
		const part = journey.parts[0]

		assertValidStation(t, part.origin)
		if (!await findStation(part.origin.id)) {
			console.error('unknown station', part.origin.id, part.origin.name)
		}
		t.ok(isValidWhen(part.departure))
		t.equal(typeof part.departurePlatform, 'string')

		assertValidStation(t, part.destination)
		if (!await findStation(part.destination.id)) {
			console.error('unknown station', part.destination.id, part.destination.name)
		}
		t.ok(isValidWhen(part.arrival))
		t.equal(typeof part.arrivalPlatform, 'string')

		assertValidLine(t, part.line)

		t.ok(Array.isArray(part.passed))
		for (let stopover of part.passed) assertValidStopover(t, stopover)
	}

	t.end()
})

test('Berlin Jungfernheide to Torfstraße 17', async (t) => {
	const journeys = await client.journeys('8011167', {
		type: 'address', name: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.origin)
	if (!await findStation(part.origin.id)) {
		console.error('unknown station', part.origin.id, part.origin.name)
	}
	if (part.origin.products) assertValidProducts(t, part.origin.products)
	t.ok(isValidWhen(part.departure))
	t.ok(isValidWhen(part.arrival))

	const d = part.destination
	assertValidAddress(t, d)
	t.equal(d.name, 'Torfstraße 17')
	t.ok(isRoughlyEqual(.0001, d.coordinates.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, d.coordinates.longitude, 13.3491223))

	t.end()
})

test('Berlin Jungfernheide to ATZE Musiktheater', async (t) => {
	const journeys = await client.journeys('8011167', {
		type: 'poi', name: 'ATZE Musiktheater', id: '991598902',
		latitude: 52.542417, longitude: 13.350437
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.origin)
	if (!await findStation(part.origin.id)) {
		console.error('unknown station', part.origin.id, part.origin.name)
	}
	if (part.origin.products) assertValidProducts(t, part.origin.products)
	t.ok(isValidWhen(part.departure))
	t.ok(isValidWhen(part.arrival))

	const d = part.destination
	assertValidPoi(t, d)
	t.equal(d.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, d.coordinates.latitude, 52.542399))
	t.ok(isRoughlyEqual(.0001, d.coordinates.longitude, 13.350402))

	t.end()
})

test('departures at Berlin Jungfernheide', async (t) => {
	const deps = await client.departures('8011167', {
		duration: 5, when
	})

	t.ok(Array.isArray(deps))
	for (let dep of deps) {
		assertValidStation(t, dep.station)
		if (!await findStation(dep.station.id)) {
			console.error('unknown station', dep.station.id, dep.station.name)
		}
		if (dep.station.products) assertValidProducts(t, dep.station.products)
		t.ok(isValidWhen(dep.when))
	}

	t.end()
})

test('nearby Berlin Jungfernheide', async (t) => {
	const nearby = await client.nearby(52.530273, 13.299433, {
		results: 2, distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsJungfernheide(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	t.end()
})

test('locations named Jungfernheide', async (t) => {
	const locations = await client.locations('Jungfernheide', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let location of locations) assertValidLocation(t, location)
	t.ok(locations.some(isJungfernheide))

	t.end()
})
