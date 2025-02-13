// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import {parseHook} from '../../lib/profile-hooks.js';

import {parseLocation} from '../../parse/location.js';
const baseProfile = require('./base.json');
import {products} from './products.js';

// https://github.com/public-transport/hafas-client/issues/184#issuecomment-2646119337
const PKP_USER_AGENT = 'Dalvik/2.1.0';

const trimStopName = ({parsed}, l) => {
	if (parsed.type === 'stop' || parsed.type === 'station' && parsed.name) {
		parsed.name = parsed.name.replace(/(^-|-$)/g, '');
	}
	return parsed;
};

const transformReqOverrideUserAgent = (ctx, req) => {
	req.headers['user-agent'] = PKP_USER_AGENT
	return req
}

const profile = {
	...baseProfile,
	locale: 'pl-PL',
	timezone: 'Europe/Warsaw',
	randomizeUserAgent: false,
	transformReq: transformReqOverrideUserAgent,

	products,

	parseLocation: parseHook(parseLocation, trimStopName),

	trip: true,
	radar: true,
	refreshJourney: false,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
};

export {
	profile,
};
