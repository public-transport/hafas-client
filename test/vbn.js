'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('..')
const vbnProfile = require('../p/vbn')
const products = require('../p/vbn/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const validate = createValidate(cfg, {})

const test = tapePromise(tape)
const client = createClient(vbnProfile, 'public-transport/hafas-client:test')

const bremenHbf = '8000050'
const bremerhavenHbf = '8000051'

test.only('journeys – Bremen Hbf to Bremerhaven Hbf', async (t) => {
	const journeys = await client.journeys(bremenHbf, bremerhavenHbf, {
		results: 3,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		journeys,
		validate,
		fromId: bremenHbf,
		toId: bremerhavenHbf
	})
	t.end()
})

// todo: journeys, only one product

test.skip('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: bremenHbf,
		toId: bremerhavenHbf,
		when,
		products
	})
	t.end()
})

test.skip('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', co(function*(t) {
	const sternStr = {
		type: 'location',
		address: 'Magdeburg - Altenstadt, Sternstraße 10',
		latitude: 52.118414,
		longitude: 11.422332
	}

	const journeys = await client.journeys(bremenHbf, sternStr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		journeys,
		validate,
		fromId: bremenHbf,
		to: sternStr
	})
	t.end()
})

test.skip('Magdeburg Hbf to Kloster Unser Lieben Frauen', co(function*(t) {
	const kloster = {
		type: 'location',
		id: '970012223',
		name: 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)',
		latitude: 52.127601,
		longitude: 11.636437
	}
	const journeys = await client.journeys(bremenHbf, kloster, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		journeys,
		validate,
		fromId: bremenHbf,
		to: kloster
	})
	t.end()
})

test.skip('journeys: via works – with detour', async (t) => {
	// Going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Stendal
	// via Dessau without detour is currently impossible. We check if the routing
	// engine computes a detour.
	const journeys = await client.journeys(hasselbachplatzSternstrasse, stendal, {
		via: dessau,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		journeys,
		validate,
		detourIds: ['8010077', dessau] // todo: trim IDs
	})
	t.end()
})

// todo: without detour

test.skip('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: bremenHbf,
		toId: bremerhavenHbf,
		when
	})

	t.end()
})

test.skip('refreshJourney', async (t) => {
	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: bremenHbf,
		toId: bremerhavenHbf,
		when
	})
	t.end()
})

test.skip('trip details', async (t) => {
	const journeys = await client.journeys(bremenHbf, bremerhavenHbf, {
		results: 1, departure: when
	})

	const p = journeys[0].legs[0]
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'journeyLeg', 'trip')
	t.end()
})

test.skip('departures at Magdeburg Leiterstr.', co(function*(t) {
	const departures = await client.departures(leiterstr, {
		duration: 5, when,
		stopovers: true
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: leiterstr
	})
	t.end()
})

test.skip('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: bremenHbf,
		name: 'Magdeburg Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

test.skip('arrivals at Magdeburg Leiterstr.', co(function*(t) {
	const arrivals = await client.arrivals(leiterstr, {
		duration: 5, when,
		stopovers: true
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: leiterstr
	})
	t.end()
})

// todo: nearby

test.skip('locations named Magdeburg', co(function*(t) {
	const locations = await client.locations('Magdeburg', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.some((l) => {
		// todo: trim IDs
		if (l.station) {
			if (l.station.id === '008010224' || l.station.id === bremenHbf) return true
		}
		return l.id === '008010224' || l.id === bremenHbf
	}))

	t.end()
})

test.skip('station Magdeburg-Buckau', async (t) => {
	const s = await client.stop(bremerhavenHbf)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, bremerhavenHbf)

	t.end()
})

test.skip('radar', async (t) => {
	const vehicles = await client.radar({
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
})
