// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createClient} from '../index.js'
import {withThrottling} from '../throttle.js'
import {profile as vbbProfile} from '../p/vbb/index.js'
const depsRes = require('./fixtures/vbb-departures.json')

const ua = 'public-transport/hafas-client:test'
const spichernstr = '900000042101'

tap.test('withThrottling works', {timeout: 3000}, (t) => {
	let calls = 0
	const mockedRequest = async (ctx, userAgent, reqData) => {
		calls++
		return {
			res: depsRes,
			common: ctx.profile.parseCommon({...ctx, res: depsRes})
		}
	}

	const profile = withThrottling({
		...vbbProfile,
		request: mockedRequest
	}, 2, 1000)
	const client = createClient(profile, ua)

	t.plan(3)
	for (let i = 0; i < 10; i++) {
		const p = client.departures(spichernstr, {duration: 1})
		p.catch(() => {})
	}

	setTimeout(() => t.equal(calls, 2), 500)
	setTimeout(() => t.equal(calls, 4), 1500)
	setTimeout(() => t.equal(calls, 6), 2500)
})
