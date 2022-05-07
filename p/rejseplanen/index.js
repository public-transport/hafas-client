// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')
import {products} from './products.js'

const profile = {
	...baseProfile,
	locale: 'da-DK',
	timezone: 'Europe/Copenhagen',

	products: products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
}

export {
	profile,
}
