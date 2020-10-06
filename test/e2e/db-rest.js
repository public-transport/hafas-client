import tap from 'tap'
import isRoughlyEqual from 'is-roughly-equal'

import {createWhen} from './lib/util.js'
import {createRestClient} from '../../rest-exe.js'
import {profile as dbRestProfile} from '../../p/db-rest/index.js'
import validators from './lib/validators.js'
const {
	stop: createValidateStop,
	station: createValidateStation,
	journeyLeg: createValidateJourneyLeg,
} = validators
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
// import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
// import {testLegCycleAlternatives} from './lib/leg-cycle-alternatives.js'
// import {testRefreshJourney} from './lib/refresh-journey.js'
// import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js'
import {testDepartures} from './lib/departures.js'
import {testDeparturesInDirection} from './lib/departures-in-direction.js'
// import {testDeparturesWithoutRelatedStations} from './li.jsbdepartures-without-related-stations')
import {testArrivals} from './lib/arrivals.js'
// import {testJourneysWithDetour} from './lib/journeys-with-detour.js'
// import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1669705200 * 1000 // 2022-11-29T08:00:00+01:00
const when = createWhen(dbRestProfile.timezone, dbRestProfile.locale, T_MOCK)

const token = process.env.TOKEN
const client = createRestClient(dbRestProfile, token, 'public-transport/hafas-client:test')

const cfg = {
	when,
	products: client.profile.products
}

// todo: use Object.fromEntries (Node 12+)
const fakeProducts = client.profile.products
.reduce((ps, p) => ({...ps, [p.id]: !!p.default}), {})
const withFakeProduts = (fn) => (validate, item, name) => {
	fn(validate, {products: fakeProducts, ...item}, name)
}

const _validateJourneyLeg = createValidateJourneyLeg(cfg)
const validateJourneyLeg = (validate, l, name) => {
	_validateJourneyLeg(validate, {
		...l,
		direction: l.direction || 'foo'
	}, name)
}

const validate = createValidate(cfg, {
	stop: withFakeProduts(createValidateStop(cfg)),
	station: withFakeProduts(createValidateStation(cfg)),
	journeyLeg: validateJourneyLeg,
})

const berlinHbf = '8011160'
const münchenHbf = '8000261'
const jungfernheide = '8011167'
const blnSchwedterStr = '732652'
const westhafen = '8089116'
const wedding = '8089131'
const württembergallee = '731084'
const regensburgHbf = '8000309'
const blnOstbahnhof = '8010255'
const blnTiergarten = '8089091'
const blnJannowitzbrücke = '8089019'
const potsdamHbf = '8012666'

tap.test('journeys – Berlin Schwedter Str. to München Hbf', async (t) => {
	const journeys = await client.journeys(blnSchwedterStr, münchenHbf, {
		results: 4,
		departure: when,
		stopovers: true
	})
	console.error(journeys[0].legs)

	await testJourneysStationToStation({
		test: t,
		res: {journeys},
		validate,
		fromId: blnSchwedterStr,
		toId: münchenHbf
	})

	t.end()
})

// todo: journeys, only one product

tap.test('Berlin Schwedter Str. to Torfstraße 17', async (t) => {
	const torfstr = {
		type: 'location',
		address: 'Torfstraße 17',
		latitude: 52.5416823,
		longitude: 13.3491223
	}
	const journeys = await client.journeys(blnSchwedterStr, torfstr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res: {journeys},
		validate,
		fromId: blnSchwedterStr,
		to: torfstr
	})
	t.end()
})

tap.test('Berlin Schwedter Str. to ATZE Musiktheater', async (t) => {
	const atze = {
		type: 'location',
		id: '991598902',
		poi: true,
		name: 'ATZE Musiktheater',
		latitude: 52.542417,
		longitude: 13.350437
	}
	const journeys = await client.journeys(blnSchwedterStr, atze, {
		results: 3,
		departure: when
	})
	console.error(journeys.flatMap(j => j.legs.flatMap(l => l.destination)))

	await testJourneysStationToPoi({
		test: t,
		res: {journeys},
		validate,
		fromId: blnSchwedterStr,
		to: atze
	})
	t.end()
})

// tap.test('earlier/later journeys, Jungfernheide -> München Hbf', async (t) => {
// 	await testEarlierLaterJourneys({
// 		test: t,
// 		fetchJourneys: client.journeys,
// 		validate,
// 		fromId: jungfernheide,
// 		toId: münchenHbf,
// 		when
// 	})

// 	t.end()
// })

tap.test('departures at Berlin Schwedter Str.', async (t) => {
	const departures = await client.departures(blnSchwedterStr, {
		duration: 5, when,
		stopovers: true
	})
	console.error(departures[0])

	await testDepartures({
		test: t,
		departures,
		validate,
		id: blnSchwedterStr
	})
	t.end()
})

tap.test('departures at Berlin Hbf in direction of Berlin Ostbahnhof', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: berlinHbf,
		directionIds: [blnOstbahnhof, '8089185', '732676'],
		when,
		validate
	})
	t.end()
})

tap.test('arrivals at Berlin Schwedter Str.', async (t) => {
	const arrivals = await client.arrivals(blnSchwedterStr, {
		duration: 5, when,
		stopovers: true
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: blnSchwedterStr
	})
	t.end()
})

tap.test('nearby Berlin Jungfernheide', async (t) => {
	const nearby = await client.nearby({
		type: 'location',
		latitude: 52.530273,
		longitude: 13.299433
	}, {
		results: 2, distance: 400
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

// tap.test('locations named Jungfernheide', async (t) => {
// 	const locations = await client.locations('Jungfernheide', {
// 		results: 10
// 	})

// 	validate(t, locations, 'locations', 'locations')
// 	t.ok(locations.length <= 10)
// 	t.ok(locations.some((l) => {
// 		return l.station && l.station.id === jungfernheide || l.id === jungfernheide
// 	}), 'Jungfernheide not found')

// 	t.end()
// })

// tap.test('stop', async (t) => {
// 	const s = await client.stop(regensburgHbf)

// 	validate(t, s, ['stop', 'station'], 'stop')
// 	t.equal(s.id, regensburgHbf)

// 	t.end()
// })

// tap.test('line with additionalName', async (t) => {
// 	const departures = await client.departures(potsdamHbf, {
// 		duration: 12 * 60, // 12 minutes
// 		products: {bus: false, suburban: false, tram: false}
// 	})
// 	t.ok(departures.some(d => d.line && d.line.additionalName))
// 	t.end()
// })

// tap.skip('radar', async (t) => {
// 	const vehicles = await client.radar({
// 		north: 52.52411,
// 		west: 13.41002,
// 		south: 52.51942,
// 		east: 13.41709
// 	}, {
// 		duration: 5 * 60, when
// 	})

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
