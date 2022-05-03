'use strict'

const tap = require('tap')
const assert = require('assert')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const rejseplanenProfile = require('../../p/rejseplanen')
const products = require('../../p/rejseplanen/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(rejseplanenProfile.timezone, rejseplanenProfile.locale, T_MOCK)

const validate = createValidate({
	when,
	products,
	minLatitude: 52.7,
	maxLatitude: 58.85,
	minLongitude: 5.8,
	maxLongitude: 15.7,
}, {})

const client = createClient(rejseplanenProfile, 'public-transport/hafas-client:test')

const næstved = '8600810'
const randers = '8600040'
const aalborg = '8600020'

tap.test('journeys – Næstved to Aalborg', async (t) => {
	const res = await client.journeys(næstved, aalborg, {
		results: 4,
		departure: when,
		stopovers: true,
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: næstved,
		toId: aalborg,
	})
	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: næstved,
		toId: aalborg,
		when,
		products,
	})
	t.end()
})

tap.test('Randers to Møllegade 3, København', async (t) => {
	const møllegade3 = {
		type: 'location',
		id: '901011579',
		address: 'Møllegade 3, 2200 København N, Københavns Kommune',
		latitude: 55.69052, longitude: 12.555494,
	}

	const res = await client.journeys(randers, møllegade3, {
		results: 3,
		departure: when,
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: randers,
		to: møllegade3,
	})
	t.end()
})

// todo: journeys: via works – with detour
// todo: without detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: randers,
		toId: næstved,
		when,
	})

	t.end()
})

tap.test('trip', async (t) => {
	const { journeys } = await client.journeys(aalborg, næstved, {
		results: 1, departure: when,
	})

	const p = journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, p.line.name, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Næstved.', async (t) => {
	const res = await client.departures(næstved, {
		duration: 20, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		ids: [
			næstved,
			'8650810', // Næstved St. (togbus)
			'8651810', // Næstved St. (togbus)
		],
	})
	t.end()
})

tap.test('arrivals at Næstved.', async (t) => {
	const res = await client.arrivals(næstved, {
		duration: 20, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		ids: [
			næstved,
			'8650810', // Næstved St. (togbus)
			'8651810', // Næstved St. (togbus)
		],
	})
	t.end()
})

// todo: nearby

tap.test('locations named "næstved"', async (t) => {
	const locations = await client.locations('næstved', {
		results: 20,
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi))
	t.ok(locations.some((loc) => {
		if (loc.station && loc.station.id === næstved) return true
		return loc.id === næstved
	}))

	t.end()
})

tap.test('stop Næstved', async (t) => {
	const s = await client.stop(næstved)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, næstved)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 55.695,
		west: 12.498,
		south: 55.639,
		east: 12.621,
	}, {
		duration: 5 * 60, when, results: 10,
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})
