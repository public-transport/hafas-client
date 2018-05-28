'use strict'

// todo
// const getStations = require('db-stations').full
const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')
const validateFptf = require('validate-fptf')

const validateLineWithoutMode = require('./validate-line-without-mode')

const co = require('./co')
const createClient = require('..')
const nahshProfile = require('../p/nahsh')
const allProducts = require('../p/nahsh/products')
const {
	assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidStopover,
	hour, createWhen, assertValidWhen
} = require('./util.js')

const when = createWhen('Europe/Berlin', 'de-DE')

const assertValidStationProducts = (t, p) => {
	t.ok(p)
	t.equal(typeof p.nationalExp, 'boolean')
	t.equal(typeof p.national, 'boolean')
	t.equal(typeof p.interregional, 'boolean')
	t.equal(typeof p.regional, 'boolean')
	t.equal(typeof p.suburban, 'boolean')
	t.equal(typeof p.bus, 'boolean')
	t.equal(typeof p.ferry, 'boolean')
	t.equal(typeof p.subway, 'boolean')
	t.equal(typeof p.tram, 'boolean')
	t.equal(typeof p.onCall, 'boolean')
}

const isKielHbf = (s) => {
	return s.type === 'station' &&
	(s.id === '8000199') &&
	s.name === 'Kiel Hbf' &&
	s.location &&
	isRoughlyEqual(s.location.latitude, 54.314982, .0005) &&
	isRoughlyEqual(s.location.longitude, 10.131976, .0005)
}

const assertIsKielHbf = (t, s) => {
	t.equal(s.type, 'station')
	t.ok(s.id === '8000199', 'id should be 8000199')
	t.equal(s.name, 'Kiel Hbf')
	t.ok(s.location)
	t.ok(isRoughlyEqual(s.location.latitude, 54.314982, .0005))
	t.ok(isRoughlyEqual(s.location.longitude, 10.131976, .0005))
}

// todo: DRY with assertValidStationProducts
// todo: DRY with other tests
const assertValidProducts = (t, products) => {
	for (let p of allProducts) {
		t.equal(typeof products[p.id], 'boolean', `product ${p.id} must be a boolean`)
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

const assertValidLine = (t, l) => { // with optional mode
	const validators = Object.assign({}, validateFptf.defaultValidators, {
		line: validateLineWithoutMode
	})
	const recurse = validateFptf.createRecurse(validators)
	try {
		recurse(['line'], l, 'line')
	} catch (err) {
		t.ifError(err)
	}
}

const test = tapePromise(tape)
const client = createClient(nahshProfile)

const kielHbf = '8000199'
const flensburg = '8000103'
const luebeckHbf = '8000237'
const husum = '8000181'
const schleswig = '8005362'

test('Kiel Hbf to Flensburg', co(function* (t) {
	const journeys = yield client.journeys(kielHbf, flensburg, {
		when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		t.equal(journey.type, 'journey')

		t.ok(Array.isArray(journey.legs))
		t.ok(journey.legs.length > 0, 'no legs')
		const leg = journey.legs[0] // todo: all legs

		assertValidStation(t, leg.origin)
		assertValidStationProducts(t, leg.origin.products)
		// todo
		// if (!(yield findStation(leg.origin.id))) {
		// 	console.error('unknown station', leg.origin.id, leg.origin.name)
		// }
		assertValidWhen(t, leg.departure, when)
		t.equal(typeof leg.departurePlatform, 'string')

		assertValidStation(t, leg.destination)
		assertValidStationProducts(t, leg.origin.products)
		// todo
		// if (!(yield findStation(leg.destination.id))) {
		// 	console.error('unknown station', leg.destination.id, leg.destination.name)
		// }
		assertValidWhen(t, leg.arrival, when)
		t.equal(typeof leg.arrivalPlatform, 'string')

		assertValidLine(t, leg.line)

		t.ok(Array.isArray(leg.passed))
		for (let stopover of leg.passed) assertValidStopover(t, stopover)

		if (journey.price) assertValidPrice(t, journey.price)
	}

	t.end()
}))

test('Kiel Hbf to Husum, Zingel 10', co(function* (t) {
	const zingel = {
		type: 'location',
		latitude: 54.475359,
		longitude: 9.050798,
		address: 'Husum, Zingel 10'
	}

	const journeys = yield client.journeys(kielHbf, zingel, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const firstLeg = journey.legs[0]
	const lastLeg = journey.legs[journey.legs.length - 1]

	assertValidStation(t, firstLeg.origin)
	assertValidStationProducts(t, firstLeg.origin.products)
	// todo
	// if (!(yield findStation(leg.origin.id))) {
	// 	console.error('unknown station', leg.origin.id, leg.origin.name)
	// }
	if (firstLeg.origin.products) assertValidProducts(t, firstLeg.origin.products)
	assertValidWhen(t, firstLeg.departure, when)
	assertValidWhen(t, firstLeg.arrival, when)
	assertValidWhen(t, lastLeg.departure, when)
	assertValidWhen(t, lastLeg.arrival, when)

	const d = lastLeg.destination
	assertValidAddress(t, d)
	t.equal(d.address, 'Husum, Zingel 10')
	t.ok(isRoughlyEqual(.0001, d.latitude, 54.475359))
	t.ok(isRoughlyEqual(.0001, d.longitude, 9.050798))

	t.end()
}))

test('Holstentor to Kiel Hbf', co(function* (t) {
	const holstentor = {
		type: 'location',
		latitude: 53.866321,
		longitude: 10.679976,
		name: 'Hansestadt Lübeck, Holstentor (Denkmal)',
		id: '970003547'
	}
	const journeys = yield client.journeys(holstentor, kielHbf, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const firstLeg = journey.legs[0]
	const lastLeg = journey.legs[journey.legs.length - 1]

	const o = firstLeg.origin
	assertValidPoi(t, o)
	t.equal(o.name, 'Hansestadt Lübeck, Holstentor (Denkmal)')
	t.ok(isRoughlyEqual(.0001, o.latitude, 53.866321))
	t.ok(isRoughlyEqual(.0001, o.longitude, 10.679976))

	assertValidWhen(t, firstLeg.departure, when)
	assertValidWhen(t, firstLeg.arrival, when)
	assertValidWhen(t, lastLeg.departure, when)
	assertValidWhen(t, lastLeg.arrival, when)

	assertValidStation(t, lastLeg.destination)
	assertValidStationProducts(t, lastLeg.destination.products)
	if (lastLeg.destination.products) assertValidProducts(t, lastLeg.destination.products)
	// todo
	// if (!(yield findStation(leg.destination.id))) {
	// 	console.error('unknown station', leg.destination.id, leg.destination.name)
	// }

	t.end()
}))

test('Husum to Lübeck Hbf with stopover at Husum', co(function* (t) {
	const [journey] = yield client.journeys(husum, luebeckHbf, {
		via: kielHbf,
		results: 1,
		when
	})

	const i1 = journey.legs.findIndex(leg => leg.destination.id === kielHbf)
	t.ok(i1 >= 0, 'no leg with Kiel Hbf as destination')

	const i2 = journey.legs.findIndex(leg => leg.origin.id === kielHbf)
	t.ok(i2 >= 0, 'no leg with Kiel Hbf as origin')
	t.ok(i2 > i1, 'leg with Kiel Hbf as origin must be after leg to it')

	t.end()
}))

test('earlier/later journeys, Kiel Hbf -> Flensburg', co(function* (t) {
	const model = yield client.journeys(kielHbf, flensburg, {
		results: 3, when
	})

	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// when and earlierThan/laterThan should be mutually exclusive
	t.throws(() => {
		client.journeys(kielHbf, flensburg, {
			when, earlierThan: model.earlierRef
		})
	})
	t.throws(() => {
		client.journeys(kielHbf, flensburg, {
			when, laterThan: model.laterRef
		})
	})

	let earliestDep = Infinity, latestDep = -Infinity
	for (let j of model) {
		const dep = +new Date(j.legs[0].departure)
		if (dep < earliestDep) earliestDep = dep
		else if (dep > latestDep) latestDep = dep
	}

	const earlier = yield client.journeys(kielHbf, flensburg, {
		results: 3,
		// todo: single journey ref?
		earlierThan: model.earlierRef
	})
	for (let j of earlier) {
		t.ok(new Date(j.legs[0].departure) < earliestDep)
	}

	const later = yield client.journeys(kielHbf, flensburg, {
		results: 3,
		// todo: single journey ref?
		laterThan: model.laterRef
	})
	for (let j of later) {
		t.ok(new Date(j.legs[0].departure) > latestDep)
	}

	t.end()
}))

test('leg details for Flensburg to Husum', co(function* (t) {
	const journeys = yield client.journeys(flensburg, husum, {
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

test('departures at Kiel Hbf', co(function* (t) {
	const deps = yield client.departures(kielHbf, {
		duration: 30, when
	})

	t.ok(Array.isArray(deps))
	for (let dep of deps) {
		assertValidStation(t, dep.station)
		assertValidStationProducts(t, dep.station.products)
		// todo
		// if (!(yield findStation(dep.station.id))) {
		// 	console.error('unknown station', dep.station.id, dep.station.name)
		// }
		if (dep.station.products) assertValidProducts(t, dep.station.products)
		assertValidWhen(t, dep.when, when)
	}

	t.end()
}))

test('nearby Kiel Hbf', co(function* (t) {
	const kielHbfPosition = {
		type: 'location',
		latitude: 54.314982,
		longitude: 10.131976
	}
	const nearby = yield client.nearby(kielHbfPosition, {
		results: 2, distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsKielHbf(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	for (let n of nearby) {
		if (n.type === 'station') assertValidStation(t, n)
		else assertValidLocation(t, n)
	}

	t.end()
}))

test('locations named Kiel', co(function* (t) {
	const locations = yield client.locations('Kiel', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let l of locations) {
		if (l.type === 'station') assertValidStation(t, l)
		else assertValidLocation(t, l)
	}
	t.ok(locations.some(isKielHbf))

	t.end()
}))

test('location', co(function* (t) {
	const loc = yield client.location(schleswig)

	assertValidStation(t, loc)
	t.equal(loc.id, schleswig)

	t.end()
}))

test('radar Kiel', co(function* (t) {
	const fakeStation = (s) => {
		const fake = Object.assign({
			products: {
				nationalExp: true,
				national: false,
				interregional: true,
				regional: false,
				suburban: true,
				bus: false,
				ferry: true,
				subway: false,
				tram: true,
				onCall: false
			}
		}, s)
		if (s.name === null) fake.name = 'foo'
		return fake
	}
	const _assertValidStation = (t, s, coordsOptional = false) => {
		assertValidStation(t, fakeStation(s), coordsOptional)
	}
	const _assertValidStopover = (t, s, coordsOptional = false) => {
		const fake = Object.assign({}, s, {
			station: fakeStation(s.station)
		})
		assertValidStopover(t, fake, coordsOptional)
	}

	const vehicles = yield client.radar({
		north: 54.4,
		west: 10.0,
		south: 54.2,
		east: 10.2
	}, {
		duration: 5 * 60, when
	})

	t.ok(Array.isArray(vehicles))
	t.ok(vehicles.length > 0)
	for (let v of vehicles) {

		// todo
		// t.ok(findStation(v.direction))
		assertValidLine(t, v.line)

		t.equal(typeof v.location.latitude, 'number')
		t.ok(v.location.latitude <= 57, 'vehicle is too far away')
		t.ok(v.location.latitude >= 51, 'vehicle is too far away')
		t.equal(typeof v.location.longitude, 'number')
		t.ok(v.location.longitude >= 7, 'vehicle is too far away')
		t.ok(v.location.longitude <= 13, 'vehicle is too far away')

		t.ok(Array.isArray(v.nextStops))
		for (let st of v.nextStops) {
			_assertValidStopover(t, st, true)

			if (st.arrival) {
				t.equal(typeof st.arrival, 'string')
				const arr = +new Date(st.arrival)
				// note that this can be an ICE train
				t.ok(isRoughlyEqual(14 * hour, +when, arr))
			}
			if (st.departure) {
				t.equal(typeof st.departure, 'string')
				const dep = +new Date(st.departure)
				t.ok(isRoughlyEqual(14 * hour, +when, dep))
			}
		}

		t.ok(Array.isArray(v.frames))
		for (let f of v.frames) {
			// todo: see #34
			_assertValidStation(t, f.origin, true)
			if (f.origin.products) {
				assertValidStationProducts(t, f.origin.products)
			}
			_assertValidStation(t, f.destination, true)
			if (f.destination.products) {
				assertValidStationProducts(t, f.destination.products)
			}
			t.equal(typeof f.t, 'number')
		}
	}
	t.end()
}))
