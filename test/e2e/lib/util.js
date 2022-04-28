'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const {ok, AssertionError} = require('assert')
const {DateTime} = require('luxon')
const a = require('assert')
const {join} = require('path')

const hour = 60 * 60 * 1000
const day = 24 * hour
const week = 7 * day

// next Monday 10 am
const createWhen = (timezone, locale, tMock) => {
	ok(Number.isInteger(tMock), 'tMock must be an integer')

	const t = process.env.VCR_MODE && !process.env.VCR_OFF
		? tMock
		: Date.now()
	return DateTime.fromMillis(t, {
		zone: timezone,
		locale,
	}).startOf('week').plus({weeks: 1, hours: 10}).toJSDate()
}

const assertValidWhen = (actual, expected, name) => {
	const ts = +new Date(actual)
	a.ok(!Number.isNaN(ts), name + ' is not parsable by Date')
	// the timestamps might be from long-distance trains
	const delta = day + 6 * hour
	if (!isRoughlyEqual(delta, +expected, ts)) {
		throw new AssertionError({
			message: name + ' is out of range',
			actual: ts,
			expected: `${expected - delta} - ${+expected + delta}`,
			operator: 'isRoughlyEqual',
		})
	}
}

// HTTP request mocking
if (process.env.VCR_MODE && !process.env.VCR_OFF) {
	const replayer = require('replayer')
	replayer.configure({
		headerWhitelist: [
			'Content-Type', 'Accept-Encoding', 'Accept',
		],
		includeHeaderValues: true,
		touchHits: false,
	})
	replayer.fixtureDir(join(__dirname, '..', 'fixtures'))
}

module.exports = {
	hour, createWhen, assertValidWhen,
}
