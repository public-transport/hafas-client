'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const co = require('./lib/co')
const createClient = require('..')
const nahshProfile = require('../p/nahsh')
const products = require('../p/nahsh/products')
const {
	line: createValidateLine,
	station: createValidateStation
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const _validateLine = createValidateLine(cfg)
const validateLine = (validate, l, name) => {
	if (l && l.product === 'onCall') {
		// skip line validation
		// https://github.com/derhuerst/hafas-client/issues/8#issuecomment-355839965
		l = Object.assign({}, l)
		l.mode = 'taxi'
	}
	_validateLine(validate, l, name)
}

const validate = createValidate(cfg, {
	line: validateLine
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
const client = createClient(nahshProfile)

const kielHbf = '8000199'
const flensburg = '8000103'
const holstentor = '970003547'
const luebeckHbf = '8000237'
const husum = '8000181'
const schleswig = '8005362'

test('journeys – Kiel Hbf to Flensburg', co(function* (t) {
	const journeys = yield client.journeys(kielHbf, flensburg, {
		results: 3, when, passedStations: true
	})

	yield testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: kielHbf,
		toId: flensburg
	})

	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]
		// todo: find a journey where there pricing info is always available
		if (j.price) assertValidPrice(t, j.price, `journeys[${i}].price`)
	}

	t.end()
}))

// todo: journeys, only one product
// todo: journeys, fails with no product

test('Kiel Hbf to Husum, Zingel 10', co(function* (t) {
	const latitude = 54.475359
	const longitude = 9.050798
	const zingel = {
		type: 'location',
		address: 'Husum, Zingel 10',
		latitude, longitude
	}
	const journeys = yield client.journeys(kielHbf, zingel, {when})

	validate(t, journeys, 'journeys', 'journeys')

	const i = journeys[0].legs.length - 1
	const d = journeys[0].legs[i].destination
	const name = `journeys[0].legs[${i}].destination`

	t.strictEqual(d.address, 'Husum, Zingel 10', name + '.address is invalid')
	t.ok(isRoughlyEqual(.0001, d.latitude, latitude), name + '.latitude is invalid')
	t.ok(isRoughlyEqual(.0001, d.longitude, longitude), name + '.longitude is invalid')

	t.end()
}))

test('Kiel Hbf to Holstentor', co(function* (t) {
	const latitude = 53.866321
	const longitude = 10.679976
	const name = 'Hansestadt Lübeck, Holstentor (Denkmal)'
	const journeys = yield client.journeys(kielHbf, {
		type: 'location',
		id: holstentor,
		name,
		latitude, longitude
	}, {when})

	validate(t, journeys, 'journeys', 'journeys')

	const i = journeys[0].legs.length - 1
	const d = journeys[0].legs[i].destination
	const k = `journeys[0].legs[${i}].destination`

	t.strictEqual(d.id, holstentor, k + '.id is invalid')
	t.strictEqual(d.name, name, k + '.name is invalid')
	t.ok(isRoughlyEqual(.0001, d.latitude, latitude), k + '.latitude is invalid')
	t.ok(isRoughlyEqual(.0001, d.longitude, longitude), k + '.longitude is invalid')

	t.end()
}))

test('Husum to Lübeck Hbf with stopover at Kiel Hbf', co(function* (t) {
	const journeys = yield client.journeys(husum, luebeckHbf, {
		via: kielHbf,
		results: 1, when, passedStations: true
	})

	validate(t, journeys, 'journeys', 'journeys')

	const leg = journeys[0].legs.some((leg) => {
		return leg.passed && leg.passed.some((passed) => {
			return passed.station.id === kielHbf
		})
	})
	t.ok(leg, 'Kiel Hbf is not being passed')

	t.end()
}))

test('earlier/later journeys, Kiel Hbf -> Flensburg', co(function* (t) {
	const model = yield client.journeys(kielHbf, flensburg, {
		results: 3, when
	})

	// todo: move to journeys validator?
	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// when and earlierThan/laterThan should be mutually exclusive
	t.throws(() => {
		client.journeys(kielHbf, flensburg, {
			when, earlierThan: model.earlierRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})
	t.throws(() => {
		client.journeys(kielHbf, flensburg, {
			when, laterThan: model.laterRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
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

test('journey leg details for Flensburg to Husum', co(function* (t) {
	const journeys = yield client.journeys(flensburg, husum, {
		results: 1, when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	validate(t, leg, 'journeyLeg', 'leg')
	t.end()
}))

test('departures at Kiel Hbf', co(function* (t) {
	const deps = yield client.departures(kielHbf, {
		duration: 30, when
	})

	validate(t, deps, 'departures', 'departures')
	for (let i = 0; i < deps.length; i++) {
		const dep = deps[i]
		const name = `deps[${i}]`

		// todo: fix this
		// t.equal(dep.station.name, 'Kiel Hauptbahnhof', name + '.station.name is invalid')
		// t.equal(dep.station.id, kielHbf, name + '.station.id is invalid')
	}
	// todo: move into deps validator
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))

	t.end()
}))

test('departures with station object', co(function* (t) {
	const deps = yield client.departures({
		type: 'station',
		id: kielHbf,
		name: 'Kiel Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
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

	validate(t, nearby, 'locations', 'nearby')

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	t.equal(nearby[0].id, kielHbf)
	t.equal(nearby[0].name, 'Kiel Hbf')
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	t.end()
}))

test('locations named Kiel', co(function* (t) {
	const locations = yield client.locations('Kiel', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.some(l => l.id === kielHbf))

	t.end()
}))

test('location', co(function* (t) {
	const s = yield client.location(kielHbf)

	validate(t, s, 'station', 'station')
	t.equal(s.id, kielHbf)

	t.end()
}))

test('radar', co(function* (t) {
	const vehicles = yield client.radar({
		north: 54.4,
		west: 10.0,
		south: 54.2,
		east: 10.2
	}, {
		duration: 5 * 60, when
	})

	// todo: cfg.stationProductsOptional option
	const allProducts = products.reduce((acc, p) => (acc[p.id] = true, acc), {})
	const validateStation = createValidateStation(cfg)
	const validate = createValidate(cfg, {
		station: (validate, s, name) => {
			s = Object.assign({
				products: allProducts // todo: fix station.products
			}, s)
			if (!s.name) s.name = 'foo' // todo, see #34
			validateStation(validate, s, name)
		}
	})
	validate(t, vehicles, 'movements', 'vehicles')

	t.end()
}))
