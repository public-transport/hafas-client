import tap from 'tap';
import isRoughlyEqual from 'is-roughly-equal';

import {createWhen} from './lib/util.js';
import {createClient} from '../../index.js';
import {profile as nahshProfile} from '../../p/nahsh/index.js';
import {
	createValidateLine,
	createValidateStation,
} from './lib/validators.js';
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js';
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js';
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js';
import {testJourneysStationToPoi} from './lib/journeys-station-to-poi.js';
import {testEarlierLaterJourneys} from './lib/earlier-later-journeys.js';
import {testRefreshJourney} from './lib/refresh-journey.js';
import {journeysFailsWithNoProduct} from './lib/journeys-fails-with-no-product.js';
import {testDepartures} from './lib/departures.js';
import {testDeparturesInDirection} from './lib/departures-in-direction.js';
import {testArrivals} from './lib/arrivals.js';
import {testReachableFrom} from './lib/reachable-from.js';

const T_MOCK = 1670310000 * 1000; // 2022-12-06T08:00:00+01:00
// const T_MOCK = 1668495600 * 1000 // 2022-11-15T08:00:00+01:00
const when = createWhen(nahshProfile.timezone, nahshProfile.locale, T_MOCK);

const cfg = {
	when,
	stationCoordsOptional: false,
	products: nahshProfile.products,
	maxLatitude: 55.15,
	minLongitude: 7.5,
	minLatitude: 53.15,
	maxLongitude: 11.6,
};

const _validateLine = createValidateLine(cfg);
const validateLine = (validate, l, name) => {
	if (l && l.product === 'onCall') {
		// skip line validation
		// https://github.com/derhuerst/hafas-client/issues/8#issuecomment-355839965
		l = Object.assign({}, l);
		l.mode = 'taxi';
	}
	_validateLine(validate, l, name);
};

const validate = createValidate(cfg, {
	line: validateLine,
});

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

const client = createClient(nahshProfile, 'public-transport/hafas-client:test');

const kielHbf = '9049079';
const kielHbf2 = '9049076';
const flensburg = '9027253';
const luebeckHbf = '9057819';
const husum = '9044660';
const schleswig = '9081683';
const ellerbekerMarkt = '9049027';
const seefischmarkt = '9049245';
const kielRaeucherei = '9049217';

tap.test('journeys – Kiel Hbf to Flensburg', async (t) => {
	const res = await client.journeys(kielHbf, flensburg, {
		results: 4,
		departure: when,
		stopovers: true,
	});

	const kaistr = '9049113';
	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromIds: [kielHbf, kaistr],
		toId: flensburg,
	});

	for (let i = 0; i < res.journeys.length; i++) {
		const j = res.journeys[i];
		// todo: find a journey where there pricing info is always available
		if (j.price) {
			assertValidPrice(t, j.price, `res.journeys[${i}].price`);
		}
	}

	t.end();
});

// todo: journeys, only one product

tap.test('journeys – fails with no product', async (t) => {
	await journeysFailsWithNoProduct({
		test: t,
		fetchJourneys: client.journeys,
		fromId: kielHbf,
		toId: flensburg,
		when,
		products: nahshProfile.products,
	});
	t.end();
});

tap.test('Kiel Hbf to Berliner Str. 80, Husum', async (t) => {
	const berlinerStr = {
		type: 'location',
		address: 'Husum, Berliner Straße 80',
		latitude: 54.488995,
		longitude: 9.056263,
	};
	const res = await client.journeys(kielHbf, berlinerStr, {
		results: 3,
		departure: when,
	});

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromIds: [kielHbf, kielHbf2],
		to: berlinerStr,
	});
	t.end();
});

tap.test('Kiel Hbf to Holstentor', async (t) => {
	const holstentor = {
		type: 'location',
		id: '970003168',
		poi: true,
		name: 'Hansestadt Lübeck, Holstentor (Denkmal)',
		latitude: 53.866321,
		longitude: 10.679976,
	};
	const res = await client.journeys(kielHbf, holstentor, {
		results: 3,
		departure: when,
	});

	await testJourneysStationToPoi({
		test: t,
		res,
		validate,
		fromIds: [kielHbf, kielHbf2],
		to: holstentor,
	});
	t.end();
});

tap.test('Husum to Lübeck Hbf with stopover at Kiel Hbf', async (t) => {
	const res = await client.journeys(husum, luebeckHbf, {
		via: kielHbf,
		results: 1,
		departure: when,
		stopovers: true,
	});

	validate(t, res, 'journeysResult', 'res');

	const leg = res.journeys[0].legs.some((leg) => {
		return leg.stopovers && leg.stopovers.some((stopover) => {
			const s = stopover.stop;
			return s.station && s.station.id === kielHbf || s.id === kielHbf;
		});
	});
	t.ok(leg, 'Kiel Hbf is not being passed');

	t.end();
});

tap.test('earlier/later journeys, Kiel Hbf -> Flensburg', async (t) => {
	await testEarlierLaterJourneys({
		test: t,
		fetchJourneys: client.journeys,
		validate,
		fromId: kielHbf,
		toId: flensburg,
		when,
	});

	t.end();
});

tap.test('refreshJourney', async (t) => {
	await testRefreshJourney({
		test: t,
		fetchJourneys: client.journeys,
		refreshJourney: client.refreshJourney,
		validate,
		fromId: kielHbf,
		toId: flensburg,
		when,
	});
	t.end();
});

// todo: with detour test
// todo: without detour test

tap.test('trip details', async (t) => {
	const res = await client.journeys(flensburg, husum, {
		results: 1, departure: when,
	});

	const p = res.journeys[0].legs.find(l => !l.walking);
	t.ok(p.tripId, 'precondition failed');
	t.ok(p.line.name, 'precondition failed');

	const tripRes = await client.trip(p.tripId, {when});

	validate(t, tripRes, 'tripResult', 'res');
	t.end();
});

tap.test('departures at Kiel Räucherei', async (t) => {
	const res = await client.departures(kielRaeucherei, {
		duration: 30, when,
	});

	await testDepartures({
		test: t,
		res,
		validate,
		id: kielRaeucherei,
	});
	t.end();
});

tap.test('departures with station object', async (t) => {
	const res = await client.departures({
		type: 'station',
		id: kielHbf,
		name: 'Kiel Hbf',
		location: {
			type: 'location',
			latitude: 1.23,
			longitude: 2.34,
		},
	}, {when});

	validate(t, res, 'departuresResponse', 'res');
	t.end();
});

tap.test('departures at Berlin Hbf in direction of Berlin Ostbahnhof', async (t) => {
	await testDeparturesInDirection({
		test: t,
		fetchDepartures: client.departures,
		fetchTrip: client.trip,
		id: ellerbekerMarkt,
		directionIds: [seefischmarkt, '710102'],
		when,
		validate,
	});
	t.end();
});

tap.test('arrivals at Kiel Räucherei', async (t) => {
	const res = await client.arrivals(kielRaeucherei, {
		duration: 30, when,
	});

	await testArrivals({
		test: t,
		res,
		validate,
		id: kielRaeucherei,
	});
	t.end();
});

tap.test('nearby Kiel Hbf', async (t) => {
	const kielHbfPosition = {
		type: 'location',
		latitude: 54.314982,
		longitude: 10.131976,
	};
	const nearby = await client.nearby(kielHbfPosition, {
		results: 2, distance: 400,
	});

	validate(t, nearby, 'locations', 'nearby');

	t.ok(Array.isArray(nearby));
	t.equal(nearby.length, 2);

	const match = nearby.find(n => n.id === kielHbf || n.station?.id === kielHbf);
	t.ok(match);
	t.equal(match.name, 'Kiel Hbf');
	t.ok(match.distance >= 0);
	t.ok(match.distance <= 100);

	t.end();
});

tap.test('locations named "Kiel Rathaus"', async (t) => {
	const kielRathaus = '9049200';
	const locations = await client.locations('Kiel Rathaus', {
		results: 15,
	});

	validate(t, locations, 'locations', 'locations');
	t.ok(locations.length <= 15);

	t.ok(locations.find(l => l.type === 'stop' || l.type === 'station'));
	t.ok(locations.find(l => l.poi)); // POIs
	t.ok(locations.some(l => l.station && l.station.id === kielRathaus || l.id === kielRathaus));

	t.end();
});

tap.test('stop', async (t) => {
	const s = await client.stop(kielHbf);

	validate(t, s, ['stop', 'station'], 'stop');
	t.equal(s.id, kielHbf);

	t.end();
});

tap.test('radar', async (t) => {
	const res = await client.radar({
		north: 54.4,
		west: 10.0,
		south: 54.2,
		east: 10.2,
	}, {
		duration: 5 * 60, when,
	});

	// todo: cfg.stationProductsOptional option
	const {products} = nahshProfile;
	const allProducts = products.reduce((acc, p) => (acc[p.id] = true, acc), {});
	const validateStation = createValidateStation(cfg);
	const validate = createValidate(cfg, {
		station: (validate, s, name) => {
			s = Object.assign({
				products: allProducts, // todo: fix station.products
			}, s);
			if (!s.name) {
				s.name = 'foo';
			} // todo, see #34
			validateStation(validate, s, name);
		},
	});
	validate(t, res, 'radarResult', 'res');

	t.end();
});

tap.test('reachableFrom', async (t) => {
	const berlinerStr = {
		type: 'location',
		address: 'Husum, Berliner Straße 80',
		latitude: 54.488995,
		longitude: 9.056263,
	};

	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: berlinerStr,
		when,
		maxDuration: 60,
		validate,
	});
	t.end();
});
