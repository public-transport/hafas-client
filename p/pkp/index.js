import {parseHook} from '../../lib/profile-hooks.js';

import {parseLocation} from '../../parse/location.js';
import baseProfile from './base.js';
import {products} from './products.js';

const trimStopName = ({parsed}, l) => {
	if (parsed.type === 'stop' || parsed.type === 'station' && parsed.name) {
		parsed.name = parsed.name.replace(/(^-|-$)/g, '');
	}
	return parsed;
};

// https://github.com/public-transport/hafas-client/issues/184#issuecomment-2646119337
const userAgentDeviceStrings = [
	'Linux; U; Android 15; 2210132C Build/AQ3A.240912.001',
	'Linux; U; Android 14; 23116PN5BC Build/UKQ1.230804.001',
	'Linux; U; Android 14; moto g 5G - 2024 Build/U1UFNS34.41-98-3-13',
	'Linux; U; Android 13; V2238A Build/UP1A.231005.007',
	'Linux; U; Android 15; 23090RA98C Build/UP1A.231005.007',
];
const transformReqOverrideUserAgent = (ctx, req) => {
	if (ctx.profile.randomizeUserAgent) {
		const deviceString = userAgentDeviceStrings[Math.round(Math.random() * (userAgentDeviceStrings.length - 1))];
		req.headers['user-agent'] = `Dalvik/2.1.0 (${deviceString})`;
	}
	return req;
};

const profile = {
	...baseProfile,
	locale: 'pl-PL',
	timezone: 'Europe/Warsaw',
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
