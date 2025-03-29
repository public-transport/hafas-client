import baseProfile from './base.js';

const products = [{
	id: 'bus',
	mode: 'bus',
	bitmasks: [32],
	name: 'Bus',
	short: 'Bus',
	default: true,
}];

const profile = {
	...baseProfile,
	locale: 'en-US',
	timezone: 'America/Chicago',

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
	radar: true,
};

export {
	profile,
};
