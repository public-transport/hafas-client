import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as vbbProfile} from '../../p/vbb/index.js'
import {createVbbBvgValidators} from './lib/vbb-bvg-validators.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testJourneysWalkingSpeed} from './lib/journeys-walking-speed.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testRefreshJourney} from './lib/refresh-journey.js'
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js'
import {testDepartures} from './lib/departures.js'
import {testDeparturesInDirection} from './lib/departures-in-direction.js'
import {testArrivals} from './lib/arrivals.js'
import {testJourneysWithDetour} from './lib/journeys-with-detour.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(vbbProfile.timezone, vbbProfile.locale, T_MOCK)

const {
	cfg,
	validateStation,
	validateJourneyLeg,
	validateDeparture,
	validateMovement
} = createVbbBvgValidators({
	when,
})

const validate = createValidate(cfg, {
	station: validateStation,
	journeyLeg: validateJourneyLeg,
	departure: validateDeparture,
	movement: validateMovement
})

const client = createClient(vbbProfile, 'public-transport/hafas-client:test')

const amrumerStr = '900009101'
const spichernstr = '900042101'
const bismarckstr = '900024201'
const westhafen = '900001201'
const wedding = '900009104'
const württembergallee = '900026153'

tap.test('journeys – Spichernstr. to Bismarckstr.', async (t) => {
	const res = await client.journeys({
		type: 'stop',
		id: spichernstr,
		name: 'U Spichernstr.'
	}, bismarckstr, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: spichernstr,
		toId: bismarckstr
	})
	// todo: find a journey where there ticket info is always available

	t.end()
})

tap.test('journeys – only subway', async (t) => {
	const res = await client.journeys(spichernstr, bismarckstr, {
		results: 20,
		departure: when,
		products: {
			suburban: false,
			subway:   true,
			tram:     false,
			bus:      false,
			ferry:    false,
			express:  false,
			regional: false
		}
	})

	validate(t, res, 'journeysResult', 'res')

	t.ok(res.journeys.length > 1)
	for (let i = 0; i < res.journeys.length; i++) {
		const journey = res.journeys[i]
		for (let j = 0; j < journey.legs.length; j++) {
			const leg = journey.legs[j]

			const name = `res.journeys[${i}].legs[${i}].line`
			if (leg.line) {
				t.equal(leg.line.mode, 'train', name + '.mode is invalid')
				t.equal(leg.line.product, 'subway', name + '.product is invalid')
			}
			t.ok(journey.legs.some(l => l.line), name + '.legs has no subway leg')
		}
	}

	t.end()
})

// todo: journeys – with arrival time

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: spichernstr,
		toId: bismarckstr,
		when,
		products: vbbProfile.products,
	})
	t.end()
})

tap.test('journeys: walkingSpeed', async (t) => {
	const havelchaussee = {
		type: 'location',
		address: 'Havelchaussee',
		latitude: 52.443576,
		longitude: 13.198973
	}
	const wannsee = '900053301'

	await testJourneysWalkingSpeed({
		test: t,
		journeys: client.journeys,
		validate,
		from: havelchaussee,
		to: wannsee,
		when,
		products: {bus: false},
		minTimeDifference: 5 * 60 * 1000
	})
})

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: spichernstr,
		toId: bismarckstr,
		when
	})

	t.end()
})

tap.test('refreshJourney', async (t) => {
	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: spichernstr,
		toId: bismarckstr,
		when
	})
	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(spichernstr, amrumerStr, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

// This currently fails because some trips' departure/arrival is out of the range
// around `when`, as expected by `assertValidWhen`, as called by `validate`.
// todo: allow turning this off?
tap.skip('trips', async (t) => {
	const r1 = await client.tripsByName('S1')
	t.ok(Array.isArray(r1))
	t.ok(r1.length > 0)
	t.ok(r1.every(t => t.line.name.trim() === 'S1'))
	for (let i = 0; i < r1.length; i++) {
		validate(t, r1[i], 'trip', `r1[${i}]`)
	}

	const r2 = await client.tripsByName('S1', {
		onlyCurrentlyRunning: false,
	})
	t.ok(Array.isArray(r2))
	t.ok(r2.length > r1.length)
	t.ok(r2.every(t => t.line.name.trim() === 'S1'))
	for (let i = 0; i < r2.length; i++) {
		validate(t, r2[i], 'trip', `r2[${i}]`)
	}

	const r3 = await client.tripsByName('*', {
		onlyCurrentlyRunning: false,
	})
	t.ok(Array.isArray(r3))
	t.ok(r3.length > r2.length)
	for (let i = 0; i < r3.length; i++) {
		validate(t, r3[i], 'trip', `r3[${i}]`)
	}

	t.end()
})

tap.test('journeys – station to address', async (t) => {
	const torfstr = {
		type: 'location',
		address: '13353 Berlin-Wedding, Torfstr. 17',
		latitude: 52.541797,
		longitude: 13.350042
	}
	const res = await client.journeys(spichernstr, torfstr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: spichernstr,
		to: torfstr
	})
	t.end()
})

tap.test('journeys – station to POI', async (t) => {
	const atze = {
		type: 'location',
		id: '900980720',
		poi: true,
		name: 'Berlin, Atze Musiktheater für Kinder',
		latitude: 52.543333,
		longitude: 13.351686
	}
	const res = await client.journeys(spichernstr, atze, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: spichernstr,
		to: atze
	})
	t.end()
})

tap.test('journeys: via works – with detour', async (t) => {
	// Going from Westhafen to Wedding via Württembergalle without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const res = await client.journeys(westhafen, wedding, {
		via: württembergallee,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [württembergallee]
	})
	t.end()
})

// todo: without detour test

tap.test('departures', async (t) => {
	const res = await client.departures(spichernstr, {
		duration: 5, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: spichernstr
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: spichernstr,
		name: 'U Spichernstr',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

tap.test('departures at Spichernstr. in direction of Westhafen', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: spichernstr,
		directionIds: [westhafen],
		when,
		validate
	})
	t.end()
})

tap.test('departures at 7-digit station', async (t) => {
	const eisenach = '8010097' // see derhuerst/vbb-hafas#22
	await client.departures(eisenach, {when})
	t.pass('did not fail')
	t.end()
})

tap.test('arrivals', async (t) => {
	const res = await client.arrivals(spichernstr, {
		duration: 5, when,
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: spichernstr
	})
	t.end()
})

tap.test('nearby', async (t) => {
	const berlinerStr = '900044201'
	const landhausstr = '900043252'

	// Berliner Str./Bundesallee
	const nearby = await client.nearby({
		type: 'location',
		latitude: 52.4873452,
		longitude: 13.3310411
	}, {
		// Even though HAFAS reports Landhausstr. to be 179m, we have to pass way more here. 🙄
		distance: 600,
	})

	validate(t, nearby, 'locations', 'nearby')

	t.equal(nearby[0].id, berlinerStr)
	t.equal(nearby[0].name, 'U Berliner Str. (Berlin)')
	t.ok(nearby[0].distance > 0)
	t.ok(nearby[0].distance < 100)

	const res = nearby.find(s => s.id === landhausstr)
	t.ok(res, `Landhausstr. ${landhausstr} is not among the nearby stops`)
	t.equal(nearby[1].name, 'Landhausstr. (Berlin)')
	t.ok(nearby[1].distance > 100)
	t.ok(nearby[1].distance < 200)

	t.end()
})

tap.test('locations', async (t) => {
	const locations = await client.locations('Alexanderplatz', {results: 20})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.find(s => !s.name && s.address)) // addresses

	t.end()
})

tap.test('stop', async (t) => {
	const s = await client.stop(spichernstr)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, spichernstr)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 52.52411,
		west: 13.41002,
		south: 52.51942,
		east: 13.41709
	}, {
		duration: 5 * 60, when
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})

tap.test('reachableFrom', async (t) => {
	const torfstr17 = {
		type: 'location',
		address: '13353 Berlin-Wedding, Torfstr. 17',
		latitude: 52.541797,
		longitude: 13.350042
	}

	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: torfstr17,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
