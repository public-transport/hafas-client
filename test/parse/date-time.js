'use strict'

const test = require('tape')
const parse = require('../../parse/date-time')

const profile = {
	timezone: 'Europe/Berlin',
	locale: 'de-DE'
}

test('date & time parsing uses profile.timezone', (t) => {
	const iso = parse({
		...profile, timezone: 'Europe/Moscow'
	}, '20190819', '203000', undefined, false)
	t.equal(iso, '2019-08-19T20:30:00+03:00')
	t.end()
})

test('date & time parsing returns a timestamp', (t) => {
	const iso = parse(profile, '20190819', '203000', undefined, false)
	const ts = parse(profile, '20190819', '203000', undefined, true)
	t.equal(ts, +new Date(iso))
	t.equal(ts, 1566239400 * 1000)
	t.end()
})

test('date & time parsing uses tzOffset', (t) => {
	const iso = parse(profile, '20190819', '203000', -120, false)
	t.equal(iso, '2019-08-19T20:30:00-02:00')
	t.end()
})

test('date & time parsing works with day "overflow"', (t) => {
	const iso = parse(profile, '20190819', '02203000', undefined, false)
	t.equal(iso, '2019-08-21T20:30:00+02:00')
	t.end()
})

// #106
test('date & time parsing works with day "overflow" & tzOffset', (t) => {
	const iso = parse(profile, '20190819', '02203000', -120, false)
	t.equal(iso, '2019-08-21T20:30:00-02:00')
	t.end()
})

test('date & time parsing works with summer & winter time', (t) => {
	const iso = parse(profile, '20190219', '203000', undefined, false)
	t.equal(iso, '2019-02-19T20:30:00+01:00')
	t.end()
})
