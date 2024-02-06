import tap from 'tap';
import isRoughlyEqual from 'is-roughly-equal';

import {createWhen} from './lib/util.js';
import {createClient} from '../../index.js';
import {profile as saarfahrplanProfile} from '../../p/saarfahrplan/index.js';
import {
	createValidateStation,
	createValidateStop,
} from './lib/validators.js';
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js';
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js';
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js';
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js';
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js';
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js';
import {testJourneysWithDetour} from './lib/journeys-with-detour.js';
import {testDepartures} from './lib/departures.js';
import {testDeparturesInDirection} from './lib/departures-in-direction.js';

const T_MOCK = 1671260400 * 1000; // 2022-12-17T08:00:00+01:00
const when = createWhen(saarfahrplanProfile.timezone, saarfahrplanProfile.locale, T_MOCK);

const cfg = {
	when,
	// stationCoordsOptional: false, @todo
	products: saarfahrplanProfile.products,
	minLatitude: 49,
	maxLatitude: 49.6,
	minLongitude: 6.1,
	maxLongitude: 7.5,
};

// @todo validateDirection: search list of stations for direction

const validate = createValidate(cfg);

const assertValidPrice = (t, p) => {
	t.ok(p);
	if (p.amount !== null) {
		t.equal(typeof p.amount, 'number');
		t.ok(p.amount > 0);
	}
	if (p.hint !== null) {
		t.equal(typeof p.hint, 'string');
		t.ok(p.hint);
	}
};

const client = createClient(saarfahrplanProfile, 'public-transport/hafas-client:test');

const saarbrueckenHbf = '8000323';
// This seems to be the bus/tram stop. 🙄
const hauptbahnhofSaarbruecken = '10600';
const saarlouisHbf = '8005247';
const metzVille = '8700019';
const saarbrueckenUhlandstr = '10609';

const thomasMannStr = {
	type: 'location',
	address: 'Neunkirchen, Thomas-Mann-Straße 1',
	latitude: 49.348307,
	longitude: 7.183613,
};

// @todo prices/tickets
// @todo journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: saarbrueckenHbf,
		toId: saarlouisHbf,
		when,
		products: saarfahrplanProfile.products,
	});
	t.end();
});

tap.test('Saarbrücken Hbf to Neunkirchen, Thomas-Mann-Straße 1', async (t) => {
	const res = await client.journeys(saarbrueckenHbf, thomasMannStr, {
		results: 3,
		departure: when,
	});

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: saarbrueckenHbf,
		to: thomasMannStr,
	});
	t.end();
});

tap.test('Saarbrücken Hbf to Schlossberghöhlen', async (t) => {
	const schlossberghoehlen = {
		type: 'location',
		id: '9000185',
		poi: true,
		name: 'Homburg, Schlossberghöhlen',
		latitude: 49.32071,
		longitude: 7.343764,
	};
	const res = await client.journeys(saarbrueckenHbf, schlossberghoehlen, {
		results: 3, departure: when,
	});

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromId: saarbrueckenHbf,
		to: schlossberghoehlen,
	});
	t.end();
});

tap.test('journeys: via works – with detour', async (t) => {
	// Going from Lessingstr. to An der Trift via Steubenstr. without detour
	// is currently impossible. We check if the routing engine computes a detour.
	const lessingstr = '10615';
	const anDerTrift = '10801';
	const steubenstr = '10051';
	const res = await client.journeys(lessingstr, anDerTrift, {
		via: steubenstr,
		results: 1,
		departure: when,
		stopovers: true,
	});

	await testJourneysWithDetour({
		test: t,
		res,
		validate,
		detourIds: [steubenstr],
	});
	t.end();
});

// todo: journeys: via works – without detour

tap.test('earlier/later journeys, Saarbrücken Hbf -> Saarlouis Hbf', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: saarbrueckenHbf,
		toId: saarlouisHbf,
		when,
	});

	t.end();
});

tap.test('trip details', async (t) => {
	const res = await client.journeys(saarlouisHbf, metzVille, {
		results: 1, departure: when,
	});

	const p = res.journeys[0].legs.find(l => !l.walking);
	t.ok(p.tripId, 'precondition failed');
	t.ok(p.line.name, 'precondition failed');

	const tripRes = await client.trip(p.tripId, {when});

	validate(t, tripRes, 'tripResult', 'res');
	t.end();
});

tap.test('departures', async (t) => {
	const res = await client.departures(saarbrueckenUhlandstr, {
		duration: 5, when,
	});

	await testDepartures({
		test: t,
		res,
		validate,
		id: saarbrueckenUhlandstr,
	});
	t.end();
});

tap.test('departures with stop object', async (t) => {
	const res = await client.departures({
		type: 'stop',
		id: saarbrueckenHbf,
		name: 'Saarbrücken Hbf',
		location: {
			type: 'location',
			latitude: 49.241066,
			longitude: 6.991019,
		},
	}, {when});

	validate(t, res, 'departuresResponse', 'res');
	t.end();
});

tap.test('departures at Uhlandstr., Saarbrücken in direction of Landwehrplatz', async (t) => {
	const saarbrueckenLandwehrplatz = '10606';
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: saarbrueckenUhlandstr,
		directionIds: [saarbrueckenLandwehrplatz],
		when,
		validate,
	});
	t.end();
});

// todo: arrivals

tap.test('nearby Saarbrücken Hbf', async (t) => {
	const nearby = await client.nearby({
		type: 'location',
		latitude: 49.241066,
		longitude: 6.991019,
	}, {
		results: 5, distance: 400,
	});

	validate(t, nearby, 'locations', 'nearby');
	t.equal(nearby.length, 5);

	const s = nearby[0];
	t.equal(s.id, saarbrueckenHbf, 'id should be ' + saarbrueckenHbf);
	t.equal(s.name, 'Saarbrücken Hbf');
	t.ok(isRoughlyEqual(0.0005, s.location.latitude, 49.241066));
	t.ok(isRoughlyEqual(0.0005, s.location.longitude, 6.991019));
	t.ok(s.distance >= 0);
	t.ok(s.distance <= 100);

	t.end();
});

tap.test('locations named Saarbrücken', async (t) => {
	const aufDerWerthBürgerpark = '10204';
	const locations = await client.locations('bürgerpark', {
		results: 20,
	});

	validate(t, locations, 'locations', 'locations');
	t.ok(locations.length <= 20);

	t.ok(locations.find(s => s.type === 'stop' || s.type === 'station'));
	t.ok(locations.find(s => s.poi)); // POIs
	t.ok(locations.some((s) => {
		return s.station && s.station.id === aufDerWerthBürgerpark || s.id === aufDerWerthBürgerpark;
	}));

	t.end();
});

tap.test('stop', async (t) => {
	const s = await client.stop(saarbrueckenUhlandstr);

	validate(t, s, ['stop', 'station'], 'stop');
	t.equal(s.id, saarbrueckenUhlandstr);

	t.end();
});

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 49.27,
		west: 6.97,
		south: 49.22,
		east: 7.02,
	}, {
		duration: 5 * 60, when,
	});

	validate(t, res, 'radarResult', 'res');
	t.end();
});
