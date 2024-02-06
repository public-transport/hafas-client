const simplify = j => j.legs.map(l => {
	return {
		origin: l.origin,
		destination: l.destination,
		departure: l.plannedDeparture || l.departure,
		arrival: l.plannedArrival || l.arrival,
		line: l.line,
	};
});

const testRefreshJourney = async (cfg) => {
	const {
		test: t,
		fetchJourneys,
		refreshJourney,
		validate,
		fromId,
		toId,
		when,
	} = cfg;

	const modelRes = await fetchJourneys(fromId, toId, {
		results: 1, departure: when,
		stopovers: false,
	});
	validate(t, modelRes, 'journeysResult', 'modelRes');
	const [model] = modelRes.journeys;

	// todo: move to journeys validator?
	t.equal(typeof model.refreshToken, 'string');
	t.ok(model.refreshToken);

	const refreshedRes = await refreshJourney(model.refreshToken, {
		stopovers: false,
	});
	validate(t, refreshedRes, 'refreshJourneyResult', 'refreshedRes');
	const refreshed = refreshedRes.journey;

	t.same(simplify(refreshed), simplify(model));
};

export {
	testRefreshJourney,
};
