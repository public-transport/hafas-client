import isRoughlyEqual from 'is-roughly-equal'
import {ok, AssertionError} from 'assert'
import {DateTime} from 'luxon'
import * as a from 'assert'
import {createRequire} from 'module'

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

const assertValidWhen = (actual, expected, name, delta = day + 6 * hour) => {
	const ts = +new Date(actual)
	a.ok(!Number.isNaN(ts), name + ' is not parsable by Date')
	// the timestamps might be from long-distance trains
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
	const require = createRequire(import.meta.url)
	const replayer = require('replayer')

	replayer.configure({
		headerWhitelist: [
			// excludes User-Agent & Connection
			'Content-Type', 'Accept-Encoding', 'Accept',
		],
		includeHeaderValues: true,
		touchHits: false,
	})
	replayer.fixtureDir(new URL('../fixtures', import.meta.url).pathname)
}

export {
	hour, createWhen, assertValidWhen,
}
