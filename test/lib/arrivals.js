'use strict'

const testArrivals = async (cfg) => {
	const {test: t, arrivals: arrs, validate, id} = cfg

	validate(t, arrs, 'arrivals', 'arrivals')
	t.ok(arrs.length > 0, 'must be >0 arrivals')
	for (let i = 0; i < arrs.length; i++) {
		let stop = arrs[i].stop
		let name = `arrs[${i}].stop`
		if (stop.station) {
			stop = stop.station
			name += '.station'
		}

		t.equal(stop.id, id, name + '.id is invalid')
	}

	// todo: move into arrivals validator
	t.deepEqual(arrs, arrs.sort((a, b) => t.when > b.when))
}

module.exports = testArrivals
