// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')
import {products} from './products.js'

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	salt: Buffer.from('ggnvMVV8RTt67gh1', 'utf8'),
	addMicMac: true,

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true
}

export {
	profile,
}
