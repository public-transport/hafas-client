'use strict'

const testDepartures = async (cfg) => {
	const {test: t, departures: deps, validate} = cfg
	const ids = cfg.ids || (cfg.id ? [cfg.id] : [])

	validate(t, deps, 'departures', 'departures')
	t.ok(deps.length > 0, 'must be >0 departures')
	for (let i = 0; i < deps.length; i++) {
		let stop = deps[i].stop
		let name = `deps[${i}].stop`
		if (stop.station) {
			stop = stop.station
			name += '.station'
		}

		t.ok(
			ids.includes(stop.id) ||
			(stop.station && ids.includes(stop.station.id)),
			name + '.id is invalid',
		)
	}

	// todo: move into deps validator
	t.same(deps, deps.sort((a, b) => t.when > b.when), 'departures must be sorted by .when')
}

module.exports = testDepartures
