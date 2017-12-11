'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const {DateTime} = require('luxon')

const assertValidStation = (t, s, coordsOptional = false) => {
	t.equal(typeof s.type, 'string')
	t.equal(s.type, 'station')
	t.equal(typeof s.id, 'string')

	t.equal(typeof s.name, 'string')
	if (!coordsOptional) {
		if (!s.coordinates) console.trace()
		t.ok(s.coordinates)
	}
	if (s.coordinates) {
		t.equal(typeof s.coordinates.latitude, 'number')
		t.equal(typeof s.coordinates.longitude, 'number')
	}
}

const assertValidPoi = (t, p) => {
	t.equal(typeof p.type, 'string')
	t.equal(p.type, 'poi')
	t.equal(typeof p.id, 'string')

	t.equal(typeof p.name, 'string')
	t.ok(p.coordinates)
	if (p.coordinates) {
		t.equal(typeof p.coordinates.latitude, 'number')
		t.equal(typeof p.coordinates.longitude, 'number')
	}
}

const assertValidAddress = (t, a) => {
	t.equal(typeof a.type, 'string')
	t.equal(a.type, 'address')

	t.equal(typeof a.name, 'string')
	t.ok(a.coordinates)
	if (a.coordinates) {
		t.equal(typeof a.coordinates.latitude, 'number')
		t.equal(typeof a.coordinates.longitude, 'number')
	}
}

const assertValidLocation = (t, l) => {
	if (l.type === 'station') assertValidStation(t, l)
	else if (l.type === 'poi') assertValidPoi(t, l)
	else if (l.type === 'address') assertValidAddress(t, l)
	else t.fail('invalid type ' + l.type)
}

const isValidMode = (m) => {
	return m === 'walking' ||
		m === 'train' ||
		m === 'bus' ||
		m === 'ferry'
}

const assertValidLine = (t, l) => {
	t.equal(l.type, 'line')
	t.equal(typeof l.name, 'string')
	t.ok(isValidMode(l.mode), 'invalid mode ' + l.mode)
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
const dt = DateTime.local().startOf('week').plus({weeks: 1, hours: 10})
const when = new Date(dt.toISO())
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
	isValidMode,
	assertValidLine,
	isValidDateTime,
	assertValidStopover,
	hour, when, isValidWhen, assertValidWhen,
	assertValidTicket
}
