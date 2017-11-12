'use strict'

const isRoughlyEqual = require('is-roughly-equal')
const getStations = require('db-stations').full
const floor = require('floordate')

const findStation = (id) => new Promise((yay, nay) => {
	const stations = getStations()
	stations
	.once('error', nay)
	.on('data', (s) => {
		if (
			s.id === id ||
			(s.additionalIds && s.additionalIds.includes(id))
		) {
			yay(s)
			stations.destroy()
		}
	})
	.once('end', yay)
})

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

	t.equal(typeof s.name, 'string')
	t.ok(s.coordinates)
	t.equal(typeof s.coordinates.latitude, 'number')
	t.equal(typeof s.coordinates.longitude, 'number')
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
	t.ok(isValidMode(l.mode))
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

const isJungfernheide = (s) => {
	return s.type === 'station' &&
	s.id === '8011167' &&
	s.name === 'Berlin Jungfernheide' &&
	s.coordinates &&
	isRoughlyEqual(s.coordinates.latitude, 52.530408, .0005) &&
	isRoughlyEqual(s.coordinates.longitude, 13.299424, .0005)
}

const assertIsJungfernheide = (t, s) => {
	t.equal(s.type, 'station')
	t.equal(s.id, '8011167')
	t.equal(s.name, 'Berlin Jungfernheide')
	t.ok(s.coordinates)
	t.ok(isRoughlyEqual(s.coordinates.latitude, 52.530408, .0005))
	t.ok(isRoughlyEqual(s.coordinates.longitude, 13.299424, .0005))
}

const assertIsMünchenHbf = (s) => {
	t.equal(s.type, 'station')
	t.equal(s.id, '8000261')
	t.equal(s.name, 'München Hbf')
	t.ok(s.coordinates)
	t.equal(s.coordinates.latitude, 48.140229)
	t.equal(s.coordinates.longitude, 11.558339)
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
	findStation,
	assertValidStation,
	assertValidPoi,
	assertValidAddress,
	assertValidLocation,
	isValidMode,
	assertValidLine,
	isValidDateTime,
	assertValidStopover,
	isJungfernheide, assertIsJungfernheide,
	assertIsMünchenHbf,
	when, isValidWhen
}
