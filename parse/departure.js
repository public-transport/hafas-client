'use strict'

const parseDateTime = require('./date-time')

// todos from derhuerst/hafas-client#2
// - stdStop.dCncl
// - stdStop.dPlatfS, stdStop.dPlatfR
// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType

const createParseDeparture = (timezone, stations, lines, remarks) => {
	const findRemark = rm => remarks[parseInt(rm.remX)] || null

	const parseDeparture = (d) => {
		const when = parseDateTime(timezone, d.date, d.stbStop.dTimeR || d.stbStop.dTimeS)
		const res = {
			ref: d.jid,
			station: stations[parseInt(d.stbStop.locX)] || null,
			when: when.format(),
			direction: d.dirTxt,
			line: lines[parseInt(d.prodX)] || null,
			remarks: d.remL ? d.remL.map(findRemark) : [],
			trip: +d.jid.split('|')[1] // todo: this seems brittle
		}

		if (d.stbStop.dTimeR && d.stbStop.dTimeS) {
			const realtime = parseDateTime(timezone, d.date, d.stbStop.dTimeR)
			const planned = parseDateTime(timezone, d.date, d.stbStop.dTimeS)
			res.delay = Math.round((realtime - planned) / 1000)
		} else res.delay = null

		return res
	}

	return parseDeparture
}

module.exports = createParseDeparture
