import isRoughlyEqual from 'is-roughly-equal'

import {hour} from './util.js'

const testLegCycleAlternatives = async (cfg) => {
	const {
		test: t,
		fetchJourneys,
		fromId,
		toId
	} = cfg

	// Apparently HAFAS doesn't return the leg cycle or alternatives more
	// than ~2 hours in advance. This is why we don't pass `when` here.
	const journeys = await fetchJourneys(fromId, toId, {results: 3})

	for (let i = 0; i < journeys.length; i++) {
		const journey = journeys[i]
		for (let j = 0; j < journey.legs.length; j++) {
			const leg = journey.legs[j]
			const name = `journeys[${i}].legs[${j}]`

			if (!leg.line) continue

			t.ok(leg.cycle, name + '.cycle is missing')
			t.equal(typeof leg.cycle.min, 'number', name + '.cycle.min is not a number')
			t.equal(typeof leg.cycle.max, 'number', name + '.cycle.max is not a number')
			t.equal(typeof leg.cycle.nr, 'number', name + '.cycle.nr is not a number')

			const lineWhen = +new Date(leg.departure)
			t.ok(Array.isArray(leg.alternatives), name + '.alternatives must be an array')
			for (let k = 0; k < leg.alternatives.length; k++) {
				const a = leg.alternatives[k]
				const n = name + `.alternatives[${k}]`

				let alternativeWhen = +new Date(a.when)
				if ('number' === typeof a.delay) alternativeWhen -= a.delay * 1000
				t.ok(isRoughlyEqual(2 * hour, alternativeWhen, lineWhen), n + '.when seems invalid')
			}
		}
	}
}

export {
	testLegCycleAlternatives,
}
