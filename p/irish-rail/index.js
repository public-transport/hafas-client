import baseProfile from './base.js';
import {products} from './products.js';

const profile = {
	...baseProfile,
	locale: 'en-IE',
	timezone: 'Europe/Dublin',
	defaultLanguage: 'ga',
	salt: Buffer.from('i5s7m3q9z6b4k1c2', 'utf8'),
	addMicMac: true,

	products: products,

	refreshJourney: false, // fails with `CGI_READ_FAILED`
	trip: true,
	radar: true,
};

export {
	profile,
};
