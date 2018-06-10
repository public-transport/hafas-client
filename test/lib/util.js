'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const {DateTime} = require('luxon')
const a = require('assert')

const hour = 60 * 60 * 1000
const day = 24 * hour
const week = 7 * day

// next Monday 10 am
const createWhen = (timezone, locale) => {
	return DateTime.fromMillis(Date.now(), {
		zone: timezone,
		locale,
	}).startOf('week').plus({weeks: 1, hours: 10}).toJSDate()
}

const assertValidWhen = (actual, expected, name) => {
	const ts = +new Date(actual)
	a.ok(!Number.isNaN(ts), name + ' is not parsable by Date')
	// the timestamps might be from long-distance trains
	a.ok(isRoughlyEqual(day, +expected, ts), name + ' is out of range')
}

module.exports = {
	hour, createWhen, assertValidWhen
}
