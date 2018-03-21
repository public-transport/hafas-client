'use strict'

const createParseJourneyLeg = require('./journey-leg')

const clone = obj => Object.assign({}, obj)

const createParseJourney = (profile, stations, lines, remarks) => {
	const parseLeg = createParseJourneyLeg(profile, stations, lines, remarks)

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
