'use strict'

const tap = require('tap')
const forEach = require('lodash/forEach')
const request = require('../../lib/request')
const formatTripReq = require('../../format/trip-req')

const USER_AGENT = 'public-transport/hafas-client:test'

const freeze = (val) => {
	if (
		'object' === typeof val
		&& val !== null
		&& !Array.isArray(val)
	) Object.freeze(val)
}
const ctx = {
	// random but unique
	opt: {
		language: 'ga',
	},
	profile: {
		endpoint: 'https://does.not.exist',
		client: {
			type: 'FOO',
			id: 'BAR',
			name: 'baZ',
		},
		auth: {
			type: 'AID',
			aid: 'some-auth-token',
		},
		ver: '1.23.4',

		timezone: 'Europe/Amsterdam',
		locale: 'de-LU',
		defaultLanguage: 'fr',

		transformReq: (_, req) => req,
	},
}
forEach(ctx, freeze)

tap.test('lib/request calls profile.transformReqBody & profile.transformReq properly', async (t) => {
	const customTransformReqBody = (ctx, reqBody) => {
		const p = 'transformReqBody call: '
		t.same(ctx, customCtx, 'ctx should be the passed-in ctx')

		t.ok(reqBody, 'reqBody')
		t.equal(reqBody.client, ctx.profile.client, p + 'reqBody.client')
		t.equal(reqBody.ext, ctx.profile.ext, p + 'reqBody.ext')
		t.equal(reqBody.var, ctx.profile.var, p + 'reqBody.var')
		t.equal(reqBody.auth, ctx.profile.auth, p + 'reqBody.auth')
		t.equal(reqBody.lang, ctx.opt.language, p + 'reqBody.lang')

		// We test if lib/request.js handles returning a new object.
		return {
			...reqBody,
		}
	}

	const customTransformReq = (ctx, req) => {
		const p = 'transformReq call: '
		t.same(ctx, customCtx, p + 'ctx should be the passed-in ctx')

		t.equal(typeof req.body, 'string', p + 'req.body')
		t.ok(req.body, p + 'req.body')

		// We test if lib/request.js handles returning a new object.
		return {
			...req,
			// From node-fetch, used by isomorphic-fetch:
			// > req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
			timeout: 100,
		}
	}

	const customCtx = {
		...ctx,
		profile: {
			...ctx.profile,
			transformReqBody: customTransformReqBody,
			transformReq: customTransformReq,
		},
	}
	const tripReq = formatTripReq(customCtx, 'unknown-trip-id')

	// todo: set 1s timeout
	await t.rejects(async () => {
		await request(customCtx, USER_AGENT, tripReq)
	})
	t.end()
})
