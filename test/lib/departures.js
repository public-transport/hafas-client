'use strict'

const co = require('./co')

const testDepartures = co(function* (cfg) {
	const {test: t, departures: deps, validate, id} = cfg

	validate(t, deps, 'departures', 'departures')
	t.ok(deps.length > 0, 'must be >0 departures')
	for (let i = 0; i < deps.length; i++) {
		const dep = deps[i]
		const name = `deps[${i}]`

		t.equal(dep.station.id, id, name + '.station.id is invalid')
	}

	// todo: move into deps validator
	t.deepEqual(deps, deps.sort((a, b) => t.when > b.when))
})

module.exports = testDepartures
