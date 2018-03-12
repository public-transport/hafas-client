'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')
const validateFptf = require('validate-fptf')

const co = require('./co')
const createClient = require('..')
const insaProfile = require('../p/insa')
const products = require('../p/insa/products')
const {
	assertValidStation,
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

const assertValidStationProducts = (t, p) => {
	return null; // todo
	t.ok(p)
	t.equal(typeof p.nationalExp, 'boolean')
	t.equal(typeof p.national, 'boolean')
	t.equal(typeof p.regional, 'boolean')
	t.equal(typeof p.suburban, 'boolean')
	t.equal(typeof p.tram, 'boolean')
	t.equal(typeof p.bus, 'boolean')
	// console.error(p); // todo
	t.equal(typeof p.tourismTrain, 'boolean')
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

// todo: this doesnt seem to work
// todo: DRY with assertValidStationProducts
const assertValidProducts = (t, p) => {
	for (let k of Object.keys(products)) {
		t.ok('boolean', typeof products[k], 'mode ' + k + ' must be a boolean')
	}
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
		assertValidStation(t, journey.origin)
		assertValidStationProducts(t, journey.origin.products)
		if (journey.origin.products) {
			assertValidProducts(t, journey.origin.products)
		}
		assertValidWhen(t, journey.departure, when)

		assertValidStation(t, journey.destination)
		assertValidStationProducts(t, journey.origin.products)
		if (journey.destination.products) {
			assertValidProducts(t, journey.destination.products)
		}
		assertValidWhen(t, journey.arrival, when)

		t.ok(Array.isArray(journey.legs))
		t.ok(journey.legs.length > 0, 'no legs')
		const leg = journey.legs[0]

		assertValidStation(t, leg.origin)
		assertValidStationProducts(t, leg.origin.products)
		assertValidWhen(t, leg.departure, when)
		t.equal(typeof leg.departurePlatform, 'string')

		assertValidStation(t, leg.destination)
		assertValidStationProducts(t, leg.origin.products)
		assertValidWhen(t, leg.arrival, when)
		t.equal(typeof leg.arrivalPlatform, 'string')

		assertValidLine(t, leg.line)

		t.ok(Array.isArray(leg.passed))
		for (let stopover of leg.passed) assertValidStopover(t, stopover)

		// todo
		// if (journey.price) assertValidPrice(t, journey.price)
	}

	t.end()
}))

test('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', co(function*(t) {
	const magdeburgHbf = '8010224'
	const sternStr = {
		type: 'location',
		latitude: 52.118745,
		longitude: 11.627117,
		address: '39104 Magdeburg, Sternstr. 10'
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
	assertValidStationProducts(t, firstLeg.origin.products)
	if (firstLeg.origin.products)
		assertValidProducts(t, firstLeg.origin.products)
	assertValidWhen(t, firstLeg.departure, when)
	assertValidWhen(t, firstLeg.arrival, when)
	assertValidWhen(t, lastLeg.departure, when)
	assertValidWhen(t, lastLeg.arrival, when)

	const d = lastLeg.destination
	assertValidAddress(t, d)
	t.equal(d.address, '39104 Magdeburg, Sternstr. 10')
	t.ok(isRoughlyEqual(0.0001, d.latitude, 52.118745))
	t.ok(isRoughlyEqual(0.0001, d.longitude, 11.627117))

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
	assertValidStationProducts(t, lastLeg.destination.products)
	if (lastLeg.destination.products)
		assertValidProducts(t, lastLeg.destination.products)

	t.end()
}))

test('Magdeburg-Buckau to Magdeburg-Neustadt with stopover at Magdeburg Hbf', co(function*(t) {
	const magdeburgBuckau = '8013456'
	const magdeburgNeustadt = '8010226'
	const magdeburgHbf = '8010224'
	const [journey] = yield client.journeys(magdeburgBuckau, magdeburgNeustadt, {
		via: magdeburgHbf,
		results: 1,
		when
	})

	const i1 = journey.legs.findIndex(leg => leg.destination.id === magdeburgHbf)
	t.ok(i1 >= 0, 'no leg with Magdeburg Hbf as destination')

	const i2 = journey.legs.findIndex(leg => leg.origin.id === magdeburgHbf)
	t.ok(i2 >= 0, 'no leg with Magdeburg Hbf as origin')
	t.ok(i2 > i1, 'leg with Magdeburg Hbf as origin must be after leg to it')

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
		assertValidStationProducts(t, dep.station.products)
		if (dep.station.products) {
			assertValidProducts(t, dep.station.products)
		}
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
