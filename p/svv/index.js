// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')
import {products} from './products.js'

const profile = {
	...baseProfile,
	locale: 'at-DE',
	timezone: 'Europe/Vienna',

	products,

	trip: true,
	refreshJourney: true,
	reachableFrom: true,
	refreshJourneyUseOutReconL: true,
}

export {
	profile,
}
