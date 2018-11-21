'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const testJourneysStationToPoi = async (cfg) => {
	const {test: t, journeys, validate, fromId} = cfg
	const {id, name, latitude, longitude} = cfg.to

	validate(t, journeys, 'journeys', 'journeys')
	t.strictEqual(journeys.length, 3)
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]

		let o = j.legs[0].origin
		let oN = `journeys[0].legs[0].destination`
		if (o.station) {
			o = o.station
			oN += '.station'
		}
		t.strictEqual(o.id, fromId)

		let d = j.legs[j.legs.length - 1].destination
		let dN = `journeys[${i}].legs[${j.legs.length - 1}].destination`
		if (d.station) {
			d = d.station
			dN += '.station'
		}

		t.strictEqual(d.type, 'location', dN + '.type is invalid')
		t.strictEqual(d.id, id, dN + '.id is invalid')
		t.strictEqual(d.name, name, dN + '.name is invalid')
		t.ok(isRoughlyEqual(.0001, d.latitude, latitude), dN + '.latitude is invalid')
		t.ok(isRoughlyEqual(.0001, d.longitude, longitude), dN + '.longitude is invalid')
	}
}

module.exports = testJourneysStationToPoi
