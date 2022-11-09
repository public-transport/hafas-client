// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createClient} from '../index.js'
import {profile as rawProfile} from '../p/rsag/index.js'
const res = require('./fixtures/rsag-journey.json')
import {rsagJourneys as expected} from './fixtures/rsag-journey.js'

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	stopovers: false,
	tickets: false,
	polylines: false,
	subStops: true,
	entrances: true,
	remarks: true,
	products: {}
}

tap.test('parses a journey correctly (RSAG)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journey = profile.parseJourney(ctx, res.outConL[0])

	t.same(journey, expected)
	t.end()
})
