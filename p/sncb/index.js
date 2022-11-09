// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import {readFileSync} from 'fs'
import {Agent} from 'https'
import {strictEqual as eql} from 'assert'
import {parseHook} from '../../lib/profile-hooks.js'
import {parseLine} from '../../parse/line.js'
const baseProfile = require('./base.json')
import {products} from './products.js'

// `www.belgianrail.be:443` doesn't provide the necessary CA certificate
// chain for Node.js to trust the certificate, so we manually add it.
// todo: fix this properly, e.g. by letting them know
const ca = readFileSync(new URL('./digicert-sha2-secure-server-ca.crt.pem', import.meta.url).pathname)
const agent = new Agent({ca})
const transformReq = (ctx, req) => ({...req, agent})

// todo: this is ugly
const lineNameWithoutFahrtNr = ({parsed}) => {
	const {name, fahrtNr} = parsed
	if (!name || !fahrtNr || !/s\d/i.test(name)) return parsed
	const i = name.indexOf(fahrtNr)
	if (i < 0) return parsed

	if (
		/\s/.test(name[i - 1] || '') && // space before
		name.length === i + fahrtNr.length // nothing behind
	) return {
		...parsed,
		name: name.slice(0, i - 1) + name.slice(i + fahrtNr.length + 1),
	}
	return parsed
}
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'THA 123', fahrtNr: '123'}
}).name, 'THA 123')
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1 123', fahrtNr: '123'}
}).name, 'S1')
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1-123', fahrtNr: '123'}
}).name, 'S1-123')
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1 123a', fahrtNr: '123'}
}).name, 'S1 123a')

const profile = {
	...baseProfile,
	locale: 'fr-BE',
	timezone: 'Europe/Brussels',

	transformReq,

	products,

	parseLine: parseHook(parseLine, lineNameWithoutFahrtNr),

	trip: true,
	refreshJourney: true,
	radar: true,
	reachableFrom: true,
}

export {
	profile,
}
