'use strict'

const co = require('./co')

const testJourneysStationToStation = co(function* (cfg) {
	const {test: t, journeys, validate, fromId, toId} = cfg

	validate(t, journeys, 'journeys', 'journeys')
	t.strictEqual(journeys.length, 3)
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]

		const firstLeg = j.legs[0]
		const lastLeg = j.legs[j.legs.length - 1]
		t.strictEqual(firstLeg.origin.id, fromId)
		t.strictEqual(lastLeg.destination.id, toId)
	}
})

module.exports = testJourneysStationToStation
