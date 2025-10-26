import {parseHook} from '../../lib/profile-hooks.js';

import {parseMovement as _parseMovement} from '../../parse/movement.js';
import baseProfile from './base.js';
import {products} from './products.js';

const fixMovement = ({parsed}, m) => {
	// filter out empty stopovers
	parsed.nextStopovers = parsed.nextStopovers.filter(st => Boolean(st.stop));
	return parsed;
};

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	salt: Buffer.from('HJtlubisvxiJxss', 'utf8'),
	addMicMac: true,

	products: products,

	parseMovement: parseHook(_parseMovement, fixMovement),

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
};

export {
	profile,
};
