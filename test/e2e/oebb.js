import tap from 'tap'
import isRoughlyEqual from 'is-roughly-equal'
import validateLine from 'validate-fptf/line.js'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as oebbProfile} from '../../p/oebb/index.js'
import {
	createValidateStation,
	createValidateStop,
} from './lib/validators.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js'
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js'
import {testRefreshJourney} from './lib/refresh-journey.js'
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js'
import {testJourneysWithDetour} from './lib/journeys-with-detour.js'
import {testDepartures} from './lib/departures.js'
import {testDeparturesInDirection} from './lib/departures-in-direction.js'

const T_MOCK = 1671260400 * 1000 // 2022-12-17T08:00:00+01:00
const when = createWhen(oebbProfile.timezone, oebbProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: oebbProfile.products,
	minLatitude: 45.992803,
	maxLatitude: 49.453517,
	minLongitude: 8.787557,
	maxLongitude: 17.491275
}

// todo validateDirection: search list of stations for direction

const validate = createValidate(cfg)

const _validateStop = createValidateStop(cfg)

const assertValidPrice = (t, p) => {
	t.ok(p)
	if (p.amount !== null) {
		t.equal(typeof p.amount, 'number')
		t.ok(p.amount > 0)
	}
	if (p.hint !== null) {
		t.equal(typeof p.hint, 'string')
		t.ok(p.hint)
	}
}

const client = createClient(oebbProfile, 'public-transport/hafas-client:test')

const salzburgHbf = '8100002'
const wienFickeystr = '911014'
const wien = '1190100'
const wienWestbahnhof = '1291501'
const klagenfurtHbf = '8100085'
const muenchenHbf = '8000261'
const wienRenngasse = '1390186'
const wienKarlsplatz = '1390461'
const wienPilgramgasse = '1390562'

tap.test('journeys – Salzburg Hbf to Wien Westbahnhof', async (t) => {
	const res = await client.journeys(salzburgHbf, wienFickeystr, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: salzburgHbf,
		toId: wienFickeystr
	})

	for (let i = 0; i < res.journeys.length; i++) {
		const j = res.journeys[i]
		if (j.price) assertValidPrice(t, j.price, `res.journeys[${i}].price`)
	}

	t.end()
})

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: salzburgHbf,
		toId: wienFickeystr,
		when,
		products: oebbProfile.products,
	})
	t.end()
})

tap.test('Salzburg Hbf to 1220 Wien, Fischerstrand 7', async (t) => {
	const wagramerStr = {
		type: 'location',
		address: '1220 Wien, Fischerstrand 7',
		latitude: 48.236216,
		longitude: 16.425863
	}
	const res = await client.journeys(salzburgHbf, wagramerStr, {
		results: 3,
		departure: when
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: salzburgHbf,
		to: wagramerStr
	})
	t.end()
})

tap.test('Salzburg Hbf to Uni Wien', async (t) => {
	const uniWien = {
		type: 'location',
		id: '970085780',
		poi: true,
		name: 'Wien, Donaupark (Parkplatz)',
		latitude: 48.240674, longitude: 16.4097,
	}
	const res = await client.journeys(salzburgHbf, uniWien, {
		results: 3, departure: when
	})

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: salzburgHbf,
		to: uniWien,
	})
	t.end()
})

tap.test('journeys: via works – with detour', async (t) => {
	// Going from Stephansplatz to Schottenring via Donauinsel without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const stephansplatz = '1390167'
	const schottenring = '1390163'
	const donauinsel = '1392277'
	const donauinselPassed = '922001'
	const res = await client.journeys(stephansplatz, schottenring, {
		via: donauinsel,
		results: 1,
		departure: when,
		stopovers: true
	})

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [donauinsel, donauinselPassed]
	})
	t.end()
})

tap.test('journeys: via works – without detour', async (t) => {
	// When going from Karlsplatz to Praterstern via Museumsquartier, there is
	// *no need* to change trains / no need for a "detour".
	const karlsplatz = '1390461'
	const praterstern = '1290201'
	const stephansplatz = '1390167'
	const stephansplatzPassed = '901006'

	const res = await client.journeys(karlsplatz, praterstern, {
		via: stephansplatz,
		results: 1,
		departure: when,
		stopovers: true
	})

	validate(t, res, 'journeysResult', 'res')

	const l1 = res.journeys[0].legs.some((leg) => {
		return (
			leg.destination.id === stephansplatz ||
			leg.destination.id === stephansplatzPassed
		)
	})
	t.notOk(l1, 'transfer at Museumsquartier')

	const l2 = res.journeys[0].legs.some((leg) => {
		return leg.stopovers && leg.stopovers.some((stopover) => {
			return stopover.stop.id === stephansplatzPassed
		})
	})
	t.ok(l2, 'Museumsquartier is not being passed')

	t.end()
})

tap.test('earlier/later journeys, Salzburg Hbf -> Wien Westbahnhof', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: salzburgHbf,
		toId: wienWestbahnhof,
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
		fromId: salzburgHbf,
		toId: wienWestbahnhof,
		when
	})
	t.end()
})

tap.test('trip details', async (t) => {
	const res = await client.journeys(wienWestbahnhof, muenchenHbf, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')

	const tripRes = await client.trip(p.tripId, {when})

	validate(t, tripRes, 'tripResult', 'res')
	t.end()
})

tap.test('departures at Wien Leibenfrostgasse', async (t) => {
	const wienLeibenfrostgasse = '1390469'
	const ids = [
		wienLeibenfrostgasse, // station
		'904029', // stop "Wien Leibenfrostgasse (Phorusgasse)s"
		'904030' // stop "Wien Leibenfrostgasse (Ziegelofengasse)"
	]

	const res = await client.departures(wienLeibenfrostgasse, {
		duration: 15, when,
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
		id: salzburgHbf,
		name: 'Salzburg Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34
		}
	}, {when})

	validate(t, res, 'departuresResponse', 'res')
	t.end()
})

tap.test('departures at Karlsplatz in direction of Pilgramgasse', async (t) => {
	const subStops = (await client.stop(wienPilgramgasse, {
		subStops: true, entrances: false,
	})).stops || []

	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: wienKarlsplatz,
		directionIds: [wienPilgramgasse, ...subStops.map(s => s.id)],
		when,
		validate
	})
	t.end()
})

// todo: arrivals

tap.test('nearby Salzburg Hbf', async (t) => {
	const nearby = await client.nearby({
		type: 'location',
		longitude: 13.045605,
		latitude: 47.812852
	}, {
		results: 5, distance: 400
	})

	validate(t, nearby, 'locations', 'nearby')
	t.equal(nearby.length, 5)

	const s = nearby[0]
	t.equal(s.id, salzburgHbf, 'id should be ' + salzburgHbf)
	t.equal(s.name, 'Salzburg Hbf')
	t.ok(isRoughlyEqual(.0005, s.location.latitude, 47.812851))
	t.ok(isRoughlyEqual(.0005, s.location.longitude, 13.045604))
	t.ok(s.distance >= 0)
	t.ok(s.distance <= 100)

	t.end()
})

tap.test('locations named Salzburg', async (t) => {
	const salzburgVolksgarten = '591161'
	const locations = await client.locations('Salzburg volksgarten', {
		results: 20
	})

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.length <= 20)

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'))
	t.ok(locations.find(s => s.poi)) // POIs
	t.ok(locations.some((s) => {
		return s.station && s.station.id === salzburgVolksgarten || s.id === salzburgVolksgarten
	}))

	t.end()
})

tap.test('stop', async (t) => {
	const loc = await client.stop(wienRenngasse)

	// todo: find a way to always get products from the API
	// todo: cfg.stationProductsOptional option
	const {products} = oebbProfile
	const allProducts = products.reduce((acc, p) => (acc[p.id] = true, acc), {})
	const validateStation = createValidateStation(cfg)
	const validate = createValidate(cfg, {
		stop: (validate, s, name) => {
			const withFakeProducts = Object.assign({products: allProducts}, s)
			_validateStop(validate, withFakeProducts, name)
		},
		station: (validate, s, name) => {
			const withFakeProducts = Object.assign({products: allProducts}, s)
			validateStation(validate, withFakeProducts, name)
		}
	})
	validate(t, loc, ['stop', 'station'], 'stop')

	t.equal(loc.id, wienRenngasse)

	t.end()
})

tap.test('radar Salzburg', async (t) => {
	let res = await client.radar({
		north: 47.827203,
		west: 13.001261,
		south: 47.773278,
		east: 13.07562
	}, {
		duration: 5 * 60, when
	})

	// todo: find a way to always get frames from the API
	res.movements = res.movements.filter(m => m.frames && m.frames.length > 0)

	// todo: find a way to always get products from the API
	// todo: cfg.stationProductsOptional option
	const {products} = oebbProfile
	const allProducts = products.reduce((acc, p) => (acc[p.id] = true, acc), {})
	const validateStation = createValidateStation(cfg)
	const validate = createValidate(cfg, {
		station: (validate, s, name) => {
			const withFakeProducts = Object.assign({products: allProducts}, s)
			validateStation(validate, withFakeProducts, name)
		},
		line: (val, line, name = 'line') => {
			validateLine(val, {
				...line,
				// fptf demands a mode
				mode: line.mode === null ? 'bus' : line.mode,
			}, name)
		},
	})
	validate(t, res, 'radarResult', 'res')

	t.end()
})
