'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const vsnProfile = require('../../p/vsn')
const products = require('../../p/vsn/products')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	products,
	minLatitude: 51,
	maxLatitude: 53,
	minLongitude: 9.2,
	maxLongitude: 10.7
}

const validate = createValidate(cfg)

const client = createClient(vsnProfile, 'public-transport/hafas-client:test')

const kornmarkt = '9033977'
const jugendherberge = '9033961'
const ewaldstrasse = '9033896'

test('journeys – Kornmarkt to Ewaldstraße', async (t) => {
	const res = await client.journeys(kornmarkt, ewaldstrasse, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: kornmarkt,
		toId: ewaldstrasse
	})
	t.end()
})

test('Ewaldstraße to 37083 Göttingen, Schulweg 22', async (t) => {
	const schulweg = {
		type: 'location',
		address: '37083 Göttingen, Schulweg 22',
		latitude: 51.51579,
		longitude: 9.945382
	}
	const res = await client.journeys(ewaldstrasse, schulweg, {
		results: 3,
		departure: when
	})
	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: ewaldstrasse,
		to: schulweg
	})
	t.end()
})

test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: ewaldstrasse,
		toId: kornmarkt
	})

	t.end()
})

test('trip', async (t) => {
	const { journeys } = await client.journeys(jugendherberge, kornmarkt, {
		results: 1, departure: when
	})

	const p = journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('departures at Kornmarkt.', async (t) => {
	const departures = await client.departures(kornmarkt, {
		duration: 20, when
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: kornmarkt
	})
	t.end()
})

test('arrivals at Kornmarkt.', async (t) => {
	const arrivals = await client.arrivals(kornmarkt, {
		duration: 20, when
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: kornmarkt
	})
	t.end()
})

test('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: kornmarkt,
		name: 'Kornmarkt',
		location: {
			type: 'location',
			latitude: 51.727914,
			longitude: 10.250606
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

test('locations named Jugendherberge', async (t) => {
	const locations = await client.locations('Jugendherberge', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi))
	t.ok(locations.some((loc) => {
		if (loc.station && loc.station.id === jugendherberge) return true
		return loc.id === jugendherberge
	}))

	t.end()
})

test('stop Jugendherberge', async (t) => {
	const s = await client.stop(jugendherberge)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, jugendherberge)

	t.end()
})

test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 52,
		west: 9.8,
		south: 51.51,
		east: 10
	}, {
		duration: 5 * 60, when, results: 10
	})
	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})
