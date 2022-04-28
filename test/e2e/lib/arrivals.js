'use strict'

const testArrivals = async (cfg) => {
	const {test: t, arrivals: arrs, validate} = cfg
	const ids = cfg.ids || (cfg.id ? [cfg.id] : [])

	validate(t, arrs, 'arrivals', 'arrivals')
	t.ok(arrs.length > 0, 'must be >0 arrivals')
	for (let i = 0; i < arrs.length; i++) {
		let stop = arrs[i].stop
		let name = `arrs[${i}].stop`
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

	// todo: move into arrivals validator
	t.same(arrs, arrs.sort((a, b) => t.when > b.when), 'arrivals must be sorted by .when')
}

module.exports = testArrivals
