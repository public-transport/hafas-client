// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')

const products = [{
	id: 'ice',
	mode: 'train',
	bitmasks: [1],
	name: 'ICE',
	short: 'ICE',
	default: true,
}, {
	id: 'ic-ec',
	mode: 'train',
	bitmasks: [2],
	name: 'IC/EC',
	short: 'IC/EC',
	default: true,
}, {
	id: 'ir',
	mode: 'train',
	bitmasks: [4],
	name: 'IR',
	short: 'IR',
	default: true,
}, {
	id: 'local-train',
	mode: 'train',
	bitmasks: [8],
	name: 'Nahverkehr',
	short: 'Nahverkehr',
	default: true,
}, {
	id: 'watercraft',
	mode: 'watercraft',
	bitmasks: [16],
	name: 'Schiff',
	short: 'Schiff',
	default: true,
}, {
	id: 's-bahn',
	mode: 'train',
	bitmasks: [32],
	name: 'S-Bahn',
	short: 'S',
	default: true,
}, {
	id: 'bus',
	mode: 'bus',
	bitmasks: [64],
	name: 'Bus',
	short: 'Bus',
	default: true,
}, {
	id: 'funicular',
	mode: 'gondola',
	bitmasks: [128],
	name: 'Seilbahn',
	short: 'Seilbahn',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [512],
	name: 'Tram',
	short: 'Tram',
	default: true,
}, {
	id: 'car-shuttle-train',
	mode: 'train',
	bitmasks: [4096],
	name: 'Autoverlad',
	short: 'Autoverlad',
	default: true,
}]

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	ver: '1.46',

	products,

	trip: true,
	radar: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
}

export {
	profile,
}
