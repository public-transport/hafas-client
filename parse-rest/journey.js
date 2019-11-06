'use strict'

const parseScheduledDays = require('../parse/scheduled-days')

const createParseJourney = (profile, opt) => {
	const parseLeg = profile.parseJourneyLeg(profile, opt)

	const parseJourney = (j) => {
		const legs = j.legs.map(leg => parseLeg(j, leg))
		const res = {
			type: 'journey',
			legs,
			// todo: refreshToken
			// todo: cycle
			// todo: remarks?
		}

		if (opt.scheduledDays && j.serviceDays) {
			res.scheduledDays = parseScheduledDays(profile, j.serviceDays.sDaysB)
		}

		return res
	}

	return parseJourney
}

module.exports = createParseJourney
