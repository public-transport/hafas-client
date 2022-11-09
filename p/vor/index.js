// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')

const products = [{
	id: 'train-and-s-bahn',
	mode: 'train',
	bitmasks: [1, 2],
	name: 'Bahn & S-Bahn',
	short: 'Bahn & S-Bahn',
	default: true,
}, {
	id: 'u-bahn',
	mode: 'train',
	bitmasks: [4],
	name: 'U-Bahn',
	short: 'U-Bahn',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [16],
	name: 'Straßenbahn',
	short: 'Straßenbahn',
	default: true,
}, {
	id: 'city-bus',
	mode: 'bus',
	bitmasks: [128],
	name: 'Stadtbus',
	short: 'Stadtbus',
	default: true,
}, {
	id: 'regional-bus',
	mode: 'bus',
	bitmasks: [64],
	name: 'Regionalbus',
	short: 'Regionalbus',
	default: true,
}, {
	id: 'long-distance-bus',
	mode: 'bus',
	bitmasks: [32],
	name: 'Fernbus',
	short: 'Fernbus',
	default: true,
}, {
	id: 'other-bus',
	mode: 'bus',
	bitmasks: [2048],
	name: 'sonstige Busse',
	short: 'sonstige Busse',
	default: true,
}, {
	id: 'aerial-lift',
	mode: 'gondola',
	bitmasks: [256],
	name: 'Seil-/Zahnradbahn',
	short: 'Seil-/Zahnradbahn',
	default: true,
}, {
	id: 'ferry',
	mode: 'watercraft',
	bitmasks: [512],
	name: 'Schiff',
	short: 'Schiff',
	default: true,
}, {
	id: 'on-call',
	mode: 'taxi',
	bitmasks: [1024],
	name: 'Anrufsammeltaxi',
	short: 'AST',
	default: true,
}]

const profile = {
	...baseProfile,
	auth: {
		type: 'USER',
		aid: 'and20201hf7mcf9bv3nv8g5f',
		user: 'mobile',
		pw: '87a6f8ZbnBih32',
	},
	addMicMac: true,
	salt: '6633673735743766726667323938336A',

	locale: 'at-DE',
	timezone: 'Europe/Vienna',

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
}

export {
	profile,
}
