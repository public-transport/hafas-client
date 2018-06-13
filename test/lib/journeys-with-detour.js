'use strict'

const co = require('./co')

const testJourneysWithDetour = co(function* (cfg) {
	const {test: t, journeys, validate, detourIds} = cfg

	// We assume that going from A to B via C *without* detour is currently
	// impossible. We check if the routing engine computes a detour.

	validate(t, journeys, 'journeys', 'journeys')

	const leg = journeys[0].legs.some((leg) => {
		return leg.stopovers && leg.stopovers.some((stopover) => {
			return detourIds.includes(stopover.station.id)
		})
	})
	t.ok(leg, detourIds.join('/') + ' is not being passed')
})

module.exports = testJourneysWithDetour
