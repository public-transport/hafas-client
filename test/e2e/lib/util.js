'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const {AssertionError} = require('assert')
const {DateTime} = require('luxon')
const a = require('assert')
const {join} = require('path')
const tape = require('tape')

const hour = 60 * 60 * 1000
const day = 24 * hour
const week = 7 * day

const T_MOCK = 1597651200 * 1000

// next Monday 10 am
const createWhen = (timezone, locale) => {
	const t = process.env.VCR_MODE && !process.env.VCR_OFF
		? T_MOCK
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
			expected: `${expected - delta} - ${+expected + delta}`,
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
const test = tape

module.exports = {
	hour, createWhen, assertValidWhen,
	test,
}
