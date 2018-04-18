'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const {DateTime} = require('luxon')

const hour = 60 * 60 * 1000
const week = 7 * 24 * hour

// next Monday 10 am
const createWhen = (timezone, locale) => {
	return DateTime.fromMillis(Date.now(), {
		zone: timezone,
		locale,
	}).startOf('week').plus({weeks: 1, hours: 10}).toJSDate()
}

const isValidWhen = (actual, expected) => {
	const ts = +new Date(actual)
	if (Number.isNaN(ts)) return false
	// the timestamps might be from long-distance trains
	return isRoughlyEqual(14 * hour, +expected, ts)
}

module.exports = {
	hour, createWhen, isValidWhen
}
