// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import {parseHook} from '../../lib/profile-hooks.js'

import {parseMovement as _parseMovement} from '../../parse/movement.js'
const baseProfile = require('./base.json')
import {products} from './products.js'

const fixMovement = ({parsed}, m) => {
	// filter out empty stopovers
	parsed.nextStopovers = parsed.nextStopovers.filter(st => !!st.stop)
	return parsed
}

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	salt: Buffer.from('HJtlubisvxiJxss', 'utf8'),
	addMicMac: true,

	products: products,

	parseMovement: parseHook(_parseMovement, fixMovement),

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true
}

export {
	profile,
}
