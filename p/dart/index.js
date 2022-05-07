// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')

const products = [{
	id: 'bus',
	mode: 'bus',
	bitmasks: [32],
	name: 'Bus',
	short: 'Bus',
	default: true,
}]

const profile = {
	...baseProfile,
	locale: 'en-US',
	timezone: 'America/Chicago',

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
	radar: true,
}

export {
	profile,
}
