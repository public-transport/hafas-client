// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createClient} from '../index.js'
import {profile as rawProfile} from '../p/insa/index.js'
const res = require('./fixtures/insa-stop.json')
import {insaStop as expected} from './fixtures/insa-stop.js'

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	linesOfStops: false, // parse & expose lines at the stop/station?
	remarks: true,
}

tap.test('parses a stop() response correctly (INSA)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const stop = profile.parseLocation(ctx, res.locL[0])

	t.same(stop, expected)
	t.end()
})
