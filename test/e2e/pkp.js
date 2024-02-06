import tap from 'tap';

import {createWhen} from './lib/util.js';
import {createClient} from '../../index.js';
import {profile as pkpProfile} from '../../p/pkp/index.js';
import {
	createValidateLine,
	createValidateJourneyLeg,
	createValidateMovement,
} from './lib/validators.js';
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js';
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js';
import {testArrivals} from './lib/arrivals.js';
import {testReachableFrom} from './lib/reachable-from.js';

const T_MOCK = 1671260400 * 1000; // 2022-12-17T08:00:00+01:00
const when = createWhen(pkpProfile.timezone, pkpProfile.locale, T_MOCK);

const cfg = {
	when,
	stationCoordsOptional: false,
	products: pkpProfile.products,
	minLatitude: 40,
	maxLatitude: 65,
	minLongitude: 10,
	maxLongitude: 30,
};

const _validateLine = createValidateLine(cfg);
const validateLine = (validate, l, name) => {
	if (!l.direction) {
		l = Object.assign({}, l, {direction: 'foo'});
	}
	_validateLine(validate, l, name);
};

const _validateJourneyLeg = createValidateJourneyLeg(cfg);
const validateJourneyLeg = (validate, l, name) => {
	if (!l.direction) {
		l = Object.assign({}, l, {direction: 'foo'});
	}
	_validateJourneyLeg(validate, l, name);
};

const _validateMovement = createValidateMovement(cfg);
const validateMovement = (val, m, name) => {
	if (!m.direction) {
		m = Object.assign({}, m, {direction: 'foo'});
	}
	_validateMovement(val, m, name);
};

const validate = createValidate(cfg, {
	line: validateLine,
	journeyLeg: validateJourneyLeg,
	movement: validateMovement,
});

const client = createClient(pkpProfile, 'public-transport/hafas-client:test');

const wrocławGł = '5100069';
const krakówGł = '5100028';
const dworcowa100 = {
	type: 'location',
	address: 'Bydgoszcz, Dworcowa 100',
	latitude: 53.1336648,
	longitude: 17.9908571,
};
const filharmonia = {
	type: 'location',
	id: '980013218',
	latitude: 54.351487,
	longitude: 18.659548,
	name: 'Gdańsk, Filharmonia',
	poi: true,
};

tap.skip('journeys – Wrocław Główny to Kraków Główny', async (t) => {
	const res = await client.journeys(wrocławGł, krakówGł, {
		results: 4,
		departure: when,
		stopovers: true,
	});

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: wrocławGł,
		toId: krakówGł,
	});
	t.end();
});

// todo: via works – with detour
// todo: without detour

tap.skip('trip details', async (t) => {
	const res = await client.journeys(wrocławGł, krakówGł, {
		results: 1, departure: when,
	});

	const p = res.journeys[0].legs.find(l => !l.walking);
	t.ok(p.tripId, 'precondition failed');
	t.ok(p.line.name, 'precondition failed');

	const tripRes = await client.trip(p.tripId, {when});

	validate(t, tripRes, 'tripResult', 'res');
	t.end();
});

tap.skip('arrivals at Kraków Główny', async (t) => {
	const arrivals = await client.arrivals(krakówGł, {
		duration: 10, when,
	});
	await testArrivals({
		test: t,
		arrivals,
		id: krakówGł,
		validate,
	});
	t.end();
});

tap.skip('nearby', async (t) => {
	const nearby = await client.nearby(dworcowa100, {distance: 500});

	validate(t, nearby, 'locations', 'nearby');

	const bydgoszczGł = '5100005';
	t.ok(nearby.find(l => l.id === bydgoszczGł));

	t.end();
});

tap.skip('radar', async (t) => {
	const res = await client.radar({
		north: 48.74453,
		west: 11.42733,
		south: 48.73453,
		east: 11.43733,
	}, {
		duration: 5 * 60, when, results: 10,
	});

	validate(t, res, 'radarResult', 'res');
	t.end();
});

tap.skip('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: dworcowa100,
		when,
		maxDuration: 20,
		validate,
	});
	t.end();
});
