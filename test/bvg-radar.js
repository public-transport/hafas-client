// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/bvg/index.js';
const res = require('./fixtures/bvg-radar.json');
import {bvgRadar as expected} from './fixtures/bvg-radar.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const opt = {
	results: 256,
	duration: 30,
	frames: 3,
	polylines: true,
	when: '2019-08-19T21:00:00+02:00',
	products: {},
};

tap.test('parses a radar() response correctly (BVG)', (t) => {
	const common = profile.parseCommon({profile, opt, res});
	const ctx = {profile, opt, common, res};
	const movements = res.jnyL.map(m => profile.parseMovement(ctx, m));

	t.same(movements, expected);
	t.end();
});
