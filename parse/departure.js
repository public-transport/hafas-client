'use strict'

// todos from derhuerst/hafas-client#2
// - stdStop.dPlatfS, stdStop.dPlatfR
// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType
// todo: d.freq, d.freq.jnyL, see https://github.com/derhuerst/hafas-client/blob/9203ed1481f08baacca41ac5e3c19bf022f01b0b/parse.js#L115

const createParseDeparture = (profile, stations, lines, remarks) => {
	const findRemark = rm => remarks[parseInt(rm.remX)] || null

	const parseDeparture = (d) => {
		const when = profile.parseDateTime(profile, d.date, d.stbStop.dTimeR || d.stbStop.dTimeS)
		const res = {
			journeyId: d.jid,
			station: stations[parseInt(d.stbStop.locX)] || null,
			when: when.toISO(),
			direction: profile.parseStationName(d.dirTxt),
			line: lines[parseInt(d.prodX)] || null,
			remarks: d.remL ? d.remL.map(findRemark) : [],
			trip: +d.jid.split('|')[1] // todo: this seems brittle
		}
		// todo: res.trip from rawLine.prodCtx.num?

		if (d.stbStop.dTimeR && d.stbStop.dTimeS) {
			const realtime = profile.parseDateTime(profile, d.date, d.stbStop.dTimeR)
			const planned = profile.parseDateTime(profile, d.date, d.stbStop.dTimeS)
			res.delay = Math.round((realtime - planned) / 1000)
		} else res.delay = null

		// todo: follow public-transport/friendly-public-transport-format#27 here
		// see also derhuerst/vbb-rest#19
		if (d.stbStop.aCncl || d.stbStop.dCncl) {
			res.cancelled = true
			res.when = res.delay = null
		}

		return res
	}

	return parseDeparture
}

module.exports = createParseDeparture
