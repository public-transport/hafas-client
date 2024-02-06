// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/vsn/index.js';
const res = require('./fixtures/vsn-remarks.json');
import {vsnRemarks as expected} from './fixtures/vsn-remarks.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const opt = {
	results: 100, // maximum number of remarks
	// filter by time
	from: Date.now(), to: null,
	products: null, // filter by affected products
};

tap.test('parses a remarks() response correctly (VSN)', (t) => {
	const common = profile.parseCommon({profile, opt, res});
	const ctx = {profile, opt, common, res};
	const warnings = res.msgL.map(w => profile.parseWarning(ctx, w));

	t.same(warnings, expected);
	t.end();
});
