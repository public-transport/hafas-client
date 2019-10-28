'use strict'

const findRemark = require('./find-remark')

const ARRIVAL = 'a'
const DEPARTURE = 'd'

// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType/d.stbStop.aProgType

const createParseArrOrDep = (profile, opt, data, prefix) => {
	const {locations, lines, hints, warnings} = data
	if (prefix !== ARRIVAL && prefix !== DEPARTURE) throw new Error('invalid prefix')

	const parseArrOrDep = (d) => {
		const t = d.stbStop[prefix + 'TimeR'] || d.stbStop[prefix + 'TimeS']
		const tz = d.stbStop[prefix + 'TZOffset'] || null

		const res = {
			tripId: d.jid,
			stop: locations[parseInt(d.stbStop.locX)] || null,
			when: profile.parseDateTime(profile, d.date, t, tz),
			// todo: for arrivals, this is the *origin*, not the *direction*
			direction: prefix === DEPARTURE && d.dirTxt && profile.parseStationName(d.dirTxt) || null,
			line: lines[parseInt(d.prodX)] || null,
			remarks: []
		}

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		const tR = d.stbStop[prefix + 'TimeR']
		const tP = d.stbStop[prefix + 'TimeS']
		if (tR && tP) {
			const realtime = profile.parseDateTime(profile, d.date, tR, tz, true)
			const planned = profile.parseDateTime(profile, d.date, tP, tz, true)
			res.delay = Math.round((realtime - planned) / 1000)
		} else res.delay = null

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		const pR = d.stbStop[prefix + 'PlatfR']
		const pP = d.stbStop[prefix + 'PlatfS']
		res.platform = pR || pP || null
		if (pR && pP && pR !== pP) res.scheduledPlatform = pP

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		if (d.stbStop[prefix + 'Cncl']) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
			res.when = res.delay = null
			res.scheduledWhen = profile.parseDateTime(profile, d.date, tP, tz)
		}

		if (opt.remarks) {
			res.remarks = []
			.concat(d.remL || [], d.msgL || [])
			.map(ref => findRemark(hints, warnings, ref))
			.filter(rem => !!rem) // filter unparsable
		}

   		if (opt.stopovers && Array.isArray(d.stopL)) {
  			const parse = profile.parseStopover(profile, opt, data, d.date)
  			// Filter stations the train passes without stopping, as this doesn't comply with FPTF (yet).
  			const stopovers = d.stopL.map(parse).filter(st => !st.passBy)
  			if (prefix === ARRIVAL) res.previousStopovers = stopovers
			else if (prefix === DEPARTURE) res.nextStopovers = stopovers
  		}

		return res
	}

	return parseArrOrDep
}

module.exports = createParseArrOrDep
