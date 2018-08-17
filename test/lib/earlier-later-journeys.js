'use strict'

const co = require('./co')

const testEarlierLaterJourneys = co(function* (cfg) {
	const {
		test: t,
		fetchJourneys,
		fromId,
		toId,
		when,
		// todo: validate
	} = cfg

	const model = yield fetchJourneys(fromId, toId, {
		results: 3, departure: when
	})

	// todo: move to journeys validator?
	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// departure/arrival and earlierThan/laterThan should be mutually exclusive
	t.throws(() => {
		fetchJourneys(fromId, toId, {
			departure: when, earlierThan: model.earlierRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})
	t.throws(() => {
		fetchJourneys(fromId, toId, {
			departure: when, laterThan: model.laterRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})
	t.throws(() => {
		fetchJourneys(fromId, toId, {
			arrival: when, earlierThan: model.earlierRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})
	t.throws(() => {
		fetchJourneys(fromId, toId, {
			arrival: when, laterThan: model.laterRef
		})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})

	let earliestDep = Infinity, latestDep = -Infinity
	for (let j of model) {
		if (j.legs[0].departure === null) continue
		const dep = +new Date(j.legs[0].departure)
		if (dep < earliestDep) earliestDep = dep
		else if (dep > latestDep) latestDep = dep
	}

	const earlier = yield fetchJourneys(fromId, toId, {
		results: 3,
		// todo: single journey ref?
		earlierThan: model.earlierRef
	})
	for (let j of earlier) {
		t.ok(new Date(j.legs[0].departure) < earliestDep)
	}

	const later = yield fetchJourneys(fromId, toId, {
		results: 3,
		// todo: single journey ref?
		laterThan: model.laterRef
	})
	for (let j of later) {
		t.ok(new Date(j.legs[0].departure) > latestDep)
	}
})

module.exports = testEarlierLaterJourneys
