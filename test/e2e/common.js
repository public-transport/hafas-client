'use strict'

const test = require('tape')

const createClient = require('../..')
const vbbProfile = require('../../p/vbb')
const parseDateTime = require('../../parse/date-time')

// todo: use a mock profile
const client = createClient(vbbProfile, 'public-transport/hafas-client:test')

test('exposes the profile', (t) => {
	t.ok(client.profile)
	t.equal(client.profile.endpoint, vbbProfile.endpoint)
	t.end()
})

test('parseDateTime: works', (t) => {
	const profile = {timezone: 'Europe/Berlin', locale: 'de-DE'}
	const whenStr = '2019-03-18T13:19:10+01:00'
	const when = +new Date(whenStr)

	const assert = (args, expected) => {
		const name = args.join(', ')
		const actual = parseDateTime(profile, ...args)
		t.equal(typeof actual, typeof expected, name)
		t.equal(actual, expected, name)
	}

	assert(['20190318', '131910', null, false], whenStr)
	assert(['20190318', '131910', null, true], when)

	// manual timezone offset
	assert(['20190318', '131910', 60, false], whenStr)
	assert(['20190318', '131910', 60, true], when)
	assert(['20190318', '131910', 120, false], '2019-03-18T13:19:10+02:00')
	assert(['20190318', '131910', 120, true], +new Date('2019-03-18T13:19:10+02:00'))

	// day offset
	assert(['20190318', '2131910', null, false], '2019-03-20T13:19:10+01:00')
	assert(['20190318', '2131910', null, true], +new Date('2019-03-20T13:19:10+01:00'))
	assert(['20190318', '02131910', null, false], '2019-03-20T13:19:10+01:00')
	assert(['20190318', '02131910', null, true], +new Date('2019-03-20T13:19:10+01:00'))

	// manual timezone offset day offset
	assert(['20190318', '02131910', 150, false], '2019-03-20T13:19:10+02:30')
	assert(['20190318', '02131910', 150, true], +new Date('2019-03-20T13:19:10+02:30'))

	t.end()
})
