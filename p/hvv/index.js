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
	// baseProfile.salt is interpreted as hex by hafas-client
	salt: Buffer.from('pqjM3iKEGOAhYbX76k9R5zutv', 'utf8'),
	addMicMac: true,

	products,

	departuresGetPasslist: true,
	departuresStbFltrEquiv: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarksGetPolyline: false,
	lines: false, // fails with `FAIL` "HCI Service: request failed"
}

export {
	profile,
}
