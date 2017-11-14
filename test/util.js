'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const floor = require('floordate')

const assertValidStation = (t, s) => {
	t.equal(s.type, 'station')
	t.equal(typeof s.id, 'string')
}

const assertValidPoi = (t, p) => {
	t.equal(p.type, 'poi')
	t.equal(typeof p.id, 'string')
}

const assertValidAddress = (t, a) => {
	t.equal(a.type, 'address')
}

const assertValidLocation = (t, l) => {
	t.equal(typeof l.type, 'string')
	if (l.type === 'station') assertValidStation(t, l)
	else if (l.type === 'poi') assertValidPoi(t, l)
	else if (l.type === 'address') assertValidAddress(t, l)
	else t.fail('invalid type ' + l.type)

	t.equal(typeof l.name, 'string')
	t.ok(l.coordinates)
	t.equal(typeof l.coordinates.latitude, 'number')
	t.equal(typeof l.coordinates.longitude, 'number')
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
	if (!isValidMode(l.mode)) console.error(l)
	t.ok(isValidMode(l.mode), 'invalid mode ' + l.mode)
	t.equal(typeof l.product, 'string')
}

const isValidDateTime = (w) => {
	return !Number.isNaN(+new Date(w))
}

const assertValidStopover = (t, s) => {
	if ('arrival' in s) t.ok(isValidDateTime(s.arrival))
	if ('departure' in s) t.ok(isValidDateTime(s.departure))
	if (!('arrival' in s) && !('departure' in s)) {
		t.fail('stopover doesn\'t contain arrival or departure')
	}
	t.ok(s.station)
	assertValidStation(t, s.station)
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
	return isRoughlyEqual(10 * hour, +when, ts)
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
	when, isValidWhen
}
