'use strict'

const stations = require('vbb-stations-autocomplete')
const a = require('assert')
const shorten = require('vbb-short-station-name')
const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const co = require('./lib/co')
const createClient = require('..')
const vbbProfile = require('../p/vbb')
const products = require('../p/vbb/products')
const {
	station: createValidateStation,
	line: createValidateLine,
	journeyLeg: createValidateJourneyLeg,
	departure: createValidateDeparture,
	movement: _validateMovement
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testJourneysWithDetour = require('./lib/journeys-with-detour')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const validateDirection = (dir, name) => {
	if (!stations(dir, true, false)[0]) {
		console.error(name + `: station "${dir}" is unknown`)
	}
}

// todo: coordsOptional = false
const _validateStation = createValidateStation(cfg)
const validateStation = (validate, s, name) => {
	_validateStation(validate, s, name)
	// todo: find station by ID
	a.equal(s.name, shorten(s.name), name + '.name must be shortened')
}

const _validateLine = createValidateLine(cfg)
const validateLine = (validate, l, name) => {
	_validateLine(validate, l, name)
	if (l.symbol !== null) {
		a.strictEqual(typeof l.symbol, 'string', name + '.symbol must be a string')
		a.ok(l.symbol, name + '.symbol must not be empty')
	}
	if (l.nr !== null) {
		a.strictEqual(typeof l.nr, 'number', name + '.nr must be a string')
		a.ok(l.nr, name + '.nr must not be empty')
	}
	if (l.metro !== null) {
		a.strictEqual(typeof l.metro, 'boolean', name + '.metro must be a boolean')
	}
	if (l.express !== null) {
		a.strictEqual(typeof l.express, 'boolean', name + '.express must be a boolean')
	}
	if (l.night !== null) {
		a.strictEqual(typeof l.night, 'boolean', name + '.night must be a boolean')
	}
}

const _validateJourneyLeg = createValidateJourneyLeg(cfg)
const validateJourneyLeg = (validate, l, name) => {
	_validateJourneyLeg(validate, l, name)
	if (l.mode !== 'walking') {
		validateDirection(l.direction, name + '.direction')
	}
}

const _validateDeparture = createValidateDeparture(cfg)
const validateDeparture = (validate, dep, name) => {
	_validateDeparture(validate, dep, name)
	validateDirection(dep.direction, name + '.direction')
}

const validateMovement = (validate, m, name) => {
	_validateMovement(validate, m, name)
	validateDirection(m.direction, name + '.direction')
}

const validate = createValidate(cfg, {
	station: validateStation,
	line: validateLine,
	journeyLeg: validateJourneyLeg,
	departure: validateDeparture,
	movement: validateMovement
})

const test = tapePromise(tape)
const client = createClient(vbbProfile)

const amrumerStr = '900000009101'
const spichernstr = '900000042101'
const bismarckstr = '900000024201'
const westhafen = '900000001201'
const wedding = '900000009104'
const württembergallee = '900000026153'

test('journeys – Spichernstr. to Bismarckstr.', co(function* (t) {
	const journeys = yield client.journeys(spichernstr, bismarckstr, {
		results: 3,
		departure: when,
		passedStations: true
	})

	yield testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: spichernstr,
		toId: bismarckstr
	})
	// todo: find a journey where there ticket info is always available

	t.end()
}))

test('journeys – only subway', co(function* (t) {
	const journeys = yield client.journeys(spichernstr, bismarckstr, {
		results: 20,
		departure: when,
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

	validate(t, journeys, 'journeys', 'journeys')
	t.ok(journeys.length > 1)
	for (let i = 0; i < journeys.length; i++) {
		const journey = journeys[i]
		for (let j = 0; j < journey.legs.length; j++) {
			const leg = journey.legs[j]

			const name = `journeys[${i}].legs[${i}].line`
			if (leg.line) {
				t.equal(leg.line.mode, 'train', name + '.mode is invalid')
				t.equal(leg.line.product, 'subway', name + '.product is invalid')
			}
			t.ok(journey.legs.some(l => l.line), name + '.legs has no subway leg')
		}
	}

	t.end()
}))

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: spichernstr,
		toId: bismarckstr,
		when,
		products
	})
	t.end()
})

test('earlier/later journeys', co(function* (t) {
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: spichernstr,
		toId: bismarckstr
	})

	t.end()
}))

test('journey leg details', co(function* (t) {
	const journeys = yield client.journeys(spichernstr, amrumerStr, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	validate(t, leg, 'journeyLeg', 'leg')
	t.end()
}))

test('journeys – station to address', co(function* (t) {
	const torfstr = {
		type: 'location',
		address: '13353 Berlin-Wedding, Torfstr. 17',
		latitude: 52.541797,
		longitude: 13.350042
	}
	const journeys = yield client.journeys(spichernstr, torfstr, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: spichernstr,
		to: torfstr
	})
	t.end()
}))

test('journeys – station to POI', co(function* (t) {
	const atze = {
		type: 'location',
		id: '900980720',
		name: 'Berlin, Atze Musiktheater für Kinder',
		latitude: 52.543333,
		longitude: 13.351686
	}
	const journeys = yield client.journeys(spichernstr, atze, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: spichernstr,
		to: atze
	})
	t.end()
}))

test('journeys: via works – with detour', co(function* (t) {
	// Going from Westhafen to Wedding via Württembergalle without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const journeys = yield client.journeys(westhafen, wedding, {
		via: württembergallee,
		results: 1,
		departure: when,
		passedStations: true
	})

	yield testJourneysWithDetour({
		test: t,
		journeys,
		validate,
		detourIds: [württembergallee]
	})
	t.end()
}))

// todo: without detour test

test('departures', co(function* (t) {
	const departures = yield client.departures(spichernstr, {
		duration: 5, when
	})

	yield testDepartures({
		test: t,
		departures,
		validate,
		id: spichernstr
	})
	t.end()
}))

test('departures with station object', co(function* (t) {
	const deps = yield client.departures({
		type: 'station',
		id: spichernstr,
		name: 'U Spichernstr',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
}))

test('departures at 7-digit station', co(function* (t) {
	const eisenach = '8010097' // see derhuerst/vbb-hafas#22
	yield client.departures(eisenach, {when})
	t.pass('did not fail')
	t.end()
}))

test('nearby', co(function* (t) {
	const berlinerStr = '900000044201'
	const landhausstr = '900000043252'

	// Berliner Str./Bundesallee
	const nearby = yield client.nearby({
		type: 'location',
		latitude: 52.4873452,
		longitude: 13.3310411
	}, {distance: 200})

	validate(t, nearby, 'locations', 'nearby')

	t.equal(nearby[0].id, berlinerStr)
	t.equal(nearby[0].name, 'U Berliner Str.')
	t.ok(nearby[0].distance > 0)
	t.ok(nearby[0].distance < 100)

	t.equal(nearby[1].id, landhausstr)
	t.equal(nearby[1].name, 'Landhausstr.')
	t.ok(nearby[1].distance > 100)
	t.ok(nearby[1].distance < 200)

	t.end()
}))

test('locations', co(function* (t) {
	const locations = yield client.locations('Alexanderplatz', {results: 20})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.find(s => !s.name && s.address)) // addresses

	t.end()
}))

test('station', co(function* (t) {
	const s = yield client.station(spichernstr)

	validate(t, s, 'station', 'station')
	t.equal(s.id, spichernstr)

	t.end()
}))

test('radar', co(function* (t) {
	const vehicles = yield client.radar({
		north: 52.52411,
		west: 13.41002,
		south: 52.51942,
		east: 13.41709
	}, {
		duration: 5 * 60, when
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
}))
