import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as vbnProfile} from '../../p/vbn/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testArrivals} from './lib/arrivals.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1652175000 * 1000 // 2022-05-10T11:30+02:00
const when = createWhen(vbnProfile.timezone, vbnProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: vbnProfile.products,
	minLatitude: 51.817,
	maxLatitude: 53.657,
	minLongitude: 5.248,
	maxLongitude: 11.719
}

const validate = createValidate(cfg)

const client = createClient(vbnProfile, 'public-transport/hafas-client:test')

const oldenburg = '8000291'
const bremenHumboldtstr = '9013973'

tap.test('journeys – Oldenburg to Bremen Humboldtstr.', async (t) => {
	const res = await client.journeys(oldenburg, bremenHumboldtstr, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: oldenburg,
		toId: bremenHumboldtstr
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

tap.test('trip details', async (t) => {
	const res = await client.journeys(oldenburg, bremenHumboldtstr, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('arrivals at Bremen Humboldtstr.', async (t) => {
	const res = await client.arrivals(bremenHumboldtstr, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: bremenHumboldtstr,
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

// todo: fails with "HCI Service: location missing or invalid"
tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: {
			type: 'location',
			id: '910001336',
			name: 'Rathaus, Bremen',
			poi: true,
			latitude: 53.076053, longitude: 8.808008,
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
