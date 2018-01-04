'use strict'

const a = require('assert')
const isRoughlyEqual = require('is-roughly-equal')
const stations = require('vbb-stations-autocomplete')
const tapePromise = require('tape-promise').default
const tape = require('tape')
const co = require('co')
const shorten = require('vbb-short-station-name')

const createClient = require('..')
const vbbProfile = require('../p/vbb')
const {
	assertValidStation: _assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidLine: _assertValidLine,
	assertValidStopover,
	hour, when,
	assertValidWhen,
	assertValidTicket
} = require('./util')

const assertValidStation = (t, s, coordsOptional = false) => {
	_assertValidStation(t, s, coordsOptional)
	t.equal(s.name, shorten(s.name))
}

const assertValidStationProducts = (t, p) => {
	t.ok(p)
	t.equal(typeof p.suburban, 'boolean')
	t.equal(typeof p.subway, 'boolean')
	t.equal(typeof p.tram, 'boolean')
	t.equal(typeof p.bus, 'boolean')
	t.equal(typeof p.ferry, 'boolean')
	t.equal(typeof p.express, 'boolean')
	t.equal(typeof p.regional, 'boolean')
}

const assertValidLine = (t, l) => {
	_assertValidLine(t, l)
	if (l.symbol !== null) t.equal(typeof l.symbol, 'string')
	if (l.nr !== null) t.equal(typeof l.nr, 'number')
	if (l.metro !== null) t.equal(typeof l.metro, 'boolean')
	if (l.express !== null) t.equal(typeof l.express, 'boolean')
	if (l.night !== null) t.equal(typeof l.night, 'boolean')
}

// todo
const findStation = (query) => stations(query, true, false)

const test = tapePromise(tape)
const client = createClient(vbbProfile)

const amrumerStr = '900000009101'
const spichernstr = '900000042101'
const bismarckstr = '900000024201'

test('journeys – station to station', co.wrap(function* (t) {
	const journeys = yield client.journeys(spichernstr, amrumerStr, {
		results: 3, when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.strictEqual(journeys.length, 3)

	for (let journey of journeys) {
		assertValidStation(t, journey.origin)
		assertValidStationProducts(t, journey.origin.products)
		t.ok(journey.origin.name.indexOf('(Berlin)') === -1)
		t.strictEqual(journey.origin.id, spichernstr)
		assertValidWhen(t, journey.departure)

		assertValidStation(t, journey.destination)
		assertValidStationProducts(t, journey.destination.products)
		t.strictEqual(journey.destination.id, amrumerStr)
		assertValidWhen(t, journey.arrival)

		t.ok(Array.isArray(journey.legs))
		t.strictEqual(journey.legs.length, 1)
		const leg = journey.legs[0]

		t.equal(typeof leg.id, 'string')
		t.ok(leg.id)
		assertValidStation(t, leg.origin)
		assertValidStationProducts(t, leg.origin.products)
		t.ok(leg.origin.name.indexOf('(Berlin)') === -1)
		t.strictEqual(leg.origin.id, spichernstr)
		assertValidWhen(t, leg.departure)

		assertValidStation(t, leg.destination)
		assertValidStationProducts(t, leg.destination.products)
		t.strictEqual(leg.destination.id, amrumerStr)
		assertValidWhen(t, leg.arrival)

		assertValidLine(t, leg.line)
		t.ok(findStation(leg.direction))
		t.ok(leg.direction.indexOf('(Berlin)') === -1)

		t.ok(Array.isArray(leg.passed))
		for (let passed of leg.passed) assertValidStopover(t, passed)

		// todo: find a journey where there ticket info is always available
		if (journey.tickets) {
			t.ok(Array.isArray(journey.tickets))
			for (let ticket of journey.tickets) assertValidTicket(t, ticket)
		}
	}
	t.end()
}))

test('journeys – only subway', co.wrap(function* (t) {
	const journeys = yield client.journeys(spichernstr, bismarckstr, {
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
		for (let leg of journey.legs) {
			if (leg.line) {
				assertValidLine(t, leg.line)
				t.equal(leg.line.mode, 'train')
				t.equal(leg.line.product, 'subway')
			}
		}
	}
	t.end()
}))

test('journeys – fails with no product', co.wrap(function* (t) {
	try {
		yield client.journeys(spichernstr, bismarckstr, {
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
}))

test('journey leg details', co.wrap(function* (t) {
	const journeys = yield client.journeys(spichernstr, amrumerStr, {
		results: 1, when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	t.equal(typeof leg.id, 'string')
	t.ok(leg.id)

	assertValidLine(t, leg.line)

	t.equal(typeof leg.direction, 'string')
	t.ok(leg.direction)

	t.ok(Array.isArray(leg.passed))
	for (let passed of leg.passed) assertValidStopover(t, passed)

	t.end()
}))



test('journeys – station to address', co.wrap(function* (t) {
	const journeys = yield client.journeys(spichernstr, {
		type: 'location', address: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {results: 1, when})

	t.ok(Array.isArray(journeys))
	t.strictEqual(journeys.length, 1)
	const journey = journeys[0]
	const leg = journey.legs[journey.legs.length - 1]

	assertValidStation(t, leg.origin)
	assertValidStationProducts(t, leg.origin.products)
	assertValidWhen(t, leg.departure)

	const dest = leg.destination
	assertValidAddress(t, dest)
	t.strictEqual(dest.address, 'Torfstraße 17')
	t.ok(isRoughlyEqual(.0001, dest.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, dest.longitude, 13.3491223))
	assertValidWhen(t, leg.arrival)

	t.end()
}))



test('journeys – station to POI', co.wrap(function* (t) {
	const journeys = yield client.journeys(spichernstr, {
		type: 'location', id: '9980720', name: 'ATZE Musiktheater',
		latitude: 52.543333, longitude: 13.351686
	}, {results: 1, when})

	t.ok(Array.isArray(journeys))
	t.strictEqual(journeys.length, 1)
	const journey = journeys[0]
	const leg = journey.legs[journey.legs.length - 1]

	assertValidStation(t, leg.origin)
	assertValidStationProducts(t, leg.origin.products)
	assertValidWhen(t, leg.departure)

	const dest = leg.destination
	assertValidPoi(t, dest)
	t.strictEqual(dest.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, dest.latitude, 52.543333))
	t.ok(isRoughlyEqual(.0001, dest.longitude, 13.351686))
	assertValidWhen(t, leg.arrival)

	t.end()
}))



test('departures', co.wrap(function* (t) {
	const deps = yield client.departures(spichernstr, {duration: 5, when})

	t.ok(Array.isArray(deps))
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))
	for (let dep of deps) {
		t.equal(typeof dep.journeyId, 'string')
		t.ok(dep.journeyId)

		t.equal(dep.station.name, 'U Spichernstr.')
		assertValidStation(t, dep.station)
		assertValidStationProducts(t, dep.station.products)
		t.strictEqual(dep.station.id, spichernstr)

		assertValidWhen(t, dep.when)
		t.ok(findStation(dep.direction))
		assertValidLine(t, dep.line)
	}
	t.end()
}))

test('departures with station object', co.wrap(function* (t) {
	yield client.departures({
		type: 'station',
		id: spichernstr,
		name: 'U Spichernstr',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	t.ok('did not fail')
	t.end()
}))

test('departures at 7-digit station', co.wrap(function* (t) {
	const eisenach = '8010097' // see derhuerst/vbb-hafas#22
	yield client.departures(eisenach, {when})
	t.pass('did not fail')

	t.end()
}))



test('nearby', co.wrap(function* (t) {
	// Berliner Str./Bundesallee
	const nearby = yield client.nearby(52.4873452, 13.3310411, {distance: 200})

	t.ok(Array.isArray(nearby))
	for (let n of nearby) {
		if (n.type === 'station') assertValidStation(t, n)
		else assertValidLocation(t, n, false)
	}

	t.equal(nearby[0].id, '900000044201')
	t.equal(nearby[0].name, 'U Berliner Str.')
	t.ok(nearby[0].distance > 0)
	t.ok(nearby[0].distance < 100)

	t.equal(nearby[1].id, '900000043252')
	t.equal(nearby[1].name, 'Landhausstr.')
	t.ok(nearby[1].distance > 100)
	t.ok(nearby[1].distance < 200)

	t.end()
}))



test('locations', co.wrap(function* (t) {
	const locations = yield client.locations('Alexanderplatz', {results: 10})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)
	for (let l of locations) {
		if (l.type === 'station') assertValidStation(t, l)
		else assertValidLocation(t, l)
	}
	t.ok(locations.find(s => s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.find(s => !s.name && s.address)) // addresses

	t.end()
}))



test('radar', co.wrap(function* (t) {
	const vehicles = yield client.radar(52.52411, 13.41002, 52.51942, 13.41709, {
		duration: 5 * 60, when
	})

	t.ok(Array.isArray(vehicles))
	t.ok(vehicles.length > 0)
	for (let v of vehicles) {

		t.ok(findStation(v.direction))
		assertValidLine(t, v.line)

		t.equal(typeof v.location.latitude, 'number')
		t.ok(v.location.latitude <= 55, 'vehicle is too far away')
		t.ok(v.location.latitude >= 45, 'vehicle is too far away')
		t.equal(typeof v.location.longitude, 'number')
		t.ok(v.location.longitude >= 9, 'vehicle is too far away')
		t.ok(v.location.longitude <= 15, 'vehicle is too far away')

		t.ok(Array.isArray(v.nextStops))
		for (let st of v.nextStops) {
			assertValidStopover(t, st, true)
			t.strictEqual(st.station.name.indexOf('(Berlin)'), -1)

			if (st.arrival) {
				t.equal(typeof st.arrival, 'string')
				const arr = +new Date(st.arrival)
				// note that this can be an ICE train
				t.ok(isRoughlyEqual(14 * hour, +when, arr))
			}
			if (st.departure) {
				t.equal(typeof st.departure, 'string')
				const dep = +new Date(st.departure)
				// note that this can be an ICE train
				t.ok(isRoughlyEqual(14 * hour, +when, dep))
			}
		}

		t.ok(Array.isArray(v.frames))
		for (let f of v.frames) {
			assertValidStation(t, f.origin, true)
			assertValidStationProducts(t, f.origin.products)
			t.strictEqual(f.origin.name.indexOf('(Berlin)'), -1)
			assertValidStation(t, f.destination, true)
			assertValidStationProducts(t, f.destination.products)
			t.strictEqual(f.destination.name.indexOf('(Berlin)'), -1)
			t.equal(typeof f.t, 'number')
		}
	}
	t.end()
}))
