'use strict'

const parseDateTime = require('./date-time')

// todos from derhuerst/hafas-client#2
// - stdStop.dCncl
// - stdStop.dPlatfS, stdStop.dPlatfR
// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType

// tz = timezone, s = stations, ln = lines, r = remarks
const createParseDeparture = (tz, s, ln, r) => {
	const parseDeparture = (d) => {
		const when = parseDateTime(tz, d.date, d.stbStop.dTimeR || d.stbStop.dTimeS)
		const result = {
			  ref: d.jid
			, station: s[parseInt(d.stbStop.locX)]
			, when: when.format()
			, direction: d.dirTxt
			, line: ln[parseInt(d.prodX)]
			, remarks: d.remL ? d.remL.map((rm) => r[parseInt(rm.remX)]) : null
			, trip: +d.jid.split('|')[1]
		}

		if (d.stbStop.dTimeR && d.stbStop.dTimeS) {
			const realtime = parseDateTime(tz, d.date, d.stbStop.dTimeR)
			const planned = parseDateTime(tz, d.date, d.stbStop.dTimeS)
			result.delay = Math.round((realtime - planned) / 1000)
		} else result.delay = null

		return result
	}

	return parseDeparture
}

module.exports = createParseDeparture
