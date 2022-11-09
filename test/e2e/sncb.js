import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as sncbProfile} from '../../p/sncb/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testArrivals} from './lib/arrivals.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1657618200 * 1000 // 2022-07-12T11:30+02:00
const when = createWhen(sncbProfile.timezone, sncbProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: sncbProfile.products,
	minLatitude: 46.513,
	maxLatitude: 54.521,
	minLongitude: -1.423,
	maxLongitude: 15.26
}

const validate = createValidate(cfg)

const client = createClient(sncbProfile, 'public-transport/hafas-client:test')

const gentStPieters = '8892007'
const bruxellesMidi = '8814001'
const gentPaddenhoek = {
	type: 'location',
	address: 'Gent, Paddenhoek',
	latitude: 51.051691, longitude: 3.724914,
}

tap.test('journeys – Gent Sant Pieters to Bruxelles Midi', async (t) => {
	const res = await client.journeys(gentStPieters, bruxellesMidi, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: gentStPieters,
		toId: bruxellesMidi
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

tap.test('trip details', async (t) => {
	const res = await client.journeys(gentStPieters, bruxellesMidi, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('arrivals at Bruxelles Midi', async (t) => {
	const res = await client.arrivals(bruxellesMidi, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: bruxellesMidi,
	})
	t.end()
})

// todo: nearby

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 51.065,
		west: 3.688,
		south: 51.04,
		east: 3.748
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
		address: gentPaddenhoek,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
