'use strict'

const createParseJourneyLeg = require('./journey-leg')

const clone = obj => Object.assign({}, obj)

const createParseJourney = (profile, stations, lines, remarks) => {
	const parseLeg = createParseJourneyLeg(profile, stations, lines, remarks)

	// todo: c.sDays
	// todo: c.dep.dProgType, c.arr.dProgType
	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	const parseJourney = (j) => {
		const legs = j.secL.map(leg => parseLeg(j, leg))
		const res = {
			type: 'journey',
			legs,
			origin: legs[0].origin,
			destination: legs[legs.length - 1].destination,
			departure: legs[0].departure,
			arrival: legs[legs.length - 1].arrival
		}
		if (legs.some(p => p.cancelled)) {
			res.cancelled = true
			res.departure = res.arrival = null
		}

		return res
	}

	return parseJourney
}

module.exports = createParseJourney
