import baseProfile from './base.js';
import {products} from './products.js';

const profile = {
	...baseProfile,
	locale: 'da-DK',
	timezone: 'Europe/Copenhagen',

	products: products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
};

export {
	profile,
};
