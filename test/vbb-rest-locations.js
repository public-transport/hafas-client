// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createRestClient} from '../rest-exe.js'
import {profile as vbbRestProfile} from '../p/vbb-rest/index.js'
const res = require('./fixtures/vbb-rest-locations.json')
import {expected} from './fixtures/vbb-rest-locations.js'

const client = createRestClient(vbbRestProfile, 'fake-token', 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	fuzzy: true,
	results: 5,
	stops: true,
	addresses: true,
	poi: true,
	linesOfStops: true,
	when: '2021-09-30T20:30:00+02:00',
	products: {},
}

tap.test('parses locations correctly (VBB rest.exe)', (t) => {
	const ctx = {profile, opt, res}
	const locations = res.stopLocationOrCoordLocation.map(res => profile.parseLocationsResult(ctx, res))

	t.same(locations, expected)
	t.end()
})
