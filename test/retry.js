'use strict'

const test = require('tape')

const createClient = require('..')
const withRetrying = require('../retry')
const vbbProfile = require('../p/vbb')

const userAgent = 'public-transport/hafas-client:test'
const spichernstr = '900000042101'

test('withRetrying works', (t) => {
	// for the first 3 calls, return different kinds of errors
	let calls = 0
	const failingRequest = async (ctx, userAgent, reqData) => {
		calls++
		if (calls === 1) {
			const err = new Error('HAFAS error')
			err.isHafasError = true
			return Promise.reject(err)
		}
		if (calls === 2) {
			const err = new Error('fetch error')
			err.code = 'EFOO'
			return Promise.reject(err)
		}
		if (calls < 4) return Promise.reject(new Error('generic error'))
		return {
			res: [],
			common: {}
		}
	}

	const profile = withRetrying({
		...vbbProfile,
		request: failingRequest
	}, {
		retries: 3,
		minTimeout: 100,
		factor: 2,
		randomize: false
	})
	const client = createClient(profile, userAgent)

	t.plan(1 + 4)
	client.departures(spichernstr, {duration: 1})
	.then(deps => t.deepEqual(deps, [], 'resolved with invalid value'))
	.catch(t.ifError)

	setTimeout(() => t.equal(calls, 1), 50) // buffer
	setTimeout(() => t.equal(calls, 2), 150) // 100 + buffer
	setTimeout(() => t.equal(calls, 3), 350) // 100 + 200 + buffer
	setTimeout(() => t.equal(calls, 4), 750) // 100 + 200 + 400 + buffer
})
