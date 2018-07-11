'use strict'

const co = require('./co')

const testArrivals = co(function* (cfg) {
	const {test: t, arrivals: arrs, validate, id} = cfg

	validate(t, arrs, 'arrivals', 'arrivals')
	t.ok(arrs.length > 0, 'must be >0 arrivals')
	for (let i = 0; i < arrs.length; i++) {
		let station = arrs[i].station
		let name = `arrs[${i}].station`
		if (station.station) {
			station = station.station
			name += '.station'
		}

		t.equal(station.id, id, name + '.id is invalid')
	}

	// todo: move into arrivals validator
	t.deepEqual(arrs, arrs.sort((a, b) => t.when > b.when))
})

module.exports = testArrivals
