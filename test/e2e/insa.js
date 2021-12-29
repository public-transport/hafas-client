'use strict'

const tap = require('tap')
const isRoughlyEqual = require('is-roughly-equal')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const insaProfile = require('../../p/insa')
const products = require('../../p/insa/products')
const {
	movement: createValidateMovement,
	journeyLeg: createValidateJourneyLeg,
} = require('./lib/validators')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')
const testJourneysStationToPoi = require('./lib/journeys-station-to-poi')
const testEarlierLaterJourneys = require('./lib/earlier-later-journeys')
const journeysFailsWithNoProduct = require('./lib/journeys-fails-with-no-product')
const testDepartures = require('./lib/departures')
const testDeparturesInDirection = require('./lib/departures-in-direction')
const testArrivals = require('./lib/arrivals')
const testJourneysWithDetour = require('./lib/journeys-with-detour')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)

const T_MOCK = 1652175000 * 1000 // 2022-05-10T11:30+02:00
const when = createWhen(insaProfile.timezone, insaProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 50.7,
	maxLatitude: 53.2,
	minLongitude: 9, // considering e.g. IC 245
	maxLongitude: 13.4
}

const withFakeDirection = (validate) => (val, item, name) => {
	validate(val, {
		...item,
		direction: item.direction === null ? 'foo' : item.direction,
	}, name)
}
const validators = {
	movement: withFakeDirection(createValidateMovement(cfg)),
	journeyLeg: withFakeDirection(createValidateJourneyLeg(cfg)),
}

const validate = createValidate(cfg, validators)

const client = createClient(insaProfile, 'public-transport/hafas-client:test')

const magdeburgHbf = '8010224'
const magdeburgBuckau = '8013456'
const spielhagenstr = '7336'
const hasselbachplatz = '90443'
const stendal = '8010334'
const dessau = '8010077'
const universitaet = '19686'

tap.test('journeys – Magdeburg Hbf to Magdeburg-Buckau', async (t) => {
	const res = await client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau
	})
	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau,
		when,
		products
	})
	t.end()
})

tap.test('Magdeburg Hbf to 39104 Magdeburg, Sternstr. 10', async (t) => {
	const sternStr = {
		type: 'location',
		address: 'Magdeburg - Altenstadt, Sternstraße 10',
		latitude: 52.118414,
		longitude: 11.422332
	}

	const res = await client.journeys(magdeburgHbf, sternStr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: magdeburgHbf,
		to: sternStr
	})
	t.end()
})

// only 1 result instead of >=3
tap.skip('Magdeburg Hbf to Kloster Unser Lieben Frauen', async (t) => {
	const kloster = {
		type: 'location',
		id: '970012223',
		poi: true,
		name: 'Magdeburg, Kloster Unser Lieben Frauen (Denkmal)',
		latitude: 52.127601,
		longitude: 11.636437
	}
	const res = await client.journeys(magdeburgHbf, kloster, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: magdeburgHbf,
		to: kloster
	})
	t.end()
})

tap.test('journeys: via works – with detour', async (t) => {
	// Going from Magdeburg, Hasselbachplatz (Sternstr.) (Tram/Bus) to Stendal
	// via Dessau without detour is currently impossible. We check if the routing
	// engine computes a detour.
	const res = await client.journeys(hasselbachplatz, stendal, {
		via: dessau,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [dessau]
	})
	t.end()
})

// todo: without detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: magdeburgHbf,
		toId: magdeburgBuckau,
		when
	})

	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(magdeburgHbf, magdeburgBuckau, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Magdeburg Universität', async (t) => {
	const res = await client.departures(universitaet, {
		duration: 30, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: universitaet
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'stop',
		id: universitaet,
		name: 'Universität',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {
		duration: 30, when,
	})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

// todo: deps empty, wrong loc ID?
tap.test('departures at Universität in direction of Spielhagenstr.', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: universitaet,
		directionIds: [spielhagenstr],
		when,
		validate
	})
	t.end()
})

tap.test('arrivals at Magdeburg Universität', async (t) => {
	const res = await client.arrivals(universitaet, {
		duration: 30, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: universitaet
	})
	t.end()
})

// todo: nearby

tap.test('locations named Magdeburg', async (t) => {
	const nordpark = '7480'
	const locations = await client.locations('nordpark', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === nordpark || l.id === nordpark
	}))

	t.end()
})

tap.test('station Magdeburg-Buckau', async (t) => {
	const s = await client.stop(magdeburgBuckau)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, magdeburgBuckau)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
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
	const validate = createValidate(customCfg, validators)
	validate(t, res, 'radarResult', 'res')

	t.end()
})
