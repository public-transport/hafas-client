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
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')

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
const luebeckHbf = '8000237'
const husum = '8000181'
const schleswig = '8005362'

test('journeys – Kiel Hbf to Flensburg', co(function* (t) {
	const journeys = yield client.journeys(kielHbf, flensburg, {
		results: 3,
		departure: when,
		passedStations: true
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

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: kielHbf,
		toId: flensburg,
		when,
		products
	})
	t.end()
})

test('Kiel Hbf to Husum, Zingel 10', co(function* (t) {
	const zingel = {
		type: 'location',
		address: 'Husum, Zingel 10',
		latitude: 54.475359,
		longitude: 9.050798
	}
	const journeys = yield client.journeys(kielHbf, zingel, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: kielHbf,
		to: zingel
	})
	t.end()
}))

test('Kiel Hbf to Holstentor', co(function* (t) {
	const holstentor = {
		type: 'location',
		id: '970003547',
		name: 'Hansestadt Lübeck, Holstentor (Denkmal)',
		latitude: 53.866321,
		longitude: 10.679976
	}
	const journeys = yield client.journeys(kielHbf, holstentor, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: kielHbf,
		to: holstentor
	})
	t.end()
}))

test('Husum to Lübeck Hbf with stopover at Kiel Hbf', co(function* (t) {
	const journeys = yield client.journeys(husum, luebeckHbf, {
		via: kielHbf,
		results: 1,
		departure: when,
		passedStations: true
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
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: kielHbf,
		toId: flensburg
	})

	t.end()
}))

// todo: with detour test
// todo: without detour test

test('journey leg details for Flensburg to Husum', co(function* (t) {
	const journeys = yield client.journeys(flensburg, husum, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	validate(t, leg, 'journeyLeg', 'leg')
	t.end()
}))

test('departures at Kiel Räucherei', co(function* (t) {
	const kielRaeucherei = '3440091'

	const departures = yield client.departures(kielRaeucherei, {
		duration: 30, when
	})

	yield testDepartures({
		test: t,
		departures,
		validate,
		id: kielRaeucherei
	})
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

test('station', co(function* (t) {
	const s = yield client.station(kielHbf)

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
