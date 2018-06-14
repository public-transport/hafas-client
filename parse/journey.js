'use strict'

const clone = obj => Object.assign({}, obj)

const createParseJourney = (profile, stations, lines, remarks, polylines) => {
	const parseLeg = profile.parseJourneyLeg(profile, stations, lines, remarks, polylines)

	// todo: c.sDays
	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	const parseJourney = (j) => {
		const legs = j.secL.map(leg => parseLeg(j, leg))
		const res = {
			type: 'journey',
			legs
		}

		return res
	}

	return parseJourney
}

module.exports = createParseJourney
