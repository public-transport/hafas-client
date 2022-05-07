// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createClient} from '../index.js'
import {profile as rawProfile} from '../p/vsn/index.js'
const res = require('./fixtures/vsn-departures.json')
import {vsnDepartures as expected} from './fixtures/vsn-departures.js'

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	// results: null,
	// via: null,
	// stopovers: true,
	// transfers: -1,
	// transferTime: 0,
	// accessibility: 'none',
	// bike: false,
	// tickets: true,
	// polylines: true,
	// remarks: true,
	// walkingSpeed: 'normal',
	// startWithWalking: true,
	// scheduledDays: false,
	// departure: '2020-04-10T20:33+02:00',
	// products: {}
}

tap.test('parses departures correctly (VSN)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}

	const dep = profile.parseDeparture(ctx, res.jnyL[0])
	t.same(dep, expected)
	t.end()
})
