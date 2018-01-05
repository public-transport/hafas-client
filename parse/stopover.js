'use strict'

// todo: arrivalDelay, departureDelay or only delay ?
// todo: arrivalPlatform, departurePlatform
const createParseStopover = (profile, stations, lines, remarks, connection) => {
	const parseStopover = (st) => {
		const res = {
			station: stations[parseInt(st.locX)] || null
		}
		if (st.aTimeR || st.aTimeS) {
			const arr = profile.parseDateTime(profile, connection.date, st.aTimeR || st.aTimeS)
			res.arrival = arr.toISO()
		}
		if (st.dTimeR || st.dTimeS) {
			const dep = profile.parseDateTime(profile, connection.date, st.dTimeR || st.dTimeS)
			res.departure = dep.toISO()
		}

		// todo: follow public-transport/friendly-public-transport-format#27 here
		// see also derhuerst/vbb-rest#19
		if (st.aCncl) {
			res.cancelled = true
			res.arrival = null
		}
		if (st.dCncl) {
			res.cancelled = true
			res.departure = null
		}

		return res
	}

	return parseStopover
}

module.exports = createParseStopover
