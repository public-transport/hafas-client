'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')
const validateFptf = require('validate-fptf')

const co = require('./co')
const createClient = require('..')
const insaProfile = require('../p/insa')
const allProducts = require('../p/insa/products')
const {
	assertValidStation: _assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidLine,
	assertValidStopover,
	hour,
	createWhen,
	assertValidWhen
} = require('./util.js')

const when = createWhen('Europe/Berlin', 'de-DE')

// todo: DRY with other tests, move into lib
const assertValidStation = (t, s, coordsOptional = false) => {
	_assertValidStation(t, s, coordsOptional)
	t.ok(s.products)
	for (let product of allProducts) {
		product = product.id
		const msg = `station.products[${product}] must be a boolean`
		t.equal(typeof s.products[product], 'boolean', msg)
	}
}

const isMagdeburgHbf = s => {
	return (
		s.type === 'station' &&
		(s.id === '8010224' || s.id === '008010224') &&
		s.name === 'Magdeburg Hbf' &&
		s.location &&
		isRoughlyEqual(s.location.latitude, 52.130352, 0.001) &&
		isRoughlyEqual(s.location.longitude, 11.626891, 0.001)
	)
}

const assertIsMagdeburgHbf = (t, s) => {
	t.equal(s.type, 'station')
	t.ok(s.id === '8010224' || s.id === '008010224', 'id should be 8010224')
	t.equal(s.name, 'Magdeburg Hbf')
	t.ok(s.location)
	t.ok(isRoughlyEqual(s.location.latitude, 52.130352, 0.001))
	t.ok(isRoughlyEqual(s.location.longitude, 11.626891, 0.001))
}

const test = tapePromise(tape)
const client = createClient(insaProfile)

test('Magdeburg Hbf to Magdeburg-Buckau', co(function*(t) {
	const magdeburgHbf = '8010224'
	const magdeburgBuckau = '8013456'
	const journeys = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		when,
		passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		t.ok(Array.isArray(journey.legs))
		t.ok(journey.legs.length > 0, 'no legs')
		const leg = journey.legs[0] // todo: all legs

		assertValidStation(t, leg.origin)
		assertValidWhen(t, leg.departure, when)
		t.equal(typeof leg.departurePlatform, 'string')

		assertValidStation(t, leg.destination)
		assertValidWhen(t, leg.arrival, when)
		t.equal(typeof leg.arrivalPlatform, 'string')

		assertValidLine(t, leg.line)

		t.ok(Array.isArray(leg.passed))
		for (let stopover of leg.passed) assertValidStopover(t, stopover)
	}

	t.end()
}))

test('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', co(function*(t) {
	const magdeburgHbf = '8010224'
	const sternStr = {
		type: 'location',
		latitude: 52.118414,
		longitude: 11.422332,
		address: 'Magdeburg - Altenstadt, Sternstraße 10'
	}

	const journeys = yield client.journeys(magdeburgHbf, sternStr, {
		when
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const firstLeg = journey.legs[0]
	const lastLeg = journey.legs[journey.legs.length - 1]

	assertValidStation(t, firstLeg.origin)
	assertValidWhen(t, firstLeg.departure, when)
	assertValidWhen(t, firstLeg.arrival, when)
	assertValidWhen(t, lastLeg.departure, when)
	assertValidWhen(t, lastLeg.arrival, when)

	const d = lastLeg.destination
	assertValidAddress(t, d)
	t.equal(d.address, 'Magdeburg - Altenstadt, Sternstraße 10')
	t.ok(isRoughlyEqual(0.0001, d.latitude, 52.118414))
	t.ok(isRoughlyEqual(0.0001, d.longitude, 11.422332))

	t.end()
}))

test('Kloster Unser Lieben Frauen to Magdeburg Hbf', co(function*(t) {
	const kloster = {
		type: 'location',
		latitude: 52.127601,
		longitude: 11.636437,
		name: 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)',
		id: '970012223'
	}
	const magdeburgHbf = '8010224'
	const journeys = yield client.journeys(kloster, magdeburgHbf, {
		when
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const firstLeg = journey.legs[0]
	const lastLeg = journey.legs[journey.legs.length - 1]

	const o = firstLeg.origin
	assertValidPoi(t, o)
	t.equal(o.name, 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)')
	t.ok(isRoughlyEqual(0.0001, o.latitude, 52.127601))
	t.ok(isRoughlyEqual(0.0001, o.longitude, 11.636437))

	assertValidWhen(t, firstLeg.departure, when)
	assertValidWhen(t, firstLeg.arrival, when)
	assertValidWhen(t, lastLeg.departure, when)
	assertValidWhen(t, lastLeg.arrival, when)

	assertValidStation(t, lastLeg.destination)

	t.end()
}))

test('journeys: via works – with detour', co(function* (t) {
	// Going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Stendal via Dessau without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const hasselbachplatzSternstrasse = '000006545'
	const stendal = '008010334'
	const dessau = '008010077'
	const dessauPassed = '8010077'
	const [journey] = yield client.journeys(hasselbachplatzSternstrasse, stendal, {
		via: dessau,
		results: 1,
		when,
		passedStations: true
	})

	t.ok(journey)

	const l = journey.legs.some(l => l.passed && l.passed.some(p => p.station.id === dessauPassed))
	t.ok(l, 'Dessau is not being passed')

	t.end()
}))

test('journeys: via works – without detour', co(function* (t) {
	// When going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Magdeburg, Universität via Magdeburg, Breiter Weg, there is *no need*
	// to change trains / no need for a "detour".
	const hasselbachplatzSternstrasse = '000006545'
	const universitaet = '000019686'
	const breiterWeg = '000013519'
	const breiterWegPassed = '13519'

	const [journey] = yield client.journeys(hasselbachplatzSternstrasse, universitaet, {
		via: breiterWeg,
		results: 1,
		when,
		passedStations: true
	})

	t.ok(journey)

	const l = journey.legs.some(l => l.passed && l.passed.some(p => p.station.id === breiterWegPassed))
	t.ok(l, 'Magdeburg, Breiter Weg is not being passed')

	t.end()
}))

test('departures at Magdeburg Hbf', co(function*(t) {
	const magdeburgHbf = '8010224'
	const deps = yield client.departures(magdeburgHbf, {
		duration: 5,
		when
	})

	t.ok(Array.isArray(deps))
	for (let dep of deps) {
		assertValidStation(t, dep.station)
		assertValidWhen(t, dep.when, when)
	}

	t.end()
}))

test('nearby Magdeburg Hbf', co(function*(t) {
	const magdeburgHbfPosition = {
		type: 'location',
		latitude: 52.130352,
		longitude: 11.626891
	}
	const nearby = yield client.nearby(magdeburgHbfPosition, {
		results: 2,
		distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsMagdeburgHbf(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	for (let n of nearby) {
		if (n.type === 'station') assertValidStation(t, n)
		else assertValidLocation(t, n)
	}

	t.end()
}))

test('journey leg details', co(function* (t) {
	const magdeburgHbf = '8010224'
	const magdeburgBuckau = '8013456'
	const [journey] = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 1, when
	})

	const p = journey.legs[0]
	t.ok(p, 'missing legs[0]')
	t.ok(p.id, 'missing legs[0].id')
	t.ok(p.line, 'missing legs[0].line')
	t.ok(p.line.name, 'missing legs[0].line.name')
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

test('locations named Magdeburg', co(function*(t) {
	const locations = yield client.locations('Magdeburg', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let l of locations) {
		if (l.type === 'station') assertValidStation(t, l)
		else assertValidLocation(t, l)
	}
	t.ok(locations.some(isMagdeburgHbf))

	t.end()
}))

test('location', co(function*(t) {
	const magdeburgBuckau = '8013456'
	const loc = yield client.location(magdeburgBuckau)

	assertValidStation(t, loc)
	t.equal(loc.id, magdeburgBuckau)

	t.end()
}))

test('radar', co(function* (t) {
	const north = 52.148364
	const west = 11.600826
	const south = 52.108486
	const east = 11.651451
	const vehicles = yield client.radar({north, west, south, east}, {
		duration: 5 * 60, when, results: 10
	})

	t.ok(Array.isArray(vehicles))
	t.ok(vehicles.length > 0)
	for (let v of vehicles) {
		assertValidLine(t, v.line)

		t.equal(typeof v.location.latitude, 'number')
		t.ok(v.location.latitude <= 57, 'vehicle is too far away')
		t.ok(v.location.latitude >= 47, 'vehicle is too far away')
		t.equal(typeof v.location.longitude, 'number')
		t.ok(v.location.longitude >= 8, 'vehicle is too far away')
		t.ok(v.location.longitude <= 14, 'vehicle is too far away')

		t.ok(Array.isArray(v.nextStops))
		for (let st of v.nextStops) {
			assertValidStopover(t, st, true)

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
			// see #28
			// todo: check if this works by now
			assertValidStation(t, f.origin, true)
			assertValidStation(t, f.destination, true)
			t.equal(typeof f.t, 'number')
		}
	}
	t.end()
}))
