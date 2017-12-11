'use strict'

const createParseStopover = (profile, stations, lines, remarks, connection) => {
	const parseStopover = (st) => {
		const res = {
			station: stations[parseInt(st.locX)] || null
		}
		if (st.aTimeR || st.aTimeS) {
			const arr = profile.parseDateTime(profile, connection.date, st.aTimeR || st.aTimeS)
			res.arrival = arr.format()
		}
		if (st.dTimeR || st.dTimeS) {
			const dep = profile.parseDateTime(profile, connection.date, st.dTimeR || st.dTimeS)
			res.departure = dep.format()
		}
		return res
	}

	return parseStopover
}

module.exports = createParseStopover
