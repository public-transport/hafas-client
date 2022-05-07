import tap from 'tap'
import isRoughlyEqual from 'is-roughly-equal'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as hvvProfile} from '../../p/hvv/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testDepartures} from './lib/departures.js'
import {testDeparturesInDirection} from './lib/departures-in-direction.js'
import {testArrivals} from './lib/arrivals.js'

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(hvvProfile.timezone, hvvProfile.locale, T_MOCK)

const cfg = {
	when,
	// stationCoordsOptional: false,
	products: hvvProfile.products,
	// minLatitude: 50.7,
	// maxLatitude: 53.2,
	// minLongitude: 10.25,
	// maxLongitude: 13.4
}

const validate = createValidate(cfg, {})

const client = createClient(hvvProfile, 'public-transport/hafas-client:test')

const tiefstack = '4117'
const barmbek = '4933'
const altona = '20626'
// const hasselbachplatzSternstrasse = '6545'
// const stendal = '8010334'
// const dessau = '8010077'

tap.skip('journeys – Hamburg Tiefstack to Hamburg Barmbek', async (t) => {
	const res = await client.journeys(tiefstack, barmbek, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: tiefstack,
		toId: barmbek
	})
	t.end()
})

// todo: journeys, only one product

tap.skip('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: tiefstack,
		toId: barmbek,
		when,
		products: hvvProfile.products,
	})
	t.end()
})

tap.skip('Hamburg Tiefstack to Gilbertstr. 30, Hamburg', async (t) => {
	const gilbertstr30 = {
		type: 'location',
		id: '970026640',
		address: 'Hamburg, Gilbertstraße 30',
		latitude: 53.554791,
		longitude: 9.95781
	}

	const res = await client.journeys(tiefstack, gilbertstr30, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: tiefstack,
		to: gilbertstr30
	})
	t.end()
})

tap.skip('Hamburg Tiefstack to Hamburger Meile', async (t) => {
	const meile = {
		type: 'location',
		id: '980001841',
		poi: true,
		name: 'Hamburger Meile',
		latitude: 53.572455,
		longitude: 10.030541
	}
	const res = await client.journeys(tiefstack, meile, {
		results: 3,
		departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: tiefstack,
		to: meile
	})
	t.end()
})

// todo: via works – with detour
// todo: via works – without detour

tap.skip('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: tiefstack,
		toId: barmbek,
		when
	})

	t.end()
})

tap.skip('trip details', async (t) => {
	const res = await client.journeys(tiefstack, barmbek, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.skip('departures at Hamburg Barmbek', async (t) => {
	const res = await client.departures(barmbek, {
		duration: 5, when,
	})

	await testDepartures({
		test: t,
		res,
		validate,
		id: barmbek
	})
	t.end()
})

tap.skip('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: tiefstack,
		name: 'Hamburg Tiefstack',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

tap.skip('departures at Barmbek in direction of Altona', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: barmbek,
		directionIds: [altona],
		when,
		validate
	})
	t.end()
})

tap.skip('arrivals at Hamburg Barmbek', async (t) => {
	const res = await client.arrivals(barmbek, {
		duration: 5, when
	})

	await testArrivals({
		test: t,
		res,
		validate,
		id: barmbek
	})
	t.end()
})

// todo: nearby

tap.skip('locations named Elbphilharmonie', async (t) => {
	const elbphilharmonie = '6242'
	const locations = await client.locations('Elbphilharmonie', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === elbphilharmonie || l.id === elbphilharmonie
	}))

	t.end()
})

tap.skip('station Hamburg Barmbek', async (t) => {
	const s = await client.stop(barmbek)

	validate(t, s, ['stop', 'station'], 'station')
	t.equal(s.id, barmbek)

	t.end()
})

tap.skip('radar', async (t) => {
	const res = await client.radar({
		north: 53.569,
		west: 10.022,
		south: 53.55,
		east: 10.0436
	}, {
		duration: 5 * 60, when, results: 10
	})

	validate(t, res, 'radarResult', 'res')
	t.end()
})
