import tap from 'tap'
import isRoughlyEqual from 'is-roughly-equal'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as vsnProfile} from '../../p/vsn/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testDepartures} from './lib/departures.js'
import {testArrivals} from './lib/arrivals.js'

const T_MOCK = 1671260400 * 1000 // 2022-12-17T08:00:00+01:00
const when = createWhen(vsnProfile.timezone, vsnProfile.locale, T_MOCK)

const cfg = {
	when,
	products: vsnProfile.products,
	minLatitude: 50,
	maxLatitude: 54.5,
	minLongitude: 6.5,
	maxLongitude: 11.5,
}

const validate = createValidate(cfg)

const client = createClient(vsnProfile, 'public-transport/hafas-client:test')

const kornmarkt = '9033977'
const jugendherberge = '9033961'
const ewaldstrasse = '9033896'

tap.test('journeys – Kornmarkt to Ewaldstraße', async (t) => {
	const res = await client.journeys(kornmarkt, ewaldstrasse, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: kornmarkt,
		toId: ewaldstrasse
	})
	t.end()
})

tap.test('Ewaldstraße to 37083 Göttingen, Schulweg 22', async (t) => {
	const schulweg = {
		type: 'location',
		address: '37083 Göttingen, Schulweg 22',
		latitude: 51.51579,
		longitude: 9.945382
	}
	const res = await client.journeys(ewaldstrasse, schulweg, {
		results: 3,
		departure: when
	})
	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: ewaldstrasse,
		to: schulweg
	})
	t.end()
})

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: ewaldstrasse,
		toId: kornmarkt,
		when
	})

	t.end()
})

tap.test('trip', async (t) => {
	const { journeys } = await client.journeys(jugendherberge, kornmarkt, {
		results: 1, departure: when
	})

	const p = journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Kornmarkt.', async (t) => {
	const res = await client.departures(kornmarkt, {
		duration: 20, when
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: kornmarkt
	})
	t.end()
})

tap.test('arrivals at Kornmarkt.', async (t) => {
	const res = await client.arrivals(kornmarkt, {
		duration: 20, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: kornmarkt
	})
	t.end()
})

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: kornmarkt,
		name: 'Kornmarkt',
		location: {
			type: 'location',
			latitude: 51.727914,
			longitude: 10.250606
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

tap.test('locations named Botanischer Garten', async (t) => {
	const locations = await client.locations('Botanischer Garten', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi))

	t.end()
})

tap.test('stop Jugendherberge', async (t) => {
	const s = await client.stop(jugendherberge)

	validate(t, s, ['stop', 'station'], 'stop')
	t.equal(s.id, jugendherberge)

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 52,
		west: 9.8,
		south: 51.51,
		east: 10
	}, {
		duration: 5 * 60, when, results: 10
	})
	validate(t, res, 'radarResult', 'res')
	t.end()
})
