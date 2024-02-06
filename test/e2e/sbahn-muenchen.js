import tap from 'tap';

import {createWhen} from './lib/util.js';
import {createClient} from '../../index.js';
import {profile as sMunichProfile} from '../../p/sbahn-muenchen/index.js';
import {createValidateMovement as _createValidateMovement} from './lib/validators.js';
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js';
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js';
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js';
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js';
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js';
import {testRefreshJourney} from './lib/refresh-journey.js';
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js';
import {testDepartures} from './lib/departures.js';
import {testArrivals} from './lib/arrivals.js';
import {testJourneysWithDetour} from './lib/journeys-with-detour.js';
import {testReachableFrom} from './lib/reachable-from.js';

const T_MOCK = 1668495600 * 1000; // 2022-11-15T08:00:00+01:00
const when = createWhen(sMunichProfile.timezone, sMunichProfile.locale, T_MOCK);

const cfg = {
	when,
	stationCoordsOptional: false,
	products: sMunichProfile.products,
	minLatitude: 48,
	maxLatitude: 48.3,
	minLongitude: 11.3,
	maxLongitude: 11.8,
};

const _validateMovement = _createValidateMovement(cfg);
const validateMovement = (val, m, name = 'movement') => {
	const dummyStopA = {type: 'stop', id: '123'};
	const dummyStopB = {type: 'stop', id: '321'};

	const withFakeFrame = Object.assign({}, m);
	if (!m.frames.length) {
		withFakeFrame.frames = [
			{t: 5, origin: dummyStopA, destination: dummyStopB},
		];
	}
	_validateMovement(val, withFakeFrame, name);
};

const validate = createValidate(cfg, {
	movement: validateMovement,
});

const client = createClient(sMunichProfile, 'public-transport/hafas-client:test');

const mittersendling = '8004154';
const karlTheodorStr = '638842'; // Karl-Theodor-Straße
const lehel = '624826';
const poetschnerstr = {
	type: 'location',
	address: 'Pötschnerstraße 3, Neuhausen',
	latitude: 48.152499,
	longitude: 11.531695,
};

tap.test('journeys – Mittersendling to Karl-Theodor-Straße', async (t) => {
	const res = await client.journeys(mittersendling, karlTheodorStr, {
		results: 4,
		departure: when,
		stopovers: true,
	});

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: mittersendling,
		toId: karlTheodorStr,
	});
	t.end();
});

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: mittersendling,
		toId: karlTheodorStr,
		when,
		products: sMunichProfile.products,
	});
	t.end();
});

tap.test('Karl-Theodor-Straße to Pötschnerstraße 3, Neuhausen', async (t) => {
	const res = await client.journeys(karlTheodorStr, poetschnerstr, {
		results: 3,
		departure: when,
	});

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: karlTheodorStr,
		to: poetschnerstr,
	});
	t.end();
});

tap.test('Karl-Theodor-Straße to Hofbräuhaus', async (t) => {
	const hofbraeuhaus = {
		type: 'location',
		id: '970008829',
		poi: true,
		name: 'München, Hofbräuhaus München',
		latitude: 48.137739,
		longitude: 11.579823,
	};
	const res = await client.journeys(karlTheodorStr, hofbraeuhaus, {
		results: 3,
		departure: when,
	});

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: karlTheodorStr,
		to: hofbraeuhaus,
	});
	t.end();
});

// todo: walkingSpeed "München - Freimann, Gyßlingstraße 78" -> lehel
// todo: via works – with detour
// todo: without detour

tap.test('earlier/later journeys', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: mittersendling,
		toId: karlTheodorStr,
		when,
	});

	t.end();
});

// todo: for some reason, a leg is missing in the journey returned by refreshJourney()
tap.skip('refreshJourney', async (t) => {
	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: mittersendling,
		toId: karlTheodorStr,
		when,
	});
	t.end();
});

tap.test('trip details', async (t) => {
	const res = await client.journeys(mittersendling, karlTheodorStr, {
		results: 1, departure: when,
	});

	const p = res.journeys[0].legs.find(l => !l.walking);
	t.ok(p.tripId, 'precondition failed');
	t.ok(p.line.name, 'precondition failed');

	const tripRes = await client.trip(p.tripId, {when});

	validate(t, tripRes, 'tripResult', 'res');
	t.end();
});

tap.test('departures at Dietlindenstraße', async (t) => {
	const dietlindenstr = '624391';
	const res = await client.departures(dietlindenstr, {
		duration: 10, when,
	});

	await testDepartures({
		test: t,
		res,
		validate,
		id: dietlindenstr,
	});
	t.end();
});

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: mittersendling,
		name: 'Mittersendling',
		location: {
			type: 'location',
			latitude: 48.107418,
			longitude: 11.536306,
		},
	}, {when});

	validate(t, res, 'departuresResponse', 'res');
	t.end();
});

tap.test('arrivals at Karl-Theodor-Straße', async (t) => {
	const res = await client.arrivals(karlTheodorStr, {
		duration: 10, when,
	});

	await testArrivals({
		test: t,
		res,
		validate,
		id: karlTheodorStr,
	});
	t.end();
});

// todo: nearby

tap.test('locations named "Nationaltheater"', async (t) => {
	const nationaltheater = '624639';
	const locations = await client.locations('Nationaltheater', {
		results: 10,
	});

	validate(t, locations, 'locations', 'locations');
	t.ok(locations.length <= 10);

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'));
	t.ok(locations.find(s => s.poi)); // POIs
	t.ok(locations.some((l) => {
		return l.station && l.station.id === nationaltheater || l.id === nationaltheater;
	}));

	t.end();
});

tap.test('station Karl-Theodor-Straße', async (t) => {
	const s = await client.stop(karlTheodorStr);

	validate(t, s, ['stop', 'station'], 'station');
	t.equal(s.id, karlTheodorStr);

	t.end();
});

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 48.145121,
		west: 11.543736,
		south: 48.138339,
		east: 11.553776,
	}, {
		duration: 5 * 60, when, results: 10,
	});

	validate(t, res, 'radarResult', 'res');
	t.end();
});

tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: poetschnerstr,
		when,
		maxDuration: 15,
		validate,
	});
	t.end();
});
