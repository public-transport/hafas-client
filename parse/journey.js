'use strict'

const parseDateTime = require('./date-time')
const createParseJourneyPart = require('./journey-part')

const clone = obj => Object.assign({}, obj)

const createParseJourney = (profile, stations, lines, remarks) => {
	const parsePart = createParseJourneyPart(profile, stations, lines, remarks)

	// todo: c.sDays
	// todo: c.dep.dProgType, c.arr.dProgType
	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	// todo: use computed information from part
	const parseJourney = (j) => {
		const parts = j.secL.map(part => parsePart(j, part))
		return {
			parts,
			origin: parts[0].origin,
			destination: parts[parts.length - 1].destination,
			departure: parts[0].departure,
			arrival: parts[parts.length - 1].arrival
		}
	}

	return parseJourney
}

module.exports = createParseJourney
