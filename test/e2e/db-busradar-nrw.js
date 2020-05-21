'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const dbBusradarNrwProfile = require('../../p/db-busradar-nrw')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products: dbBusradarNrwProfile.products,
	minLatitude: 49.5,
	maxLatitude: 55,
	minLongitude: 4,
	maxLongitude: 14
}

const validate = createValidate(cfg, {})

const client = createClient(dbBusradarNrwProfile, 'public-transport/hafas-client:test')

const hagenBauhaus = '3307002'
const bielefeldHbf = '8000036'
const hagenVorhalle = '8000977'

test('departures at Hagen Bauhaus', async (t) => {
	const departures = await client.departures(hagenBauhaus, {
		duration: 120, when,
		stopovers: true
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: hagenBauhaus
	})
	t.end()
})

test('trip details', async (t) => {
	const deps = await client.departures(hagenBauhaus, {
		results: 1, duration: 120, when
	})

	const p = deps[0] || {}
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: hagenBauhaus,
		name: 'Hagen(Westf) Bauhaus',
		location: {
			type: 'location',
			latitude: 51.375141,
			longitude: 7.455626
		}
	}, {when, duration: 120})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

// todo: departures at hagenBauhaus in direction of …

test('arrivals at Hagen Bauhaus', async (t) => {
	const arrivals = await client.arrivals(hagenBauhaus, {
		duration: 120, when
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: hagenBauhaus
	})
	t.end()
})

// todo: nearby

test('locations named Vorhalle', async (t) => {
	const locations = await client.locations('vorhalle', {
		results: 10
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.some((l) => {
		return l.station && l.station.id === hagenVorhalle
			|| l.id === hagenVorhalle
	}))

	t.end()
})

test('station Hagen-Vorhalle', async (t) => {
	const s = await client.stop(hagenVorhalle)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, hagenVorhalle)

	t.end()
})

test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 51.5,
		west: 7.2,
		south: 51.2,
		east: 7.8
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})
