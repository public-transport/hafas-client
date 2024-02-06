// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/db/index.js';

const resAdditionalStopover = require('./fixtures/db-journey-additional-stopover.json');

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const opt = {
	results: 1,
	stopovers: true,
};

// https://github.com/public-transport/hafas-client/issues/303

tap.test('parses a journey having a leg with an additional stopover', (t) => {
	const common = profile.parseCommon({profile, opt, res: resAdditionalStopover});
	const ctx = {profile, opt, common, res: resAdditionalStopover};
	const journey = profile.parseJourney(ctx, resAdditionalStopover.outConL[0]);
	const stopovers = journey.legs[0].stopovers;

	const stopoverRegular = stopovers[6];
	const stopoverAdditional = stopovers[7];
	t.notOk('additional' in stopoverRegular, 'regular stopover has attribute additional');
	t.equal(stopoverAdditional.additional, true, 'additional stopover doesn\'t have attribute additional');
	t.end();
});
