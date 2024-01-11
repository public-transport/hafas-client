// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createRestClient} from '../rest-exe.js'
import {profile as vbbRestProfile} from '../p/vbb-rest/index.js'
const res = require('./fixtures/vbb-rest-journeys.json')
import {expected} from './fixtures/vbb-rest-journeys.js'

const client = createRestClient(vbbRestProfile, 'fake-token', 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	results: null,
	stopovers: false,
	transfers: -1,
	transferTime: null,
	polylines: false,
	startWithWalking: true,
	when: '2021-09-30T20:30:00+02:00',
	products: {},
}

tap.test('parses journeys correctly (VBB rest.exe)', (t) => {
	const ctx = {profile, opt, res}
	const journeys = res.Trip.map(j => profile.parseJourney(ctx, j))

	t.same(journeys, expected)
	t.end()
})
