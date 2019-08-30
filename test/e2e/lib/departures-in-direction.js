'use strict'

const testDeparturesInDirection = async (cfg) => {
	const {
		test: t,
		fetchDepartures,
		fetchTrip,
		id,
		directionIds,
		when,
		validate
	} = cfg

	const deps = await fetchDepartures(id, {
		direction: directionIds[0],
		when
	})
	validate(t, deps, 'departures', 'departures')
	t.ok(deps.length > 0, 'must be >0 departures')

	for (let i = 0; i < deps.length; i++) {
		const dep = deps[i]
		const name = `deps[${i}]`

		const line = dep.line && dep.line.name
		const trip = await fetchTrip(dep.tripId, line, {
			when, stopovers: true
		})
		t.ok(trip.stopovers.some(st => (
			st.stop.station && directionIds.includes(st.stop.station.id) ||
			directionIds.includes(st.stop.id)
		)), `trip ${dep.tripId} of ${name} has no stopover at ${directionIds}`)
	}
}

module.exports = testDeparturesInDirection
