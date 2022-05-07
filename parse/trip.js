import minBy from 'lodash/minBy.js'
import maxBy from 'lodash/maxBy.js'
import last from 'lodash/last.js'

const parseTrip = (ctx, t) => { // t = raw trip
	const {profile, opt} = ctx

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

	if (opt.scheduledDays) {
		const nrOfStopovers = t.stopL.length
		// trips seem to use sDaysL[], journeys use sDays
		const sDaysL = Array.isArray(t.sDaysL) ? t.sDaysL : []
		const matchingSDays = sDaysL.filter((sDays) => {
			return sDays.fLocIdx === 0 && sDays.tLocIdx === (nrOfStopovers - 1)
		})

		// if there are >1 sDays, we don't know how to interpret them
		const sDays = matchingSDays.length === 1 ? matchingSDays[0] : null
		// todo [breaking]: rename to scheduledDates
		trip.scheduledDays = profile.parseScheduledDays(ctx, sDays)
	}

	return trip
}

export {
	parseTrip,
}
