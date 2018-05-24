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
const oebbProfile = require('../p/oebb')
const allProducts = require('../p/oebb/products')
const {
	assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidStopover,
	hour, createWhen, assertValidWhen
} = require('./util.js')

const when = createWhen('Europe/Vienna', 'de-AT')

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

// todo
// const findStation = (id) => new Promise((yay, nay) => {
// 	const stations = getStations()
// 	stations
// 	.once('error', nay)
// 	.on('data', (s) => {
// 		if (
// 			s.id === id ||
// 			(s.additionalIds && s.additionalIds.includes(id))
// 		) {
// 			yay(s)
// 			stations.destroy()
// 		}
// 	})
// 	.once('end', yay)
// })

const isSalzburgHbf = (s) => {
	return s.type === 'station' &&
	(s.id === '008100002' || s.id === '8100002') &&
	s.name === 'Salzburg Hbf' &&
	s.location &&
	isRoughlyEqual(s.location.latitude, 47.812851, .0005) &&
	isRoughlyEqual(s.location.longitude, 13.045604, .0005)
}

const assertIsSalzburgHbf = (t, s) => {
	t.equal(s.type, 'station')
	t.ok(s.id === '008100002' || s.id === '8100002', 'id should be 8100002')
	t.equal(s.name, 'Salzburg Hbf')
	t.ok(s.location)
	t.ok(isRoughlyEqual(s.location.latitude, 47.812851, .0005))
	t.ok(isRoughlyEqual(s.location.longitude, 13.045604, .0005))
}

// todo: DRY with assertValidStationProducts
// todo: DRY with other tests
const assertValidProducts = (t, p) => {
	for (let product of allProducts) {
		product = product.id
		t.equal(typeof p[product], 'boolean', 'product ' + p + ' must be a boolean')
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

// todo: fix this upstream
// see https://github.com/public-transport/hafas-client/blob/c6e558be217667f1bcdac4a605898eb75ea80374/p/oebb/products.js#L71
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
const client = createClient(oebbProfile)

const salzburgHbf = '8100002'
const wienWestbahnhof = '1291501'
const wien = '1190100'
const klagenfurtHbf = '8100085'
const muenchenHbf = '8000261'
const grazHbf = '8100173'

test('Salzburg Hbf to Wien Westbahnhof', co(function* (t) {
	const journeys = yield client.journeys(salzburgHbf, wienWestbahnhof, {
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

test('Salzburg Hbf to 1220 Wien, Wagramer Straße 5', co(function* (t) {
	const wagramerStr = {
		type: 'location',
    	latitude: 48.236216,
    	longitude: 16.425863,
    	address: '1220 Wien, Wagramer Straße 5'
	}

	const journeys = yield client.journeys(salzburgHbf, wagramerStr, {when})

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
	t.equal(d.address, '1220 Wien, Wagramer Straße 5')
	t.ok(isRoughlyEqual(.0001, d.latitude, 48.236216))
	t.ok(isRoughlyEqual(.0001, d.longitude, 16.425863))

	t.end()
}))

test('Albertina to Salzburg Hbf', co(function* (t) {
	const albertina = {
		type: 'location',
    	latitude: 48.204699,
    	longitude: 16.368404,
    	name: 'Albertina',
    	id: '975900003'
	}
	const journeys = yield client.journeys(albertina, salzburgHbf, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const firstLeg = journey.legs[0]
	const lastLeg = journey.legs[journey.legs.length - 1]

	const o = firstLeg.origin
	assertValidPoi(t, o)
	t.equal(o.name, 'Albertina')
	t.ok(isRoughlyEqual(.0001, o.latitude, 48.204699))
	t.ok(isRoughlyEqual(.0001, o.longitude, 16.368404))

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

test('journeys: via works – with detour', co(function* (t) {
	// Going from Stephansplatz to Schottenring via Donauinsel without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const stephansplatz = '001390167'
	const schottenring = '001390163'
	const donauinsel = '001392277'
	const donauinselPassed = '922001'
	const [journey] = yield client.journeys(stephansplatz, schottenring, {
		via: donauinsel,
		results: 1,
		when,
		passedStations: true
	})

	t.ok(journey)

	const l = journey.legs.some(l => l.passed && l.passed.some(p => p.station.id === donauinselPassed))
	t.ok(l, 'Donauinsel is not being passed')

	t.end()
}))

test('journeys: via works – without detour', co(function* (t) {
	// When going from Karlsplatz to Praterstern via Museumsquartier, there is *no need*
	// to change trains / no need for a "detour".
	const karlsplatz = '001390461'
	const praterstern = '001290201'
	const museumsquartier = '001390171'
	const museumsquartierPassed = '901014'

	const [journey] = yield client.journeys(karlsplatz, praterstern, {
		via: museumsquartier,
		results: 1,
		when,
		passedStations: true
	})

	t.ok(journey)

	const l = journey.legs.some(l => l.passed && l.passed.some(p => p.station.id === museumsquartierPassed))
	t.ok(l, 'Weihburggasse is not being passed')

	t.end()
}))

test('earlier/later journeys, Salzburg Hbf -> Wien Westbahnhof', co(function* (t) {
	const model = yield client.journeys(salzburgHbf, wienWestbahnhof, {
		results: 3, when
	})

	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// when and earlierThan/laterThan should be mutually exclusive
	t.throws(() => {
		client.journeys(salzburgHbf, wienWestbahnhof, {
			when, earlierThan: model.earlierRef
		})
	})
	t.throws(() => {
		client.journeys(salzburgHbf, wienWestbahnhof, {
			when, laterThan: model.laterRef
		})
	})

	let earliestDep = Infinity, latestDep = -Infinity
	for (let j of model) {
		const dep = +new Date(j.legs[0].departure)
		if (dep < earliestDep) earliestDep = dep
		else if (dep > latestDep) latestDep = dep
	}

	const earlier = yield client.journeys(salzburgHbf, wienWestbahnhof, {
		results: 3,
		// todo: single journey ref?
		earlierThan: model.earlierRef
	})
	for (let j of earlier) {
		t.ok(new Date(j.legs[0].departure) < earliestDep)
	}

	const later = yield client.journeys(salzburgHbf, wienWestbahnhof, {
		results: 3,
		// todo: single journey ref?
		laterThan: model.laterRef
	})
	for (let j of later) {
		t.ok(new Date(j.legs[0].departure) > latestDep)
	}

	t.end()
}))

test('leg details for Wien Westbahnhof to München Hbf', co(function* (t) {
	const journeys = yield client.journeys(wienWestbahnhof, muenchenHbf, {
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

test('departures at Salzburg Hbf', co(function* (t) {
	const deps = yield client.departures(salzburgHbf, {
		duration: 5, when
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

test('nearby Salzburg Hbf', co(function* (t) {
	const salzburgHbfPosition = {
		type: 'location',
		longitude: 13.045604,
		latitude: 47.812851
	}
	const nearby = yield client.nearby(salzburgHbfPosition, {
		results: 2, distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsSalzburgHbf(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	for (let n of nearby) {
		if (n.type === 'station') assertValidStation(t, n)
		else assertValidLocation(t, n)
	}

	t.end()
}))

test('locations named Salzburg', co(function* (t) {
	const locations = yield client.locations('Salzburg', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let l of locations) {
		if (l.type === 'station') assertValidStation(t, l)
		else assertValidLocation(t, l)
	}
	t.ok(locations.some(isSalzburgHbf))

	t.end()
}))

test('location', co(function* (t) {
	const loc = yield client.location(grazHbf)

	assertValidStation(t, loc)
	t.equal(loc.id, grazHbf)

	t.end()
}))

test('radar Salzburg', co(function* (t) {
	const vehicles = yield client.radar({
		north: 47.827203,
		west: 13.001261,
		south: 47.773278,
		east: 13.07562
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
		t.ok(v.location.latitude <= 52, 'vehicle is too far away')
		t.ok(v.location.latitude >= 42, 'vehicle is too far away')
		t.equal(typeof v.location.longitude, 'number')
		t.ok(v.location.longitude >= 10, 'vehicle is too far away')
		t.ok(v.location.longitude <= 16, 'vehicle is too far away')

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
				t.ok(isRoughlyEqual(14 * hour, +when, dep))
			}
		}

		t.ok(Array.isArray(v.frames))
		for (let f of v.frames) {
			assertValidStation(t, f.origin, true)
			// can contain stations in germany which don't have a products property, would break
			// assertValidStationProducts(t, f.origin.products)
			assertValidStation(t, f.destination, true)
			// can contain stations in germany which don't have a products property, would break
			// assertValidStationProducts(t, f.destination.products)
			t.equal(typeof f.t, 'number')
		}
	}
	t.end()
}))
