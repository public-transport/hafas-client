'use strict'

const parseJourney = (ctx, j) => { // j = journey
	const {profile, opt} = ctx

	const res = {
		type: 'journey',
		legs: j.legs.map(leg => profile.parseJourneyLeg(ctx, leg)),
		// todo: refreshToken
		// todo: cycle
		// todo: remarks?
	}

	if (opt.scheduledDays && j.serviceDays) {
		res.scheduledDays = profile.parseScheduledDays(ctx, j.serviceDays)
	}

	return res
}

export {
	parseJourney,
}
