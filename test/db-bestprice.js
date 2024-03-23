// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/db/index.js';
const response = require('./fixtures/db-bestprice.json');
import {dbBestPrices as expected} from './fixtures/db-bestprice.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const opt = {
	via: null,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	tickets: true,
	polylines: true,
	remarks: true,
	walkingSpeed: 'normal',
	startWithWalking: true,
	departure: '2023-06-15',
	products: {},
};

tap.test('parses a bestprice with a DEVI leg correctly (DB)', (t) => {
	const res = response.svcResL[0].res;
	const common = profile.parseCommon({profile, opt, res});
	const ctx = {profile, opt, common, res};
	const journeys = res.outConL.map(j => profile.parseJourney(ctx, j));
	const bestPrices = res.outDaySegL.map(j => profile.parseBestPrice(ctx, j, journeys));

	t.same(bestPrices, expected.bestPrices);
	t.end();
});
