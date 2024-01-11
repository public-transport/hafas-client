import tap from 'tap'
import isRoughlyEqual from 'is-roughly-equal'

import {createWhen} from './lib/util.js'
import {createRestClient} from '../../rest-exe.js'
import {profile as vbbRestProfile} from '../../p/vbb-rest/index.js'
import {createVbbBvgValidators} from './lib/vbb-bvg-validators.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
// import {testRefreshJourney} from './lib/refresh-journey.js'
import {testDepartures} from './lib/departures.js'
import {testDeparturesInDirection} from './lib/departures-in-direction.js'
// import {testDeparturesWithoutRelatedStations} from './li.jsbdepartures-without-related-stations')
import {testArrivals} from './lib/arrivals.js'
// import {testJourneysWithDetour} from './lib/journeys-with-detour.js'
// import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1669705200 * 1000 // 2022-11-29T08:00:00+01:00
const when = createWhen(vbbRestProfile.timezone, vbbRestProfile.locale, T_MOCK)

const {
	cfg,
	validateStation,
	validateLine,
	validateJourneyLeg,
	validateDeparture,
	validateMovement,
} = createVbbBvgValidators({when})
const validate = createValidate(cfg, {
	station: validateStation,
	line: validateLine,
	journeyLeg: validateJourneyLeg,
	departure: validateDeparture,
	movement: validateMovement
})

const token = process.env.TOKEN
const client = createRestClient(vbbRestProfile, token, 'public-transport/hafas-client:test')

const schwedterStr = '900110505'
const treptowerPark = '900190001'
const jungfernheide = '900020201'
const berlinHbf = '900003201'
const ostbahnhof = '900120005'

tap.only('journeys – Schwedter Str. to Treptower Park', async (t) => {
	const journeys = await client.journeys(schwedterStr, treptowerPark, {
		results: 3,
		departure: when,
		stopovers: true,
	})

	await testJourneysStationToStation({
		test: t,
		res: {journeys},
		validate,
		fromId: schwedterStr,
		toId: treptowerPark
	})
	t.end()
})

// todo: journeys, only one product

tap.test('Berlin Schwedter Str. to Torfstraße 17', async (t) => {
	const torfstr17 = {
		type: 'location',
		id: '770006698',
		latitude: 52.541797, longitude: 13.350042,
		address: '13353 Berlin-Wedding, Torfstr. 17',
	}
	const journeys = await client.journeys(schwedterStr, torfstr17, {
		results: 3,
		departure: when,
	})

	await testJourneysStationToAddress({
		test: t,
		res: {journeys},
		validate,
		fromId: schwedterStr,
		to: torfstr17,
	})
	t.end()
})

tap.test('Berlin Schwedter Str. to ATZE Musiktheater', async (t) => {
	const atze = {
		type: 'location',
		id: '900980720',
		poi: true,
		name: 'Berlin, Atze Musiktheater für Kinder',
		latitude: 52.543333, longitude: 13.351686,
	}
	const journeys = await client.journeys(schwedterStr, atze, {
		results: 3,
		departure: when
	})
	console.error('journeys', ...journeys)

	await testJourneysStationToPoi({
		test: t,
		res: {journeys},
		validate,
		fromId: schwedterStr,
		to: atze,
	})
	t.end()
})

// todo
tap.test('earlier/later journeys, Jungfernheide -> Treptower Park', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: jungfernheide,
		toId: treptowerPark,
		when
	})
	t.end()
})

tap.test('departures at Schwedter Str.', async (t) => {
	const departures = await client.departures(schwedterStr, {
		when, duration: 5,
		stopovers: true,
	})

	await testDepartures({
		test: t,
		departures,
		validate,
		id: schwedterStr,
	})
	t.end()
})

tap.test('departures at Berlin Hbf in direction of Berlin Ostbahnhof', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: berlinHbf,
		directionIds: [ostbahnhof],
		when,
		validate,
	})
	t.end()
})

tap.test('arrivals at Berlin Schwedter Str.', async (t) => {
	const arrivals = await client.arrivals(schwedterStr, {
		duration: 5, when,
		stopovers: true
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: schwedterStr
	})
	t.end()
})

tap.test('nearby S+U Jungfernheide', async (t) => {
	const nearby = await client.nearby({
		type: 'location',
		latitude: 52.530273,
		longitude: 13.299433,
	}, {
		results: 2, distance: 400,
	})

	validate(t, nearby, 'locations', 'nearby')

	t.equal(nearby.length, 2)

	const s0 = nearby[0]
	t.equal(s0.id, jungfernheide)
	t.equal(s0.name, 'Berlin Jungfernheide')
	t.ok(isRoughlyEqual(.0005, s0.location.latitude, 52.530408))
	t.ok(isRoughlyEqual(.0005, s0.location.longitude, 13.299424))
	t.ok(s0.distance >= 0)
	t.ok(s0.distance <= 100)

	t.end()
})

tap.test('locations named Jungfernheide', async (t) => {
	const locations = await client.locations('Jungfernheide', {
		results: 10,
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)
	t.ok(locations.some((l) => {
		return l.station && l.station.id === jungfernheide || l.id === jungfernheide
	}), 'Jungfernheide not found')

	t.end()
})

// tap.test('stop', async (t) => {
// 	const s = await client.stop(jungfernheide)

// 	validate(t, s, ['stop', 'station'], 'stop')
// 	t.equal(s.id, jungfernheide)

// 	t.end()
// })

// tap.test('radar', async (t) => {
// 	const vehicles = await client.radar({
// 		north: 52.52411,
// 		west: 13.41002,
// 		south: 52.51942,
// 		east: 13.41709
// 	}, {
// 		duration: 5 * 60, when
// 	})

// 	console.error('vehicles', ...vehicles.slice(0, 3))
// 	validate(t, vehicles, 'movements', 'vehicles')
// 	t.end()
// })

// tap.test('reachableFrom', async (t) => {
// 	const torfstr17 = {
// 		type: 'location',
// 		address: 'Torfstraße 17',
// 		latitude: 52.5416823,
// 		longitude: 13.3491223
// 	}

// 	await testReachableFrom({
// 		test: t,
// 		reachableFrom: client.reachableFrom,
// 		address: torfstr17,
// 		when,
// 		maxDuration: 15,
// 		validate
// 	})
// 	t.end()
// })
