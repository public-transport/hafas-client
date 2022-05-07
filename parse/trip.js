import minBy from 'lodash/minBy.js'
import maxBy from 'lodash/maxBy.js'
import last from 'lodash/last.js'

const parseTrip = (ctx, t) => { // t = raw trip
	const {profile} = ctx

	// pretend the trip is a leg in a journey
	const fakeLeg = {
		type: 'JNY',
		dep: Array.isArray(t.stopL)
			? minBy(t.stopL, 'idx') || t.stopL[0]
			: {},
		arr: Array.isArray(t.stopL)
			? maxBy(t.stopL, 'idx') || last(t.stopL)
			: {},
		jny: t,
	}

	// todo: this breaks if the trip starts on a different day
	// how does HAFAS do this?
	const today = () => profile.formatDate(profile, Date.now())
	const date = t.date || today()

	const trip = profile.parseJourneyLeg(ctx, fakeLeg, date)
	trip.id = trip.tripId
	delete trip.tripId
	delete trip.reachable

	return trip
}

export {
	parseTrip,
}
