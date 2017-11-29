'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const floor = require('floordate')

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

const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day

// next Monday
const when = new Date(+floor(new Date(), 'week') + week + 10 * hour)
const isValidWhen = (w) => {
	const ts = +new Date(w)
	if (Number.isNaN(ts)) return false
	return isRoughlyEqual(12 * hour, +when, ts)
}

const assertValidWhen = (t, w) => {
	t.ok(isValidWhen(w), 'invalid when')
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
	hour, when, isValidWhen, assertValidWhen
}
