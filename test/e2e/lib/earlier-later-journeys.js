const testEarlierLaterJourneys = async (cfg) => {
	const {
		test: t,
		fetchJourneys,
		fromId,
		toId,
		when
		// todo: validate
	} = cfg

	const model = await fetchJourneys(fromId, toId, {
		results: 3, departure: when
	})

	// todo: move to journeys validator?
	t.equal(typeof model.earlierRef, 'string')
	t.ok(model.earlierRef)
	t.equal(typeof model.laterRef, 'string')
	t.ok(model.laterRef)

	// departure/arrival and earlierThan/laterThan should be mutually exclusive
	await t.rejects(async () => {
		await fetchJourneys(fromId, toId, {
			departure: when, earlierThan: model.earlierRef
		})
	})
	await t.rejects(async () => {
		await fetchJourneys(fromId, toId, {
			departure: when, laterThan: model.laterRef
		})
	})
	await t.rejects(async () => {
		await fetchJourneys(fromId, toId, {
			arrival: when, earlierThan: model.earlierRef
		})
	})
	await t.rejects(async () => {
		await fetchJourneys(fromId, toId, {
			arrival: when, laterThan: model.laterRef
		})
	})

	let earliestDep = Infinity, latestDep = -Infinity
	for (let j of model.journeys) {
		if (j.legs[0].departure === null) continue
		const dep = Date.parse(j.legs[0].departure)
		if (dep < earliestDep) earliestDep = dep
		else if (dep > latestDep) latestDep = dep
	}

	const earlier = await fetchJourneys(fromId, toId, {
		results: 3,
		// todo: single journey ref?
		earlierThan: model.earlierRef
	})
	for (let j of earlier.journeys) {
		const firstLeg = j.legs[0]
		const dep = Date.parse(firstLeg.departure || firstLeg.plannedDeparture)
		t.ok(dep < earliestDep)
	}

	const later = await fetchJourneys(fromId, toId, {
		results: 3,
		// todo: single journey ref?
		laterThan: model.laterRef
	})
	for (let j of later.journeys) {
		const firstLeg = j.legs[0]
		const dep = Date.parse(firstLeg.departure || firstLeg.plannedDeparture)
		t.ok(dep > latestDep)
	}
}

export {
	testEarlierLaterJourneys,
}
