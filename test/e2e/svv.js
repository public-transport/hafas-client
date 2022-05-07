import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as svvProfile} from '../../p/svv/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testArrivals} from './lib/arrivals.js'
import {testReachableFrom} from './lib/reachable-from.js'
import {testServerInfo} from './lib/server-info.js'

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(svvProfile.timezone, svvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: svvProfile.products,
	minLatitude: 45.742,
	maxLatitude: 49.41,
	minLongitude: 8.177,
	maxLongitude: 18.448,
}

const validate = createValidate(cfg)

const client = createClient(svvProfile, 'public-transport/hafas-client:test')

const sam = '455086100'
const volksgarten = '455082100'
const zillnerstr2 = {
	type: 'location',
	id: '980133209',
	address: 'Zillnerstraße 2, 5020 Salzburg',
	latitude: 47.801434, longitude: 13.031006,
}

tap.test('journeys – Sam to Volksgarten', async (t) => {
	const res = await client.journeys(sam, volksgarten, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: sam,
		toId: volksgarten
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

tap.test('trip details', async (t) => {
	const res = await client.journeys(sam, volksgarten, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('arrivals at Volksgarten', async (t) => {
	const res = await client.arrivals(volksgarten, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: volksgarten,
	})
	t.end()
})

// todo: nearby

tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: zillnerstr2,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})

tap.test('serverInfo works', async (t) => {
	await testServerInfo({
		test: t,
		fetchServerInfo: client.serverInfo,
	})
})
