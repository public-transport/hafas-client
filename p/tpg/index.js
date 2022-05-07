// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')

const products = [{
	id: 'tgv',
	mode: 'train',
	bitmasks: [1],
	name: 'TGV',
	short: 'TGV',
	default: true,
}, {
	id: 'intercites',
	mode: 'train',
	bitmasks: [2],
	name: 'Intercités',
	short: 'Intercités',
	default: true,
}, {
	id: 'ir',
	mode: 'train',
	bitmasks: [4],
	name: 'IR',
	short: 'IR',
	default: true,
}, {
	id: 'train-direct',
	mode: 'train',
	bitmasks: [8],
	name: 'Train direct',
	short: 'Train direct',
	default: true,
}, {
	id: 'bateau',
	mode: 'watercraft',
	bitmasks: [16],
	name: 'Bateau',
	short: 'Bateau',
	default: true,
}, {
	id: 'regio-express',
	mode: 'train',
	bitmasks: [32],
	name: 'Regio Express',
	short: 'Regio Express',
	default: true,
}, {
	id: 'bus',
	mode: 'bus',
	bitmasks: [64],
	name: 'Bus',
	short: 'Bus',
	default: true,
}, {
	id: 'transport-a-cables',
	mode: 'gondola',
	bitmasks: [128],
	name: 'Transport à câbles',
	short: 'Transport à câbles',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [512],
	name: 'Tram',
	short: 'Tram',
	default: true,
}]

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	ver: '1.40',

	products,

	trip: true,
	radar: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
}

export {
	profile,
}
