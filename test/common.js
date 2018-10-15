'use strict'

const test = require('tape')

const createClient = require('..')
const vbbProfile = require('../p/vbb')

// todo: use a mock profile
const client = createClient(vbbProfile, 'public-transport/hafas-client:test')

test('exposes the profile', (t) => {
	t.ok(client.profile)
	t.equal(client.profile.endpoint, vbbProfile.endpoint)
	t.end()
})
