// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import {readFileSync} from 'fs';
import {Agent} from 'https';
const baseProfile = require('./base.json');

const products = [{
	id: 'stadtbahn',
	mode: 'train',
	bitmasks: [2],
	name: 'Stadtbahn',
	short: 'Stadtbahn',
	default: true,
}, {
	id: 'bus',
	mode: 'bus',
	bitmasks: [8],
	name: 'Bus',
	short: 'Bus',
	default: true,
}, {
	id: 'taxibus',
	mode: 'bus',
	bitmasks: [256],
	name: 'Taxibus',
	short: 'Taxibus',
	default: true,
}, {
	id: 's-bahn',
	mode: 'train',
	bitmasks: [1],
	name: 'S-Bahn',
	short: 'S',
	default: true,
}, {
	id: 'regionalverkehr',
	mode: 'train',
	bitmasks: [16],
	name: 'Regionalverkehr',
	short: 'Regionalverkehr',
	default: true,
}, {
	id: 'fernverkehr',
	mode: 'train',
	bitmasks: [32],
	name: 'Fernverkehr',
	short: 'Fernverkehr',
	default: true,
}];

// `auskunft.kvb.koeln/gate` doesn't provide the necessary CA certificate chain for Node.js to trust the certificate, so we manually augment it.
// I have let them know on 2025-03-13, let's see when they fix it.
const ca = readFileSync(new URL('./thawte-tls-rsa-ca-g1.crt.pem', import.meta.url).pathname);
const agent = new Agent({ca});
const transformReq = (ctx, req) => ({...req, agent});

const profile = {
	...baseProfile,
	transformReq,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
};

export {
	profile,
};
