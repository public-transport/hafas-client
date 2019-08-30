'use strict'

const test = require('tape')

const withThrottling = require('../throttle')
const createClient = require('..')
const vbbProfile = require('../p/vbb')

const userAgent = 'public-transport/hafas-client:test'
const spichernstr = '900000042101'

test('withThrottling works', (t) => {
	let calls = 0
	const transformReqBody = (body) => {
		calls++
		return vbbProfile.transformReqBody(body)
	}
	const mockProfile = Object.assign({}, vbbProfile, {transformReqBody})

	const createThrottlingClient = withThrottling(createClient, 2, 1000)
	const client = createThrottlingClient(mockProfile, userAgent)
	for (let i = 0; i < 10; i++) client.departures(spichernstr, {duration: 1})

	t.plan(3)
	setTimeout(() => t.equal(calls, 2), 500)
	setTimeout(() => t.equal(calls, 4), 1500)
	setTimeout(() => t.equal(calls, 6), 2500)
})
