'use strict'

const test = require('tape')

const createClient = require('..')
const withThrottling = require('../throttle')
const vbbProfile = require('../p/vbb')
const depsRes = require('./fixtures/vbb-departures.json')

const ua = 'public-transport/hafas-client:test'
const spichernstr = '900000042101'

test('withThrottling works', {timeout: 2600}, (t) => {
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
