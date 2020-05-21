'use strict'

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const rsagProfile = require('../../p/rsag')
const products = require('../../p/rsag/products')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const testArrivals = require('./lib/arrivals')
const testReachableFrom = require('./lib/reachable-from')

const when = createWhen(rsagProfile.timezone, rsagProfile.locale)

const cfg = {
	when,
	// stationCoordsOptional: false,
	products,
	minLatitude: 52.299,
	maxLatitude: 54.862,
	minLongitude: 9.121,
	maxLongitude: 14.824,
}

const validate = createValidate(cfg)

const client = createClient(rsagProfile, 'public-transport/hafas-client:test')

const sternwarte = '704956'
const sternwarte2 = '708539'
const weißesKreuz = '708573'

test('journeys – Platz der Jugend to Weißes Kreuz', async (t) => {
	const res = await client.journeys(sternwarte, weißesKreuz, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: sternwarte,
		toId: weißesKreuz
	})
	t.end()
})

// todo: journeys, walkingSpeed
// todo: via works – with detour

test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: sternwarte,
		toId: weißesKreuz,
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
		fromId: sternwarte,
		toId: weißesKreuz,
		when
	})
	t.end()
})

test('arrivals at Platz der Jugend', async (t) => {
	const arrivals = await client.arrivals(sternwarte, {
		duration: 30, when
	})

	validate(t, arrivals, 'arrivals', 'arrivals')
	t.ok(arrivals.length > 0, 'must be >0 arrivals')
	t.deepEqual(arrivals, arrivals.sort((a, b) => t.when > b.when))
	t.end()
})

// todo: nearby

test.skip('radar', async (t) => {
	const vehicles = await client.radar({
		north: 54.116968,
		west: 12.029738,
		south: 54.060517,
		east: 12.203261
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})

test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: {
			type: 'location',
			id: '990004158',
			address: 'Rostock - Stadtmitte, Pläterstraße 2',
			latitude: 54.091285, longitude: 12.13648
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
