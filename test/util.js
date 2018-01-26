'use strict'

const validateFptf = require('validate-fptf')
const isRoughlyEqual = require('is-roughly-equal')
const {DateTime} = require('luxon')
const isValidWGS84 = require('is-coordinates')

const validateFptfWith = (t, item, allowedTypes, name) => {
	t.doesNotThrow(() => {
		validateFptf.recurse(allowedTypes, item, name)
	})
}

const assertValidStation = (t, s, coordsOptional = false) => {
	validateFptfWith(t, s, ['station'], 'station')

	if (!coordsOptional || (s.location !== null && s.location !== undefined)) {
		t.ok(s.location)
		assertValidLocation(t, s.location, coordsOptional)
	}

	if ('lines' in s) {
		t.ok(Array.isArray(s.lines))
		for (let l of s.lines) assertValidLine(t, l)
	}
}

const assertValidPoi = (t, p) => {
	assertValidLocation(t, p, true)

	t.equal(typeof p.id, 'string')
	t.equal(typeof p.name, 'string')
	if (p.address !== null && p.address !== undefined) {
		t.equal(typeof p.address, 'string')
		t.ok(p.address)
	}
}

const assertValidAddress = (t, a) => {
	assertValidLocation(t, a, true)

	t.equal(typeof a.address, 'string')
}

const assertValidLocation = (t, l, coordsOptional = false) => {
	t.equal(l.type, 'location')
	if (l.name !== null && l.name !== undefined) {
		t.equal(typeof l.name, 'string')
		t.ok(l.name)
	}

	if (l.address !== null && l.address !== undefined) {
		t.equal(typeof l.address, 'string')
		t.ok(l.address)
	}

	const hasLatitude = l.latitude !== null && l.latitude !== undefined
	const hasLongitude = l.longitude !== null && l.longitude !== undefined
	if (!coordsOptional && hasLatitude) t.equal(typeof l.latitude, 'number')
	if (!coordsOptional && hasLongitude) t.equal(typeof l.longitude, 'number')
	if ((hasLongitude && !hasLatitude) || (hasLatitude && !hasLongitude)) {
		t.fail('should have both .latitude and .longitude')
	}
	if (hasLatitude && hasLongitude) isValidWGS84([l.longitude, l.latitude])

	if (!coordsOptional && l.altitude !== null && l.altitude !== undefined) {
		t.equal(typeof l.altitude, 'number')
	}
}

const validLineModes = [
	'train', 'bus', 'watercraft', 'taxi', 'gondola', 'aircraft',
	'car', 'bicycle', 'walking'
]

const assertValidLine = (t, l) => {
	validateFptfWith(t, l, ['line'], 'line')
}

const isValidDateTime = (w) => {
	return !Number.isNaN(+new Date(w))
}

const assertValidStopover = (t, s, coordsOptional = false) => {
	if ('arrival' in s) t.ok(isValidDateTime(s.arrival))
	if ('departure' in s) t.ok(isValidDateTime(s.departure))
	if (s.arrivalDelay !== null && s.arrivalDelay !== undefined) {
		t.equal(typeof s.arrivalDelay, 'number')
	}
	if (s.departureDelay !== null && s.departureDelay !== undefined) {
		t.equal(typeof s.departureDelay, 'number')
	}
	if (!('arrival' in s) && !('departure' in s)) {
		t.fail('stopover doesn\'t contain arrival or departure')
	}
	t.ok(s.station)
	assertValidStation(t, s.station, coordsOptional)
}

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
	return isRoughlyEqual(12 * hour, +expected, ts)
}

const assertValidWhen = (t, actual, expected) => {
	t.ok(isValidWhen(actual, expected), 'invalid when')
}

const assertValidTicket = (t, ti) => {
	t.strictEqual(typeof ti.name, 'string')
	t.ok(ti.name.length > 0)
	if (ti.price !== null) {
		t.strictEqual(typeof ti.price, 'number')
		t.ok(ti.price > 0)
	}
	if (ti.amount !== null) {
		t.strictEqual(typeof ti.amount, 'number')
		t.ok(ti.amount > 0)
	}

	if ('bike' in ti) t.strictEqual(typeof ti.bike, 'boolean')
	if ('shortTrip' in ti) t.strictEqual(typeof ti.shortTrip, 'boolean')
	if ('group' in ti) t.strictEqual(typeof ti.group, 'boolean')
	if ('fullDay' in ti) t.strictEqual(typeof ti.fullDay, 'boolean')

	if (ti.tariff !== null) {
		t.strictEqual(typeof ti.tariff, 'string')
		t.ok(ti.tariff.length > 0)
	}
	if (ti.coverage !== null) {
		t.strictEqual(typeof ti.coverage, 'string')
		t.ok(ti.coverage.length > 0)
	}
	if (ti.variant !== null) {
		t.strictEqual(typeof ti.variant, 'string')
		t.ok(ti.variant.length > 0)
	}
}

module.exports = {
	assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	assertValidLine,
	isValidDateTime,
	assertValidStopover,
	hour, createWhen, isValidWhen, assertValidWhen,
	assertValidTicket
}
