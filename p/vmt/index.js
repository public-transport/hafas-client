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
	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	// https://gist.github.com/derhuerst/b20adde9f614ceb6b2a8b9c7f4487da8#file-hafas-config-L31-L32
	salt: Buffer.from('7x8d3n2a5m1b3c6z', 'utf-8'),
	addMicMac: true,

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

export {
	profile,
}
