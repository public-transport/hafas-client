import baseProfile from './base.js';
import {products} from './products.js';

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	salt: Buffer.from('ggnvMVV8RTt67gh1', 'utf8'),
	addMicMac: true,

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
};

export {
	profile,
};
