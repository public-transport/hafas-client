'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const invgProfile = require('../../p/invg')
const products = require('../../p/invg/products')
const {
	journeyLeg: createValidateJourneyLeg,
	movement: createValidateMovement
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const {test} = require('./lib/util')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const testRefreshJourney = require('./lib/refresh-journey')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testArrivals = require('./lib/arrivals')

const when = createWhen('Europe/Berlin', 'de-DE')
const cfg = {when, products}

const _validateJourneyLeg = createValidateJourneyLeg(cfg)
const validateJourneyLeg = (val, leg, name = 'journeyLeg') => {
	_validateJourneyLeg(val, {
		...leg,
		direction: leg.direction || 'foo',
	}, name)
}

const _validateMovement = createValidateMovement(cfg)
const validateMovement = (val, m, name = 'movement') => {
	_validateMovement(val, {
		...m,
		direction: m.direction || 'foo',
	}, name)
}

const validate = createValidate(cfg, {
	journeyLeg: validateJourneyLeg,
	movement: validateMovement
})

const client = createClient(invgProfile, 'public-transport/hafas-client:test')

const ingolstadtHbf = '8000183'
const telemannstr = '71802'
const uhlandstr1 = {
	type: 'location',
	address: 'Ingolstadt, Uhlandstraße 1',
	latitude: 48.775236,
	longitude: 11.441138
}

test('journeys – Ingolstadt Hbf to Audi Parkplatz', async (t) => {
	const telemannstr = '71801'
	const res = await client.journeys(ingolstadtHbf, telemannstr, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: ingolstadtHbf,
		toId: telemannstr
	})
	t.end()
})

// todo: journeys, only one product

test('journeys – fails with no product', (t) => {
	journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: ingolstadtHbf,
		toId: telemannstr,
		when,
		products
	})
	t.end()
})

test('Ingolstadt Hbf to Uhlandstr. 1', async (t) => {
	const res = await client.journeys(ingolstadtHbf, uhlandstr1, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: ingolstadtHbf,
		to: uhlandstr1
	})
	t.end()
})

test('Ingolstadt Hbf to Städtisches Freibad', async (t) => {
	const freibad = {
		type: 'location',
		id: '980000591',
		poi: true,
		name: 'Ingolstadt, Städtisches Freibad (Sport)',
		latitude: 48.761473,
		longitude: 11.418602
	}
	const res = await client.journeys(ingolstadtHbf, freibad, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: ingolstadtHbf,
		to: freibad
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: ingolstadtHbf,
		toId: telemannstr
	})

	t.end()
})

test('refreshJourney', async (t) => {
	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: ingolstadtHbf,
		toId: telemannstr,
		when
	})
	t.end()
})

test('trip details', async (t) => {
	const {journeys} = await client.journeys(ingolstadtHbf, telemannstr, {
		results: 1, departure: when
	})

	const p = journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

test('departures at Ingolstadt Hbf', async (t) => {
	const ids = [
		ingolstadtHbf, // station
		'80301', // stop "Ingolstadt, Hauptbahnhof Stadtauswärts"
		'80302' // stop "Ingolstadt, Hauptbahnhof Stadteinwärts"
	]

	const deps = await client.departures(ingolstadtHbf, {
		duration: 10, when
	})

	validate(t, deps, 'departures', 'departures')
	t.ok(deps.length > 0, 'must be >0 departures')
	// todo: move into deps validator
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))

	for (let i = 0; i < deps.length; i++) {
		const dep = deps[i]
		t.ok(ids.includes(dep.stop.id), `deps[${i}].stop.id ("${dep.stop.id}") is invalid`)
	}

	t.end()
})

test('departures with station object', async (t) => {
	const deps = await client.departures({
		type: 'station',
		id: ingolstadtHbf,
		name: 'Ingolstadt Hbf',
		location: {
			type: 'location',
			latitude: 48.822834,
			longitude: 11.461148
		}
	}, {when})

	validate(t, deps, 'departures', 'departures')
	t.end()
})

test('arrivals at Ingolstadt Hbf', async (t) => {
	const ids = [
		ingolstadtHbf, // station
		'80301', // stop "Ingolstadt, Hauptbahnhof Stadtauswärts"
		'80302' // stop "Ingolstadt, Hauptbahnhof Stadteinwärts"
	]

	const arrs = await client.arrivals(ingolstadtHbf, {
		duration: 10, when
	})

	validate(t, arrs, 'arrivals', 'arrivals')
	t.ok(arrs.length > 0, 'must be >0 arrivals')
	// todo: move into arrs validator
	t.deepEqual(arrs, arrs.sort((a, b) => t.when > b.when))

	for (let i = 0; i < arrs.length; i++) {
		const arr = arrs[i]
		t.ok(ids.includes(arr.stop.id), `arrs[${i}].stop.id ("${arr.stop.id}") is invalid`)
	}

	t.end()
})

test('nearby', async (t) => {
	const nearby = await client.nearby({
		type: 'location',
		id: '990001921',
		address: 'Ingolstadt, Rathausplatz 1',
		latitude: 48.76292,
		longitude: 11.424624
	}, {distance: 500})

	validate(t, nearby, 'locations', 'nearby')

	const rathausplatz = '60706'
	const harderstr = '28402'
	t.ok(nearby.find(l => l.id === rathausplatz))
	t.ok(nearby.find(l => l.id === harderstr))

	t.end()
})

test('locations named "freibad"', async (t) => {
	const freibadIngolstadt = '980000591'
	const locations = await client.locations('freibad', {
		results: 5
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.id && s.name)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === freibadIngolstadt || l.id === freibadIngolstadt
	}))

	t.end()
})

test('stop Ettinger Str.', async (t) => {
	const ettingerStr = '18304'
	const s = await client.stop(ettingerStr)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, ettingerStr)

	t.end()
})

test('radar', async (t) => {
	const vehicles = await client.radar({
		north: 48.74453,
		west: 11.42733,
		south: 48.73453,
		east: 11.43733
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, vehicles, 'movements', 'vehicles')
	t.end()
})
