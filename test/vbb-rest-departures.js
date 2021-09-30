// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createRestClient} from '../rest-exe.js'
import {profile as vbbRestProfile} from '../p/vbb-rest/index.js'
const res = require('./fixtures/vbb-rest-departures.json')
import {expected} from './fixtures/vbb-rest-departures.js'

const client = createRestClient(vbbRestProfile, 'fake-token', 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	direction: null,
	duration: 10,
	linesOfStops: true,
	remarks: true,
	stopovers: true,
	includeRelatedStations: true,
	when: '2021-09-30T20:30:00+02:00',
	products: {},
}

tap.test('parses departures correctly (VBB rest.exe)', (t) => {
	const ctx = {profile, opt, res}
	const departures = res.Departure.map(dep => profile.parseDeparture(ctx, dep))

	t.same(departures, expected)
	t.end()
})
