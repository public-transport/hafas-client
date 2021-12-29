'use strict'

const tap = require('tap')
const assert = require('assert')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const mobiliteitLuProfile = require('../../p/mobiliteit-lu')
const products = require('../../p/mobiliteit-lu/products')
const {
	line: createValidateLine,
	journeyLeg: createValidateJourneyLeg,
	movement: _validateMovement
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testArrivals = require('./lib/arrivals')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(mobiliteitLuProfile.timezone, mobiliteitLuProfile.locale, T_MOCK)

const cfg = {
	when,
	products,
	minLatitude: 47.24,
	maxLatitude: 52.9,
	minLongitude: -0.63,
	maxLongitude: 14.07
}

const _validateLine = createValidateLine(cfg)
const validateLine = (validate, l, name) => {
	if (!l.direction) l = Object.assign({}, l, {direction: 'foo'})
	_validateLine(validate, l, name)
}

const _validateJourneyLeg = createValidateJourneyLeg(cfg)
const validateJourneyLeg = (validate, l, name) => {
	if (!l.direction) l = Object.assign({}, l, {direction: 'foo'})
	_validateJourneyLeg(validate, l, name)
}

const validateMovement = (val, m, name = 'movement') => {
	// todo: fix this upstream
	const withFakeLocation = Object.assign({}, m)
	withFakeLocation.location = Object.assign({}, m.location, {
		latitude: 50,
		longitude: 12
	})
	_validateMovement(val, withFakeLocation, name)

	assert.ok(m.location.latitude <= 55, name + '.location.latitude is too small')
	assert.ok(m.location.latitude >= 45, name + '.location.latitude is too large')
	assert.ok(m.location.longitude >= 1, name + '.location.longitude is too small')
	assert.ok(m.location.longitude <= 11, name + '.location.longitude is too small')
}

const validate = createValidate(cfg, {
	line: validateLine,
	journeyLeg: validateJourneyLeg,
	movement: validateMovement
})

const client = createClient(mobiliteitLuProfile, 'public-transport/hafas-client:test')

const ettelbruck = '140701016'
const mersch = '160904011'
const luxembourgGareCentrale = '200405060'

tap.test('journeys – Ettelbruck to Luxembourg', async (t) => {
	const res = await client.journeys(ettelbruck, luxembourgGareCentrale, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: ettelbruck,
		toIds: [
			luxembourgGareCentrale,
			'300030001', // Luxembourg, Gare Centrale (Tram)
			'300032002', // Luxembourg, Gare Rocade
		],
	})
	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: ettelbruck,
		toId: luxembourgGareCentrale,
		when,
		products
	})
	t.end()
})

tap.test('Luxembourg to Ettelbruck, Rue des Romains 4', async (t) => {
	const rueDeRomain = {
		type: 'location',
		address: 'Ettelbruck, Rue des Romains 4',
		latitude: 49.847469,
		longitude: 6.097608
	}

	const res = await client.journeys(luxembourgGareCentrale, rueDeRomain, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: luxembourgGareCentrale,
		to: rueDeRomain
	})
	t.end()
})

// Some journeys don't start or stop at the stop/POI that we queried journeys for.
tap.test('Luxembourg to Centre Hospitalier du Nord', async (t) => {
	const centreHospitalier = {
		type: 'location',
		id: '980050385',
		poi: true,
		name: 'Ettelbruck, Centre Hospitalier du Nord (CHDN)',
		latitude: 49.853519,
		longitude: 6.094587,
	}
	const res = await client.journeys(luxembourgGareCentrale, centreHospitalier, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: luxembourgGareCentrale,
		to: centreHospitalier
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
		fromId: luxembourgGareCentrale,
		toId: ettelbruck,
		when,
	})

	t.end()
})

tap.test('trip', async (t) => {
	const { journeys } = await client.journeys(luxembourgGareCentrale, ettelbruck, {
		results: 1, departure: when
	})

	const p = journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, p.line.name, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Ettelbruck.', async (t) => {
	const res = await client.departures(ettelbruck, {
		duration: 20, when
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: ettelbruck
	})
	t.end()
})

tap.test('arrivals at Ettelbruck.', async (t) => {
	const res = await client.arrivals(ettelbruck, {
		duration: 20, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: ettelbruck
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: ettelbruck,
		name: 'Ettelbruck',
		location: {
			type: 'location',
			latitude: 49.847298,
			longitude: 6.106157
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

// todo: nearby

tap.test('locations named Mersch', async (t) => {
	const locations = await client.locations('Mersch', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.some((loc) => {
		if (loc.station && loc.station.id === mersch) return true
		return loc.id === mersch
	}))

	t.end()
})

tap.test('stop Mersch', async (t) => {
	const s = await client.stop(mersch)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, mersch)

	t.end()
})

tap.test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 49.9,
		west: 6.05,
		south: 49.8,
		east: 6.15
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})
