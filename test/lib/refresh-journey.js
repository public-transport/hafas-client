'use strict'

const simplify = j => j.legs.map(l => {
	return {
		origin: l.origin,
		destination: l.destination,
		departure: l.plannedDeparture || l.departure,
		arrival: l.plannedArrival || l.arrival,
		line: l.line
	}
})

const testRefreshJourney = async (cfg) => {
	const {
		test: t,
		fetchJourneys,
		refreshJourney,
		fromId,
		toId,
		when,
		// todo: validate
	} = cfg

	const modelRes = await fetchJourneys(fromId, toId, {
		results: 1, departure: when,
		stopovers: false
	})
	const [model] = modelRes.journeys

	// todo: move to journeys validator?
	t.equal(typeof model.refreshToken, 'string')
	t.ok(model.refreshToken)

	const refreshed = await refreshJourney(model.refreshToken, {
		stopovers: false
	})
	t.deepEqual(simplify(refreshed), simplify(model))
}

module.exports = testRefreshJourney
