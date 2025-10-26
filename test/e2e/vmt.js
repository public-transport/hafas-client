import tap from 'tap';
import {DateTime} from 'luxon';

import {createWhen} from './lib/util.js';
import {createClient} from '../../index.js';
import {profile as vmtProfile} from '../../p/vmt/index.js';
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js';
import {testJourneysStationToStation} from './lib/journeys-station-to-station.js';
import {testDepartures} from './lib/departures.js';

const T_MOCK = 1761631200 * 1000 // 2025-10-28T08:00:00+02:00
const when = createWhen(vmtProfile.timezone, vmtProfile.locale, T_MOCK);

const cfg = {
	when,
	stationCoordsOptional: false,
	products: vmtProfile.products,
	maxLatitude: 55,
	minLongitude: 6,
	minLatitude: 48,
	maxLongitude: 20,
};

const validate = createValidate(cfg);

const client = createClient(vmtProfile, 'public-transport/hafas-client:test');

const jenaParadies = '8011956';
const erfurtHbf = '8010101';

tap.test('journeys – Jena Paradies to Erfurt Hbf', async (t) => {
	const res = await client.journeys(jenaParadies, erfurtHbf, {
		results: 4,
		departure: when,
		stopovers: true,
	});

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: jenaParadies,
		toId: erfurtHbf,
	});

	t.end();
});

tap.test('departures at Jena Paradies', async (t) => {
	const res = await client.departures(jenaParadies, {
		duration: 60,
		when,
	});

	await testDepartures({
		test: t,
		res,
		validate,
		ids: [
			jenaParadies,
			// wtf
			'153004',
			'153027',
			'153049',
			'153050',
			'153167',
			'8011957',
			'9441956',
		],
	});
	t.end();
});

tap.test('radar() with opt.tripId works', async (t) => {
	const {
		departures: [dep0],
	} = await client.departures(jenaParadies, {
		duration: 60,
		when,
	});
	const {
		stop: {
			location: loc0,
		},
	} = dep0

	const res = await client.radar({
		north: loc0.latitude + 1,
		south: loc0.latitude - 1,
		east: loc0.longitude + 1,
		west: loc0.longitude - 1,
	}, {
		when: dep0.when,
		tripId: dep0.tripId,
	})
	t.equal(res.movements.length, 1, 'radar() should return exactly 1 movement')
	t.equal(res.movements[0].tripId, dep0.tripId, 'movements should include the filtered-by trip ID')

	t.end();
});
