'use strict'

const testJourneysStationToStation = async (cfg) => {
	const {test: t, res, validate, fromId, toId} = cfg

	validate(t, res, 'journeysResult', 'res')
	const {journeys} = res

	t.strictEqual(journeys.length, 4)
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]

		let origin = j.legs[0].origin
		if (origin.station) origin = origin.station
		let dest = j.legs[j.legs.length - 1].destination
		if (dest.station) dest = dest.station
		t.strictEqual(origin.id, fromId)
		t.strictEqual(dest.id, toId)
	}
}

module.exports = testJourneysStationToStation
