'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const co = require('./co')

const testJourneysStationToPoi = co(function* (cfg) {
	const {test: t, journeys, validate, fromId} = cfg
	const {id, name, latitude, longitude} = cfg.to

	validate(t, journeys, 'journeys', 'journeys')
	t.strictEqual(journeys.length, 3)
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]

		const firstLeg = j.legs[0]
		t.strictEqual(firstLeg.origin.id, fromId)

		const d = j.legs[j.legs.length - 1].destination
		const n = `journeys[0].legs[${i}].destination`

		t.strictEqual(d.type, 'location', n + '.type is invalid')
		t.strictEqual(d.id, id, n + '.id is invalid')
		t.strictEqual(d.name, name, n + '.name is invalid')
		t.ok(isRoughlyEqual(.0001, d.latitude, latitude), n + '.latitude is invalid')
		t.ok(isRoughlyEqual(.0001, d.longitude, longitude), n + '.longitude is invalid')
	}
})

module.exports = testJourneysStationToPoi
