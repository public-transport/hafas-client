'use strict'

const testDepartures = async (cfg) => {
	const {test: t, departures: deps, validate, id} = cfg

	validate(t, deps, 'departures', 'departures')
	t.ok(deps.length > 0, 'must be >0 departures')
	for (let i = 0; i < deps.length; i++) {
		let stop = deps[i].stop
		let name = `deps[${i}].stop`
		if (stop.station) {
			stop = stop.station
			name += '.station'
		}

		t.equal(stop.id, id, name + '.id is invalid')
	}

	// todo: move into deps validator
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))
}

module.exports = testDepartures
