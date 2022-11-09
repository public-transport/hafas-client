import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as rmvProfile} from '../../p/rmv/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testArrivals} from './lib/arrivals.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(rmvProfile.timezone, rmvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: rmvProfile.products,
	minLatitude: 47,
	maxLatitude: 54,
	minLongitude: 6,
	maxLongitude: 11,
}

const validate = createValidate(cfg)

const client = createClient(rmvProfile, 'public-transport/hafas-client:test')

const frankfurtOstendstr = '3000525'
const wiesbadenHbf = '3006907'

tap.test('journeys – Frankfurt Ostendstr. to Wiesbaden Hbf', async (t) => {
	const res = await client.journeys(frankfurtOstendstr, wiesbadenHbf, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: frankfurtOstendstr,
		toId: wiesbadenHbf
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

tap.test('trip details', async (t) => {
	const res = await client.journeys(frankfurtOstendstr, wiesbadenHbf, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('arrivals at Wiesbaden Hbf', async (t) => {
	const res = await client.arrivals(wiesbadenHbf, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: wiesbadenHbf,
	})
	t.end()
})

// todo: nearby

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 53.090516,
		west: 8.750106,
		south: 53.062859,
		east: 8.847423
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
			id: '9001709',
			name: 'Frankfurt (Main) Musterschule',
			poi: true,
			latitude: 50.122027, longitude: 8.68536,
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
