'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const co = require('./lib/co')
const createClient = require('..')
const insaProfile = require('../p/insa')
const products = require('../p/insa/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const validate = createValidate(cfg, {})

const test = tapePromise(tape)
const client = createClient(insaProfile)

const magdeburgHbf = '8010224'
const magdeburgBuckau = '8013456'
const hasselbachplatzSternstrasse = '000006545'
const stendal = '008010334'
const dessau = '008010077'

test('journeys – Magdeburg Hbf to Magdeburg-Buckau', co(function* (t) {
	const journeys = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 3, when, passedStations: true
	})

	yield testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau
	})
	t.end()
}))

// todo: journeys, only one product
// todo: journeys, fails with no product

test('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', co(function*(t) {
	const sternStr = {
		type: 'location',
		latitude: 52.118414,
		longitude: 11.422332,
		address: 'Magdeburg - Altenstadt, Sternstraße 10'
	}

	const journeys = yield client.journeys(magdeburgHbf, sternStr, {
		when
	})
	validate(t, journeys, 'journeys', 'journeys')

	for (let journey of journeys) {
		const i = journey.legs.length - 1
		const d = journey.legs[i].destination
		t.equal(d.address, sternStr.address)
		t.ok(isRoughlyEqual(0.0001, d.latitude, sternStr.latitude))
		t.ok(isRoughlyEqual(0.0001, d.longitude, sternStr.longitude))
	}
	t.end()
}))

test('Kloster Unser Lieben Frauen to Magdeburg Hbf', co(function*(t) {
	const kloster = {
		type: 'location',
		id: '970012223',
		name: 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)',
		latitude: 52.127601,
		longitude: 11.636437
	}

	const journeys = yield client.journeys(magdeburgHbf, kloster, {
		when
	})
	validate(t, journeys, 'journeys', 'journeys')

	for (let journey of journeys) {
		const i = journey.legs.length - 1
		const d = journey.legs[i].destination
		t.equal(d.id, kloster.id)
		t.equal(d.name, kloster.name)
		t.ok(isRoughlyEqual(0.0001, d.latitude, kloster.latitude))
		t.ok(isRoughlyEqual(0.0001, d.longitude, kloster.longitude))
	}
	t.end()
}))

test('journeys: via works – with detour', co(function* (t) {
	// Going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Stendal
	// via Dessau without detour is currently impossible. We check if the routing
	// engine computes a detour.
	const journeys = yield client.journeys(hasselbachplatzSternstrasse, stendal, {
		via: dessau,
		results: 1,
		when,
		passedStations: true
	})

	validate(t, journeys, 'journeys', 'journeys')

	const leg = journeys[0].legs.some((leg) => {
		return leg.passed && leg.passed.some((passed) => {
			return (
				passed.station.id === '8010077' || // todo: trim IDs
				passed.station.id === dessau
			)
		})
	})
	t.ok(leg, 'Dessau is not being passed')

	t.end()
}))

test('earlier/later journeys', co(function* (t) {
	const model = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 3, when
	})

	// todo: move to journeys validator?
	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// when and earlierThan/laterThan should be mutually exclusive
	t.throws(() => {
		client.journeys(magdeburgHbf, magdeburgBuckau, {
			when, earlierThan: model.earlierRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})
	t.throws(() => {
		client.journeys(magdeburgHbf, magdeburgBuckau, {
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

	const earlier = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 3,
		// todo: single journey ref?
		earlierThan: model.earlierRef
	})
	for (let j of earlier) {
		t.ok(new Date(j.legs[0].departure) < earliestDep)
	}

	const later = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 3,
		// todo: single journey ref?
		laterThan: model.laterRef
	})
	for (let j of later) {
		t.ok(new Date(j.legs[0].departure) > latestDep)
	}

	t.end()
}))

test('journey leg details', co(function* (t) {
	const journeys = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 1, when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	validate(t, leg, 'journeyLeg', 'leg')
	t.end()
}))

test('departures at Magdeburg Hbf', co(function*(t) {
	const deps = yield client.departures(magdeburgHbf, {
		duration: 5,
		when
	})

	validate(t, deps, 'departures', 'departures')
	for (let i = 0; i < deps.length; i++) {
		const dep = deps[i]
		const name = `deps[${i}]`

		// todo: fix this
		// t.equal(dep.station.name, 'Magdeburg Hbf', name + '.station.name is invalid')
		// t.equal(dep.station.id, magdeburgHbf, name + '.station.id is invalid')
	}
	// todo: move into deps validator
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))

	t.end()
}))

test('departures with station object', co(function* (t) {
	const deps = yield client.departures({
		type: 'station',
		id: magdeburgHbf,
		name: 'Magdeburg Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
}))

// todo: nearby

test('locations named Magdeburg', co(function*(t) {
	const locations = yield client.locations('Magdeburg', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.some((loc) => {
		return (
			loc.id === '008010224' || // todo: trim IDs
			loc.id === magdeburgHbf
		)
	}))

	t.end()
}))

test('location Magdeburg-Buckau', co(function* (t) {
	const s = yield client.location(magdeburgBuckau)

	validate(t, s, 'station', 'station')
	t.equal(s.id, magdeburgBuckau)

	t.end()
}))

test('radar', co(function* (t) {
	const vehicles = yield client.radar({
		north: 52.148364,
		west: 11.600826,
		south: 52.108486,
		east: 11.651451
	}, {
		duration: 5 * 60, when, results: 10
	})

	const customCfg = Object.assign({}, cfg, {
		stationCoordsOptional: true, // see #28
	})
	const validate = createValidate(customCfg, {})
	validate(t, vehicles, 'movements', 'vehicles')

	t.end()
}))
