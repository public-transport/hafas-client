const parseMovement = (ctx, m) => { // m = raw movement
	const {profile} = ctx

	const stopovers = Array.isArray(m.stops) ? m.stops : []

	const res = {
		tripId: m.ref || null,
		direction: m.direction || null,
		location: {
			type: 'location',
			latitude: m.lat,
			longitude: m.lon,
		},
		// todo: use .name, .trainNumber & trainCategory?
		line: m.Product ? profile.parseLine(ctx, m.Product) : null,

		// todo: stopL[0] is the first of the trip! -> filter out
		nextStopovers: stopovers.map(s => profile.parseStopover(ctx, s)),
	}

	// todo: parse & expose polyline?

	return res
}

export {
	parseMovement,
}
