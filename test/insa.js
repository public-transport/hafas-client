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
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testJourneysWithDetour = require('./lib/journeys-with-detour')

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
const leiterstr = '7464'
const hasselbachplatzSternstrasse = '000006545'
const stendal = '008010334'
const dessau = '008010077'

test('journeys – Magdeburg Hbf to Magdeburg-Buckau', co(function* (t) {
	const journeys = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 3,
		departure: when,
		passedStations: true
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

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau,
		when,
		products
	})
	t.end()
})

test('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', co(function*(t) {
	const sternStr = {
		type: 'location',
		address: 'Magdeburg - Altenstadt, Sternstraße 10',
		latitude: 52.118414,
		longitude: 11.422332
	}

	const journeys = yield client.journeys(magdeburgHbf, sternStr, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: magdeburgHbf,
		to: sternStr
	})
	t.end()
}))

test('Magdeburg Hbf to Kloster Unser Lieben Frauen', co(function*(t) {
	const kloster = {
		type: 'location',
		id: '970012223',
		name: 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)',
		latitude: 52.127601,
		longitude: 11.636437
	}
	const journeys = yield client.journeys(magdeburgHbf, kloster, {
		results: 3,
		departure: when
	})

	yield testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: magdeburgHbf,
		to: kloster
	})
	t.end()
}))

test('journeys: via works – with detour', co(function* (t) {
	// Going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Stendal
	// via Dessau without detour is currently impossible. We check if the routing
	// engine computes a detour.
	const journeys = yield client.journeys(hasselbachplatzSternstrasse, stendal, {
		via: dessau,
		results: 1,
		departure: when,
		passedStations: true
	})

	yield testJourneysWithDetour({
		test: t,
		journeys,
		validate,
		detourIds: ['8010077', dessau] // todo: trim IDs
	})
	t.end()
}))

// todo: without detour

test('earlier/later journeys', co(function* (t) {
	yield testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau
	})

	t.end()
}))

test('journey leg details', co(function* (t) {
	const journeys = yield client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.id, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const leg = yield client.journeyLeg(p.id, p.line.name, {when})

	validate(t, leg, 'journeyLeg', 'leg')
	t.end()
}))

test('departures at Magdeburg Leiterstr.', co(function*(t) {
	const departures = yield client.departures(leiterstr, {
		duration: 5, when
	})

	yield testDepartures({
		test: t,
		departures,
		validate,
		id: leiterstr
	})
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

test('station Magdeburg-Buckau', co(function* (t) {
	const s = yield client.station(magdeburgBuckau)

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
