// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createClient} from '../index.js'
import {profile as rawProfile} from '../p/bvg/index.js'
const res = require('./fixtures/bvg-journey.json')
import {bvgJourney as expected} from './fixtures/bvg-journey.js'

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: null,
	via: null,
	stopovers: true,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	tickets: true,
	polylines: true,
	remarks: true,
	walkingSpeed: 'normal',
	startWithWalking: true,
	scheduledDays: true,
	departure: '2019-08-18T14:03:50+02:00',
	products: {}
}

tap.test('parses a journey correctly (BVG)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const journey = profile.parseJourney(ctx, res.outConL[0])

	t.same(journey, expected)
	t.end()
})
