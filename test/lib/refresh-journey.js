'use strict'

const simplify = j => j.legs.map(l => {
	let departure = null
	if (l.departure) {
		departure = +new Date(l.departure)
		if ('number' === typeof l.departureDelay) departure -= l.departureDelay * 1000
	}
	let arrival = null
	if (l.arrival) {
		arrival = +new Date(l.arrival)
		if ('number' === typeof l.arrivalDelay) arrival -= l.arrivalDelay * 1000
	}
	return {
		origin: l.origin,
		destination: l.destination,
		scheduledDeparture: departure,
		scheduledArrival: arrival,
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

	const [model] = await fetchJourneys(fromId, toId, {
		results: 1, departure: when,
		stopovers: false
	})

	// todo: move to journeys validator?
	t.equal(typeof model.refreshToken, 'string')
	t.ok(model.refreshToken)

	const refreshed = await refreshJourney(model.refreshToken, {
		stopovers: false
	})
	t.deepEqual(simplify(refreshed), simplify(model))
}

module.exports = testRefreshJourney
