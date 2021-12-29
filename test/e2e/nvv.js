'use strict'

const tap = require('tap')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const nvvProfile = require('../../p/nvv')
const products = require('../../p/nvv/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(nvvProfile.timezone, nvvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 48,
	minLongitude: 8,
	maxLatitude: 53,
	maxLongitude: 14
}
const validate = createValidate(cfg, {})

const client = createClient(nvvProfile, 'public-transport/hafas-client:test')

const scheidemannplatz = '2200073'
const auestadion = '2200042'
const weigelstr = '2200056'
const friedrichsplatz = '2200006'

tap.test('journeys – Kassel Scheidemannplatz to Kassel Auestadion', async (t) => {
	const res = await client.journeys(scheidemannplatz, auestadion, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: scheidemannplatz,
		toId: auestadion
	})
	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: scheidemannplatz,
		toId: auestadion,
		when,
		products
	})
	t.end()
})

tap.test('Kassel Scheidemannplatz to Heckerstraße 2', async (t) => {
	const heckerstr2 = {
		type: 'location',
		id: '990100251',
		address: 'Kassel, Heckerstraße 2',
		latitude: 51.308108,
		longitude: 9.475152
	}

	const res = await client.journeys(scheidemannplatz, heckerstr2, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: scheidemannplatz,
		to: heckerstr2
	})
	t.end()
})

tap.test('Kassel Scheidemannplatz to Grimmwelt', async (t) => {
	const grimmwelt = {
		type: 'location',
		id: '1500490',
		poi: true,
		name: 'Grimmwelt Kassel',
		latitude: 51.309313,
		longitude: 9.489283,
	}
	const res = await client.journeys(scheidemannplatz, grimmwelt, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: scheidemannplatz,
		to: grimmwelt
	})
	t.end()
})

tap.test('journeys: via works – with detour', async (t) => {
	// Going from Scheidemannplatz to Rathaus/Fünffensterstr. via Kassel Wilhelmshöhe
	// implies a detour. We check if the routing engine computes a detour.
	const rathausFünffensterstr = '2200436'
	const wilhelmshöhe = '2200007'
	const res = await client.journeys(scheidemannplatz, rathausFünffensterstr, {
		via: wilhelmshöhe,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [wilhelmshöhe]
	})
	t.end()
})

// todo: without detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: scheidemannplatz,
		toId: auestadion,
		when
	})

	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(scheidemannplatz, auestadion, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, p.line.name, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Kassel Auestadion.', async (t) => {
	const res = await client.departures(auestadion, {
		duration: 11, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: auestadion
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: auestadion,
		name: 'Kassel Auestadion',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

tap.test('departures at Auestadion in direction of Friedrichsplatz', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: weigelstr,
		directionIds: [friedrichsplatz],
		when,
		validate
	})
	t.end()
})

tap.test('arrivals at Kassel Weigelstr.', async (t) => {
	const res = await client.arrivals(weigelstr, {
		duration: 5, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: weigelstr,
	})
	t.end()
})

// todo: nearby

tap.test('locations named Auestadion', async (t) => {
	const locations = await client.locations('auestadion', {results: 10})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some(l => l.station && l.station.id === auestadion || l.id === auestadion))

	t.end()
})

tap.test('station Auestadion', async (t) => {
	const s = await client.stop(auestadion)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, auestadion)

	t.end()
})

tap.test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 51.320153,
		west: 9.458359,
		south: 51.304304,
		east: 9.493672
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')

	t.end()
})
