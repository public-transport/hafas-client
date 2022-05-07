import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as mobilNrwProfile} from '../../p/mobil-nrw/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testRefreshJourney} from './lib/refresh-journey.js'
import {testDepartures} from './lib/departures.js'
import {testArrivals} from './lib/arrivals.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(mobilNrwProfile.timezone, mobilNrwProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: mobilNrwProfile.products,
	minLatitude: 48.089,
	minLongitude: 1.659,
	maxLatitude: 53.531,
	maxLongitude: 14.689,
}

const validate = createValidate(cfg)

const client = createClient(mobilNrwProfile, 'public-transport/hafas-client:test')

const soest = '8000076'
const aachenHbf = '8000001'
const dortmundStadtgarten = '655672'

tap.test('journeys – Soest to Aachen Hbf', async (t) => {
	const res = await client.journeys(soest, aachenHbf, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: soest,
		toId: aachenHbf
	})
	t.end()
})

// todo: journeys, only one product

tap.test('Aachen Hbf to Schillingstr. 3, Dortmund', async (t) => {
	const schillingstr3 = {
		type: 'location',
		id: '980288407',
		address: 'Dortmund - Mitte, Schillingstraße 3',
		latitude: 51.504891,
		longitude: 7.457802,
	}

	const res = await client.journeys(aachenHbf, schillingstr3, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: aachenHbf,
		to: schillingstr3
	})
	t.end()
})

tap.test('Aachen Hbf to Sportanlage Schulzentrum, Dortmund', async (t) => {
	const sportanlage = {
		type: 'location',
		id: '991557725',
		poi: true,
		name: 'Dortmund, Sportanlage Schulzentrum (Grünanlagen)',
		latitude: 51.491201,
		longitude: 7.562859,
	}
	const res = await client.journeys(aachenHbf, sportanlage, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: aachenHbf,
		to: sportanlage
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
		fromId: soest,
		toId: aachenHbf,
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
		fromId: soest,
		toId: aachenHbf,
		when
	})
	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(soest, aachenHbf, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Soest', async (t) => {
	const ids = [
		soest,
		'906135', // Bahnhof, Soest
		'904812', // Bahnhof/Brüdertor, Soest
		'902737', // Bahnhof E, Soest
	]

	const res = await client.departures(soest, {
		duration: 10, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		ids,
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: soest,
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

tap.test('arrivals at Soest', async (t) => {
	const ids = [
		soest,
		'906135', // Bahnhof, Soest
		'904812', // Bahnhof/Brüdertor, Soest
		'902737', // Bahnhof E, Soest
	]

	const res = await client.arrivals(soest, {
		duration: 10, when,
	})

	await testArrivals({
		test: t,
		res,
		validate,
		ids,
	})
	t.end()
})

// todo: nearby

tap.test('locations named "stadtgarten dortmund"', async (t) => {
	const locations = await client.locations('stadtgarten dortmund', {
		results: 10,
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 10)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === dortmundStadtgarten || l.id === dortmundStadtgarten
	}))

	t.end()
})

tap.test('station Aachen Hbf', async (t) => {
	const s = await client.stop(aachenHbf)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, aachenHbf)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 51.4358,
		west: 6.7625,
		south: 51.4214,
		east: 6.7900,
	}, {
		duration: 5 * 60, when, results: 10,
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
			id: '980301639',
			latitude: 51.387609,
			longitude: 6.684019,
			address: 'Duisburg, Am Mühlenberg 1',
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
