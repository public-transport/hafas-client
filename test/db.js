'use strict'

const getStations = require('db-stations').full
const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const co = require('./co')
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
	createWhen, assertValidWhen
} = require('./util.js')

const when = createWhen('Europe/Berlin', 'de-DE')

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
	(s.id === '008011167' || s.id === jungfernh) &&
	s.name === 'Berlin Jungfernheide' &&
	s.location &&
	isRoughlyEqual(s.location.latitude, 52.530408, .0005) &&
	isRoughlyEqual(s.location.longitude, 13.299424, .0005)
}

const assertIsJungfernheide = (t, s) => {
	t.equal(s.type, 'station')
	t.ok(s.id === '008011167' || s.id === jungfernh, 'id should be 8011167')
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

const jungfernh = '8011167'
const berlinHbf = '8011160'
const münchenHbf = '8000261'
const hannoverHbf = '8000152'
const regensburgHbf = '8000309'

test('Berlin Jungfernheide to München Hbf', co(function* (t) {
	const journeys = yield client.journeys(jungfernh, münchenHbf, {
		when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		t.equal(journey.type, 'journey')

		assertValidStation(t, journey.origin)
		assertValidStationProducts(t, journey.origin.products)
		if (!(yield findStation(journey.origin.id))) {
			console.error('unknown station', journey.origin.id, journey.origin.name)
		}
		if (journey.origin.products) {
			assertValidProducts(t, journey.origin.products)
		}
		assertValidWhen(t, journey.departure, when)

		assertValidStation(t, journey.destination)
		assertValidStationProducts(t, journey.origin.products)
		if (!(yield findStation(journey.origin.id))) {
			console.error('unknown station', journey.destination.id, journey.destination.name)
		}
		if (journey.destination.products) {
			assertValidProducts(t, journey.destination.products)
		}
		assertValidWhen(t, journey.arrival, when)

		t.ok(Array.isArray(journey.legs))
		t.ok(journey.legs.length > 0, 'no legs')
		const leg = journey.legs[0]

		assertValidStation(t, leg.origin)
		assertValidStationProducts(t, leg.origin.products)
		if (!(yield findStation(leg.origin.id))) {
			console.error('unknown station', leg.origin.id, leg.origin.name)
		}
		assertValidWhen(t, leg.departure, when)
		t.equal(typeof leg.departurePlatform, 'string')

		assertValidStation(t, leg.destination)
		assertValidStationProducts(t, leg.origin.products)
		if (!(yield findStation(leg.destination.id))) {
			console.error('unknown station', leg.destination.id, leg.destination.name)
		}
		assertValidWhen(t, leg.arrival, when)
		t.equal(typeof leg.arrivalPlatform, 'string')

		assertValidLine(t, leg.line)

		t.ok(Array.isArray(leg.passed))
		for (let stopover of leg.passed) assertValidStopover(t, stopover)

		if (journey.price) assertValidPrice(t, journey.price)
	}

	t.end()
}))

test('Berlin Jungfernheide to Torfstraße 17', co(function* (t) {
	const journeys = yield client.journeys(jungfernh, {
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
	assertValidWhen(t, leg.departure, when)
	assertValidWhen(t, leg.arrival, when)

	const d = leg.destination
	assertValidAddress(t, d)
	t.equal(d.address, 'Torfstraße 17')
	t.ok(isRoughlyEqual(.0001, d.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, d.longitude, 13.3491223))

	t.end()
}))

test('Berlin Jungfernheide to ATZE Musiktheater', co(function* (t) {
	const journeys = yield client.journeys(jungfernh, {
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
	assertValidWhen(t, leg.departure, when)
	assertValidWhen(t, leg.arrival, when)

	const d = leg.destination
	assertValidPoi(t, d)
	t.equal(d.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, d.latitude, 52.542399))
	t.ok(isRoughlyEqual(.0001, d.longitude, 13.350402))

	t.end()
}))

test('journeys: via works – with detour', co(function* (t) {
	// Going from Westhafen to Wedding via Württembergalle without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const westhafen = '008089116'
	const wedding = '008089131'
	const württembergallee = '731084'
	const [journey] = yield client.journeys(westhafen, wedding, {
		via: württembergallee,
		results: 1,
		when,
		passedStations: true
	})

	t.ok(journey)

	const l = journey.legs.some(l => l.passed && l.passed.some(p => p.station.id === württembergallee))
	t.ok(l, 'Württembergalle is not being passed')

	t.end()
}))

test('journeys: via works – without detour', co(function* (t) {
	// When going from Ruhleben to Zoo via Kastanienallee, there is *no need*
	// to change trains / no need for a "detour".
	const ruhleben = '000731058'
	const zoo = '008010406'
	const kastanienallee = '730983'
	const [journey] = yield client.journeys(ruhleben, zoo, {
		via: kastanienallee,
		results: 1,
		when,
		passedStations: true
	})

	t.ok(journey)

	const l = journey.legs.some(l => l.passed && l.passed.some(p => p.station.id === kastanienallee))
	t.ok(l, 'Kastanienallee is not being passed')

	t.end()
}))

test('earlier/later journeys, Jungfernheide -> München Hbf', co(function* (t) {
	const model = yield client.journeys(jungfernh, münchenHbf, {
		results: 3, when
	})

	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// when and earlierThan/laterThan should be mutually exclusive
	t.throws(() => {
		client.journeys(jungfernh, münchenHbf, {
			when, earlierThan: model.earlierRef
		})
	})
	t.throws(() => {
		client.journeys(jungfernh, münchenHbf, {
			when, laterThan: model.laterRef
		})
	})

	let earliestDep = Infinity, latestDep = -Infinity
	for (let j of model) {
		const dep = +new Date(j.departure)
		if (dep < earliestDep) earliestDep = dep
		else if (dep > latestDep) latestDep = dep
	}

	const earlier = yield client.journeys(jungfernh, münchenHbf, {
		results: 3,
		// todo: single journey ref?
		earlierThan: model.earlierRef
	})
	for (let j of earlier) {
		t.ok(new Date(j.departure) < earliestDep)
	}

	const later = yield client.journeys(jungfernh, münchenHbf, {
		results: 3,
		// todo: single journey ref?
		laterThan: model.laterRef
	})
	for (let j of later) {
		t.ok(new Date(j.departure) > latestDep)
	}

	t.end()
}))

test('departures at Berlin Jungfernheide', co(function* (t) {
	const deps = yield client.departures(jungfernh, {
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
		assertValidWhen(t, dep.when, when)
	}

	t.end()
}))

test('departures with station object', co(function* (t) {
	yield client.departures({
		type: 'station',
		id: jungfernh,
		name: 'Berlin Jungfernheide',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	t.ok('did not fail')
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

test('locations named Jungfernheide', co(function* (t) {
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

test('location', co(function* (t) {
	const loc = yield client.location(regensburgHbf)

	assertValidStation(t, loc)
	t.equal(loc.id, regensburgHbf)

	t.ok(Array.isArray(loc.lines))
	if (Array.isArray(loc.lines)) {
		for (let line of loc.lines) assertValidLine(t, line)
	}

	t.end()
}))
