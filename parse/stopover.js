'use strict'

// todo: arrivalDelay, departureDelay or only delay ?
// todo: arrivalPlatform, departurePlatform
const createParseStopover = (profile, stations, lines, remarks, date) => {
	const parseStopover = (st) => {
		const res = {
			station: stations[parseInt(st.locX)] || null,
			arrival: null,
			departure: null
		}
		if (st.aTimeR || st.aTimeS) {
			const arr = profile.parseDateTime(profile, date, st.aTimeR || st.aTimeS)
			res.arrival = arr.toISO()
		}
		if (st.dTimeR || st.dTimeS) {
			const dep = profile.parseDateTime(profile, date, st.dTimeR || st.dTimeS)
			res.departure = dep.toISO()
		}

		// mark stations the train passes without stopping
		if(st.dInS === false && st.aOutS === false) res.passBy = true

		// todo: DRY with parseDeparture
		// todo: DRY with parseJourneyLeg
		if (st.aCncl || st.dCncl) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
			if (st.aCncl) {
				res.arrival = res.arrivalDelay = null
				const arr = profile.parseDateTime(profile, date, st.aTimeS)
				res.formerScheduledArrival = arr.toISO()
			}
			if (st.dCncl) {
				res.departure = res.departureDelay = null
				const arr = profile.parseDateTime(profile, date, st.dTimeS)
				res.formerScheduledDeparture = arr.toISO()
			}
		}

		return res
	}

	return parseStopover
}

module.exports = createParseStopover
