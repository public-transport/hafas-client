'use strict'

// s = stations, ln = lines, r = remarks, c = connection
const createParseStopover = (tz, s, ln, r, c) => {
	const parseStopover = (st) => {
		const res = {
			station: s[parseInt(st.locX)]
		}
		if (st.aTimeR || st.aTimeS) {
			const arr = parseDateTime(tz, c.date, st.aTimeR || st.aTimeS)
			res.arrival = arr.format()
		}
		if (st.dTimeR || st.dTimeS) {
			const dep = parseDateTime(tz, c.date, st.dTimeR || st.dTimeS)
			res.departure = dep.format()
		}
		return res
	}

	return parseStopover
}

module.exports = createParseStopover
