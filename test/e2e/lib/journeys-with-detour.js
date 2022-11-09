const testJourneysWithDetour = async (cfg) => {
	const {test: t, res, validate, detourIds} = cfg

	// We assume that going from A to B via C *without* detour is currently
	// impossible. We check if the routing engine computes a detour.

	validate(t, res, 'journeysResult', 'res')
	const {journeys} = res

	const leg = journeys[0].legs.some((leg) => {
		return leg.stopovers && leg.stopovers.some((st) => (
			st.stop.station && detourIds.includes(st.stop.station.id) ||
			detourIds.includes(st.stop.id)
		))
	})
	t.ok(leg, detourIds.join('/') + ' is not being passed')
}

export {
	testJourneysWithDetour,
}
