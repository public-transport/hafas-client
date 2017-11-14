'use strict'

const a = require('assert')
const isRoughlyEqual = require('is-roughly-equal')
const stations = require('vbb-stations-autocomplete')
const tapePromise = require('tape-promise').default
const tape = require('tape')

const createClient = require('..')
const vbbProfile = require('../p/vbb')
const modes = require('../p/vbb/modes')
const {
	assertValidStation, assertValidFrameStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidLine,
	assertValidPassed,
	hour, when,
	assertValidWhen
} = require('./util')

// todo
const findStation = (query) => stations(query, true, false)

const test = tapePromise(tape)
const client = createClient(vbbProfile)

test('journeys – station to station', async (t) => {
	// U Spichernstr. to U Amrumer Str.
	const journeys = await client.journeys('900000042101', '900000009101', {
		results: 3, when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.strictEqual(journeys.length, 3)

	for (let journey of journeys) {
		assertValidStation(t, journey.origin)
		t.ok(journey.origin.name.indexOf('(Berlin)') === -1)
		t.strictEqual(journey.origin.id, '900000042101')
		assertValidWhen(t, journey.departure)

		assertValidStation(t, journey.destination)
		t.strictEqual(journey.destination.id, '900000009101')
		assertValidWhen(t, journey.arrival)

		t.ok(Array.isArray(journey.parts))
		t.strictEqual(journey.parts.length, 1)
		const part = journey.parts[0]

		t.equal(typeof part.id, 'string')
		t.ok(part.id)
		assertValidStation(t, part.origin)
		t.ok(part.origin.name.indexOf('(Berlin)') === -1)
		t.strictEqual(part.origin.id, '900000042101')
		assertValidWhen(t, part.departure)

		assertValidStation(t, part.destination)
		t.strictEqual(part.destination.id, '900000009101')
		assertValidWhen(t, part.arrival)

		assertValidLine(t, part.line)
		t.ok(findStation(part.direction))
		t.ok(part.direction.indexOf('(Berlin)') === -1)

		t.ok(Array.isArray(part.passed))
		for (let passed of part.passed) assertValidPassed(t, passed)
	}
	t.end()
})

test('journeys – only subway', async (t) => {
	// U Spichernstr. to U Bismarckstr.
	const journeys = await client.journeys('900000042101', '900000024201', {
		results: 20, when,
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

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 1)

	for (let journey of journeys) {
		for (let part of journey.parts) {
			if (part.line) {
				t.equal(part.line.mode, 'train')
				t.equal(part.line.product, 'subway')
				t.equal(part.line.public, true)
			}
		}
	}
	t.end()
})

test('journeys – fails with no product', async (t) => {
	try {
		// U Spichernstr. to U Bismarckstr.
		await client.journeys('900000042101', '900000024201', {
			when,
			products: {
				suburban: false,
				subway:   false,
				tram:     false,
				bus:      false,
				ferry:    false,
				express:  false,
				regional: false
			}
		})
	} catch (err) {
		t.ok(err, 'error thrown')
		t.end()
	}
})

test('journey part details', async (t) => {
	// U Spichernstr. to U Amrumer Str.
	const journeys = await client.journeys('900000042101', '900000009101', {
		results: 1, when
	})

	const p = journeys[0].parts[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const part = await client.journeyPart(p.id, p.line.name, {when})

	t.equal(typeof part.id, 'string')
	t.ok(part.id)

	assertValidLine(t, part.line)

	t.equal(typeof part.direction, 'string')
	t.ok(part.direction)

	t.ok(Array.isArray(part.passed))
	for (let passed of part.passed) assertValidPassed(t, passed)

	t.end()
})



test('journeys – station to address', async (t) => {
	// U Spichernstr. to Torfstraße 17
	const journeys = await client.journeys('900000042101', {
		type: 'address', name: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {results: 1, when})

	t.ok(Array.isArray(journeys))
	t.strictEqual(journeys.length, 1)
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.origin)
	assertValidWhen(t, part.departure)

	const dest = part.destination
	assertValidAddress(t, dest)
	t.strictEqual(dest.name, 'Torfstr. 17')
	t.ok(isRoughlyEqual(.0001, dest.coordinates.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, dest.coordinates.longitude, 13.3491223))
	assertValidWhen(t, part.arrival)

	t.end()
})



test('journeys – station to POI', async (t) => {
	// U Spichernstr. to ATZE Musiktheater
	const journeys = await client.journeys('900000042101', {
		type: 'poi', name: 'ATZE Musiktheater', id: 9980720,
		latitude: 52.543333, longitude: 13.351686
	}, {results: 1, when})

	t.ok(Array.isArray(journeys))
	t.strictEqual(journeys.length, 1)
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.origin)
	assertValidWhen(t, part.departure)

	const dest = part.destination
	assertValidPoi(t, dest)
	t.strictEqual(dest.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, dest.coordinates.latitude, 52.543333))
	t.ok(isRoughlyEqual(.0001, dest.coordinates.longitude, 13.351686))
	assertValidWhen(t, part.arrival)

	t.end()
})



test('departures', async (t) => {
	// U Spichernstr.
	const deps = await client.departures('900000042101', {duration: 5, when})

	t.ok(Array.isArray(deps))
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))
	for (let dep of deps) {
		t.equal(typeof dep.ref, 'string')
		t.ok(dep.ref)

		t.equal(dep.station.name, 'U Spichernstr.')
		assertValidStation(t, dep.station)
		t.strictEqual(dep.station.id, '900000042101')

		assertValidWhen(t, dep.when)
		t.ok(findStation(dep.direction))
		assertValidLine(t, dep.line)
	}
	t.end()
})

test('departures at 7-digit station', async (t) => {
	const eisenach = '8010097' // see derhuerst/vbb-hafas#22
	await client.departures(eisenach, {when})
	t.pass('did not fail')

	t.end()
})



test('nearby', async (t) => {
	// Berliner Str./Bundesallee
	const nearby = await client.nearby(52.4873452,13.3310411, {distance: 200})

	t.ok(Array.isArray(nearby))
	for (let n of nearby) assertValidLocation(t, n, false)

	t.equal(nearby[0].id, '900000044201')
	t.equal(nearby[0].name, 'U Berliner Str.')
	t.ok(nearby[0].distance > 0)
	t.ok(nearby[0].distance < 100)

	t.equal(nearby[1].id, '900000043252')
	t.equal(nearby[1].name, 'Landhausstr.')
	t.ok(nearby[1].distance > 100)
	t.ok(nearby[1].distance < 200)

	t.end()
})



test('locations', async (t) => {
	const locations = await client.locations('Alexanderplatz', {results: 10})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)
	for (let l of locations) assertValidLocation(t, l)
	t.ok(locations.find((s) => s.type === 'station'))
	t.ok(locations.find((s) => s.type === 'poi'))
	t.ok(locations.find((s) => s.type === 'address'))

	t.end()
})



test('radar', async (t) => {
	const vehicles = await client.radar(52.52411, 13.41002, 52.51942, 13.41709, {
		duration: 5 * 60, when
	})

	t.ok(Array.isArray(vehicles))
	t.ok(vehicles.length > 0)
	for (let v of vehicles) {

		t.ok(findStation(v.direction))
		assertValidLine(t, v.line)

		t.equal(typeof v.coordinates.latitude, 'number')
		t.ok(v.coordinates.latitude <= 55, 'vehicle is too far away')
		t.ok(v.coordinates.latitude >= 45, 'vehicle is too far away')
		t.equal(typeof v.coordinates.longitude, 'number')
		t.ok(v.coordinates.longitude >= 9, 'vehicle is too far away')
		t.ok(v.coordinates.longitude <= 15, 'vehicle is too far away')

		t.ok(Array.isArray(v.nextStops))
		for (let s of v.nextStops) {
			assertValidFrameStation(t, s.station)
			if (!s.arrival && !s.departure)
				t.ifError(new Error('neither arrival nor departure return'))
			if (s.arrival) {
				t.equal(typeof s.arrival, 'string')
				const arr = +new Date(s.arrival)
				t.ok(!Number.isNaN(arr))
				// note that this can be an ICE train
				t.ok(isRoughlyEqual(14 * hour, +when, arr))
			}
			if (s.departure) {
				t.equal(typeof s.departure, 'string')
				const dep = +new Date(s.departure)
				t.ok(!Number.isNaN(dep))
				// note that this can be an ICE train
				t.ok(isRoughlyEqual(14 * hour, +when, dep))
			}
		}

		t.ok(Array.isArray(v.frames))
		for (let f of v.frames) {
			assertValidFrameStation(t, f.origin)
			assertValidFrameStation(t, f.destination)
			t.equal(typeof f.t, 'number')
		}
	}
	t.end()
})
