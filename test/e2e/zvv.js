import tap from 'tap'
import isRoughlyEqual from 'is-roughly-equal'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as zvvProfile} from '../../p/zvv/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testDepartures} from './lib/departures.js'
import {testDeparturesInDirection} from './lib/departures-in-direction.js'
import {testArrivals} from './lib/arrivals.js'

const T_MOCK = 1671260400 * 1000 // 2022-12-17T08:00:00+01:00
const when = createWhen(zvvProfile.timezone, zvvProfile.locale, T_MOCK)

const validate = createValidate({
	when,
	products: zvvProfile.products,
	maxLatitude: 47.75,
	minLongitude: 7.38,
	minLatitude: 46.99,
	maxLongitude: 9.71,
}, {})

const client = createClient(zvvProfile, 'public-transport/hafas-client:test')

const bürkliplatz = '8591105'
const ethUniversitätsspital = '8591123'

tap.test('journeys – Bürkliplatz to ETH/Universitätsspital', async (t) => {
	const res = await client.journeys(bürkliplatz, ethUniversitätsspital, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: bürkliplatz,
		toId: ethUniversitätsspital
	})
	t.end()
})

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: bürkliplatz,
		toId: ethUniversitätsspital,
		when
	})

	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(bürkliplatz, ethUniversitätsspital, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at ETH/Universitätsspital', async (t) => { // todo
	const polyterrasseETH = '8503500'
	const res = await client.departures(ethUniversitätsspital, {
		duration: 5, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		ids: [ethUniversitätsspital, polyterrasseETH],
	})
	t.end()
})

// todo: departures in direction
// todo: nearby

tap.test('locations named Rennweg', async (t) => {
	const rennweg = '8591316'
	const locations = await client.locations('Rennweg', {
		results: 20,
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.some((l) => {
		return l.station && l.station.id === rennweg || l.id === rennweg
	}))

	t.end()
})

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 47.387,
		west: 8.514,
		south: 47.356,
		east: 8.568,
	}, {
		duration: 5 * 60, when, results: 10,
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})
