import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as rsagProfile} from '../../p/rsag/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testRefreshJourney} from './lib/refresh-journey.js'
import {testArrivals} from './lib/arrivals.js'
import {testReachableFrom} from './lib/reachable-from.js'

const T_MOCK = 1671260400 * 1000 // 2022-12-17T08:00:00+01:00
const when = createWhen(rsagProfile.timezone, rsagProfile.locale, T_MOCK)

const cfg = {
	when,
	// stationCoordsOptional: false,
	products: rsagProfile.products,
	minLatitude: 52.299,
	maxLatitude: 54.862,
	minLongitude: 9.121,
	maxLongitude: 14.824,
}

const validate = createValidate(cfg)

const client = createClient(rsagProfile, 'public-transport/hafas-client:test')

const sternwarte = '704956'
const sternwarte2 = '708539'
const weißesKreuz = '708573'

tap.test('journeys – Platz der Jugend to Weißes Kreuz', async (t) => {
	const res = await client.journeys(sternwarte, weißesKreuz, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromIds: [sternwarte, sternwarte2],
		toId: weißesKreuz,
	})
	t.end()
})

// todo: journeys, walkingSpeed
// todo: via works – with detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: sternwarte,
		toId: weißesKreuz,
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
		fromId: sternwarte,
		toId: weißesKreuz,
		when
	})
	t.end()
})

tap.test('arrivals at Platz der Jugend', async (t) => {
	const res = await client.arrivals(sternwarte, {
		duration: 30, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		ids: [
			sternwarte,
			'708539', // Rostock Sternwarte
		],
	})
	t.end()
})

// todo: nearby

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 54.116968,
		west: 12.029738,
		south: 54.060517,
		east: 12.203261
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
			id: '990004158',
			address: 'Rostock - Stadtmitte, Pläterstraße 2',
			latitude: 54.091285, longitude: 12.13648
		},
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})
