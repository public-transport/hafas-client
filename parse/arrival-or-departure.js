'use strict'

const findRemark = require('./find-remark')

// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType/d.stbStop.aProgType

const createParseArrOrDep = (profile, opt, data, prefix) => {
	const {locations, lines, hints, warnings} = data
	if (prefix !== 'a' && prefix !== 'd') throw new Error('invalid prefix')

	const parseArrOrDep = (d) => {
		const t = d.stbStop[prefix + 'TimeR'] || d.stbStop[prefix + 'TimeS']
		const when = profile.parseDateTime(profile, d.date, t)

		const res = {
			tripId: d.jid,
			station: locations[parseInt(d.stbStop.locX)] || null,
			when: when.toISO(),
			direction: profile.parseStationName(d.dirTxt),
			line: lines[parseInt(d.prodX)] || null,
			remarks: ([]
				.concat(d.remL || [], d.msgL || [])
				.map(ref => findRemark(hints, warnings, ref))
				.filter(rem => !!rem) // filter unparsable
			),
			// todo: res.trip from rawLine.prodCtx.num?
			trip: +d.jid.split('|')[1] // todo: this seems brittle
		}

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		const tR = d.stbStop[prefix + 'TimeR']
		const tP = d.stbStop[prefix + 'TimeS']
		if (tR && tP) {
			const realtime = profile.parseDateTime(profile, d.date, tR)
			const planned = profile.parseDateTime(profile, d.date, tP)
			res.delay = Math.round((realtime - planned) / 1000)
		} else res.delay = null

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		const pR = d.stbStop[prefix + 'PlatfR']
		const pP = d.stbStop[prefix + 'PlatfS']
		res.platform = pR || pP || null
		// todo: `formerScheduledPlatform`

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		if (d.stbStop[prefix + 'Cncl']) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
			res.when = res.delay = null

			const when = profile.parseDateTime(profile, d.date, tP)
			res.formerScheduledWhen = when.toISO()
		}

		return res
	}

	return parseArrOrDep
}

module.exports = createParseArrOrDep
