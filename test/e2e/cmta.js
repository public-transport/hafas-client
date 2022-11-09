import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as cmtaProfile} from '../../p/cmta/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testRefreshJourney} from './lib/refresh-journey.js'
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js'
import {testDepartures} from './lib/departures.js'
import {testArrivals} from './lib/arrivals.js'
import {testJourneysWithDetour} from './lib/journeys-with-detour.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1657643400 * 1000 // 2022-07-12T11:30-05:00
const when = createWhen(cmtaProfile.timezone, cmtaProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: cmtaProfile.products,
	minLatitude: 26,
	maxLatitude: 33,
	minLongitude: -100,
	maxLongitude: -95
}

const validate = createValidate(cfg)

const client = createClient(cmtaProfile, 'public-transport/hafas-client:test')

const broadieOaks = '2370'
const domain = '5919'
const capitol591 = '591'

tap.test('journeys – Broadie Oaks to Domain', async (t) => {
	const res = await client.journeys(broadieOaks, domain, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: broadieOaks,
		toId: domain
	})
	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: broadieOaks,
		toId: domain,
		when,
		products: cmtaProfile.products,
	})
	t.end()
})

tap.test('Domain to 1104 Elm Street, Austin, TX 78703', async (t) => {
	const someAddress = {
		type: 'location',
		address: '1104 ELM ST, Austin, TX 78703',
		latitude: 30.279220,
		longitude: -97.758292
	}

	const res = await client.journeys(domain, someAddress, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: domain,
		to: someAddress
	})
	t.end()
})

tap.test('Domain to WHOLE FOODS MARKET - ARBOR TRAILS', async (t) => {
	const wholeFoodsMarket = {
		type: 'location',
		id: '9893387',
		poi: true,
		name: 'WHOLE FOODS MARKET - ARBOR TRAILS',
		latitude: 30.22026,
		longitude: -97.84174,
	}
	const res = await client.journeys(domain, wholeFoodsMarket, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: domain,
		to: wholeFoodsMarket
	})
	t.end()
})

// todo: walkingSpeed "2107 MELRIDGE PL" -> 000002148
// todo: via works – with detour
// todo: without detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: broadieOaks,
		toId: domain,
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
		fromId: broadieOaks,
		toId: domain,
		when
	})
	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(broadieOaks, domain, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Broadie Oaks', async (t) => {
	const res = await client.departures(broadieOaks, {
		duration: 10, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: broadieOaks
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: broadieOaks,
		name: 'Magdeburg Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

tap.test('arrivals at Broadie Oaks', async (t) => {
	const res = await client.arrivals(broadieOaks, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: broadieOaks
	})
	t.end()
})

// todo: nearby

tap.test('locations named "Capitol"', async (t) => {
	const locations = await client.locations('Capitol', {
		results: 10
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === capitol591 || l.id === capitol591
	}))

	t.end()
})

tap.test('station Domain', async (t) => {
	const s = await client.stop(domain)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, domain)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 30.240877,
		west: -97.804588,
		south: 30.225378,
		east: -97.786692
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})

tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: {
			type: 'location',
			address: '604 W 9TH ST, Austin, TX 78701',
			latitude: 30.272910,
			longitude: -97.747883
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
