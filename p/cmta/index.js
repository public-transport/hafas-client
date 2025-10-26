import baseProfile from './base.js';
import {products} from './products.js';

const profile = {
	...baseProfile,
	locale: 'en-US',
	timezone: 'America/Chicago',

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarks: true, // `.svcResL[0].res.msgL[]` is missing though 🤔
};

export {
	profile,
};
