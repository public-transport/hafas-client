'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const {DateTime} = require('luxon')
const isValidWGS84 = require('is-coordinates')

const assertValidStation = (t, s, coordsOptional = false) => {
	t.equal(s.type, 'station')
	t.equal(typeof s.id, 'string')
	t.ok(s.id)
	t.equal(typeof s.name, 'string')
	t.ok(s.name)

	if (!coordsOptional || (s.location !== null && s.location !== undefined)) {
		t.ok(s.location)
		assertValidLocation(t, s.location, coordsOptional)
	}
}

const assertValidPoi = (t, p) => {
	t.equal(typeof p.id, 'string')
	t.equal(typeof p.name, 'string')
	if (p.address !== null && p.address !== undefined) {
		t.equal(typeof p.address, 'string')
		t.ok(p.address)
	}
	assertValidLocation(t, p, true)
}

const assertValidAddress = (t, a) => {
	t.equal(typeof a.address, 'string')
	assertValidLocation(t, a, true)
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
	'train', 'bus', 'ferry', 'taxi', 'gondola', 'aircraft',
	'car', 'bicycle', 'walking'
]

const assertValidLine = (t, l) => {
	t.equal(l.type, 'line')
	t.equal(typeof l.name, 'string')
	t.ok(validLineModes.includes(l.mode), 'invalid mode ' + l.mode)
	t.equal(typeof l.product, 'string')
	t.equal(l.public, true)
}

const isValidDateTime = (w) => {
	return !Number.isNaN(+new Date(w))
}

const assertValidStopover = (t, s, coordsOptional = false) => {
	if ('arrival' in s) t.ok(isValidDateTime(s.arrival))
	if ('departure' in s) t.ok(isValidDateTime(s.departure))
	if (!('arrival' in s) && !('departure' in s)) {
		t.fail('stopover doesn\'t contain arrival or departure')
	}
	t.ok(s.station)
	assertValidStation(t, s.station, coordsOptional)
}

const hour = 60 * 60 * 1000
const week = 7 * 24 * hour

// next Monday 10 am
const when = DateTime.fromMillis(Date.now(), {
	zone: 'Europe/Berlin',
	locale: 'de-DE'
}).startOf('week').plus({weeks: 1, hours: 10}).toJSDate()
const isValidWhen = (w) => {
	const ts = +new Date(w)
	if (Number.isNaN(ts)) return false
	return isRoughlyEqual(12 * hour, +when, ts)
}

const assertValidWhen = (t, w) => {
	t.ok(isValidWhen(w), 'invalid when')
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
	hour, when, isValidWhen, assertValidWhen,
	assertValidTicket
}
