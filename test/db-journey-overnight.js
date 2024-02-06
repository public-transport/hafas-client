// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/db/index.js';
const res0 = require('./fixtures/db-journey-overnight-0.json');
const expected0 = require('./fixtures/db-journey-overnight-0.expected.json');
const res1 = require('./fixtures/db-journey-overnight-1.json');
import {overnightJourney as expected1} from './fixtures/db-journey-overnight-1.expected.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const baseOpt = {
	results: null,
	via: null,
	stopovers: false,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	walkingSpeed: 'normal',
	startWithWalking: true,
	tickets: true,
	polylines: true,
	remarks: true,
	scheduledDays: false,
	products: {},
};

tap.test('parses a journey across day with correct timestamps', (t) => {
	const opt = {
		...baseOpt,
		results: 4,
		stopovers: true,
		departure: '2023-11-13T22:00:00+01:00',
	};

	const common = profile.parseCommon({profile, opt, res: res0});
	const ctx = {profile, opt, common, res: res0};
	const journey = profile.parseJourney(ctx, res0.outConL[16]);

	t.same(journey, expected0);
	t.end();
});

tap.test('parses a journey across dates with correct timestamps', (t) => {
	const opt = {
		...baseOpt,
		results: 1,
		stopovers: true,
		departure: '2023-11-24T22:00+01:00',
	};

	const common = profile.parseCommon({profile, opt, res: res1});
	const ctx = {profile, opt, common, res: res1};
	const journey = profile.parseJourney(ctx, res1.outConL[0]);

	t.same(journey, expected1);
	t.end();
});
