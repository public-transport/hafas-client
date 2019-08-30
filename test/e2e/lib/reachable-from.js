'use strict'

const isPlainObject = require('lodash/isPlainObject')

const testReachableFrom = async (cfg) => {
	const {
		test: t,
		reachableFrom,
		address,
		when,
		maxDuration,
		validate
	} = cfg

	const results = await reachableFrom(address, {
		when, maxDuration
	})

	t.ok(Array.isArray(results), 'results must an array')
	t.ok(results.length > 0, 'results must have >0 items')

	for (let i = 0; i < results.length; i++) {
		const res = results[i]
		const name = `results[${i}]`

		t.ok(isPlainObject(res), name + ' must be an object')
		t.equal(typeof res.duration, 'number', name + '.duration must be a number')
		t.ok(res.duration > 0, name + '.duration must be >0')

		t.ok(Array.isArray(res.stations), name + '.stations must be an array')
		t.ok(res.stations.length > 0, name + '.stations must have >0 items')

		for (let j = 0; j < res.stations.length; j++) {
			validate(t, res.stations[j], ['stop', 'station'], `${name}.stations[${j}]`)
		}
	}

	const sorted = results.sort((a, b) => a.duration - b.duration)
	t.deepEqual(results, sorted, 'results must be sorted by res.duration')
}

module.exports = testReachableFrom
