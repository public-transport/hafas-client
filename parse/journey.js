'use strict'

const clone = obj => Object.assign({}, obj)

const createParseJourney = (profile, stations, lines, remarks) => {
	const parseLeg = profile.parseJourneyLeg(profile, stations, lines, remarks)

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
			Object.defineProperty(res, 'canceled', {value: true})
			res.departure = res.arrival = null

			const firstLeg = j.secL[0]
			const dep = profile.parseDateTime(profile, j.date, firstLeg.dep.dTimeS)
			res.formerScheduledDeparture = dep.toISO()

			const lastLeg = j.secL[j.secL.length - 1]
			const arr = profile.parseDateTime(profile, j.date, lastLeg.arr.aTimeS)
			res.formerScheduledArrival = arr.toISO()
		}

		return res
	}

	return parseJourney
}

module.exports = createParseJourney
