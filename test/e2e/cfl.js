import tap from 'tap'
import assert from 'assert'
import isRoughlyEqual from 'is-roughly-equal'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as cflProfile} from '../../p/cfl/index.js'
import {
	createValidateLine,
	createValidateJourneyLeg,
	createValidateMovement,
} from './lib/validators.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js'
import {testDepartures} from './lib/departures.js'
import {testArrivals} from './lib/arrivals.js'

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(cflProfile.timezone, cflProfile.locale, T_MOCK)

const cfg = {
	when,
	products: cflProfile.products,
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

const _validateMovement = createValidateMovement(cfg)
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

const client = createClient(cflProfile, 'public-transport/hafas-client:test')

const ettelbruck = '9258199'
const mersch = '9864348'
const luxembourgGareCentrale = '200405059'

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
		toId: luxembourgGareCentrale
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
		products: cflProfile.products,
	})
	t.end()
})

tap.test('Luxembourg to 9071 Ettelbruck, Rue des Romains 4', async (t) => {
	const rueDeRomain = {
		type: 'location',
		address: '9071 Ettelbruck, Rue des Romains 4',
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

tap.test('Luxembourg to Centre Hospitalier du Nord', async (t) => {
	const luxembourg = '9217081'
	const centreHospitalier = {
		type: 'location',
		id: '990027653',
		poi: true,
		name: 'Centre Hospitalier du Nord (CHDN), Ettelbruck',
		latitude: 49.853168,
		longitude: 6.096268,
	}
	const res = await client.journeys(luxembourgGareCentrale, centreHospitalier, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: luxembourg,
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

	const tripRes = await client.trip(p.tripId, {when})

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
	t.ok(locations.find(s => s.poi))
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
	const res = await client.radar({
		north: 49.9,
		west: 6.05,
		south: 49.8,
		east: 6.15
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})
