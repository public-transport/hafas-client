'use strict'

const tap = require('tap')

const createClient = require('../..')
const vbbProfile = require('../../p/vbb')

const client = createClient(vbbProfile, 'public-transport/hafas-client:test')

tap.test('exposes the profile', (t) => {
	t.ok(client.profile)
	t.equal(client.profile.endpoint, vbbProfile.endpoint)
	t.end()
})
