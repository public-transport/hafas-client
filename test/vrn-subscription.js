'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/vrn')
const res = require('./fixtures/vrn-subscription.json')
const expected = require('./fixtures/vrn-subscription.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	payload: true,
	activeDays: false,
}

tap.test('parses a subscription correctly (VRN)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const sub = profile.parseSubscription(ctx, 'foo', res.details.conSubscr)

	t.same(sub, expected)
	t.end()
})
