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
	// https://gist.github.com/n0emis/3b6887572793f4f54da9d83b30548332#file-haf_config_base-properties-L31
	// https://runkit.com/derhuerst/hafas-decrypt-encrypted-mac-salt
	salt: Buffer.from('SP31mBufSyCLmNxp', 'utf8'),
	addMicMac: true,

	products: products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

export {
	profile,
}
