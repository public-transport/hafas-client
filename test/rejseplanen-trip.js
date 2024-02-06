// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/rejseplanen/index.js';
const res = require('./fixtures/rejseplanen-trip.json');
import {rejseplanenTrip as expected} from './fixtures/rejseplanen-trip.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const opt = {
	stopovers: true,
	polyline: true,
	subStops: false,
	entrances: true,
	remarks: true,
	when: '2021-11-12T17:30:00+02:00',
};

tap.test('parses a trip correctly (Rejseplanen)', (t) => {
	const common = profile.parseCommon({profile, opt, res});
	const ctx = {profile, opt, common, res};
	const trip = profile.parseTrip(ctx, res.journey);

	t.same(trip, expected);
	t.end();
});
