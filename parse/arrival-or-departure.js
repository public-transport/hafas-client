'use strict'

const parseWhen = require('./when')
const findRemarks = require('./find-remarks')

const ARRIVAL = 'a'
const DEPARTURE = 'd'

// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType/d.stbStop.aProgType

const createParseArrOrDep = (profile, opt, data, prefix) => {
	if (prefix !== ARRIVAL && prefix !== DEPARTURE) throw new Error('invalid prefix')

	const parseArrOrDep = (d) => {
		const tPlanned = d.stbStop[prefix + 'TimeS']
		const tPrognosed = d.stbStop[prefix + 'TimeR']
		const tzOffset = d.stbStop[prefix + 'TZOffset'] || null
		const cancelled = !!d.stbStop[prefix + 'Cncl']

		const res = {
			tripId: d.jid,
			stop: d.stbStop.location || null,
			...parseWhen(profile, d.date, tPlanned, tPrognosed, tzOffset, cancelled)
			// todo: for arrivals, this is the *origin*, not the *direction*
			direction: prefix === DEPARTURE && d.dirTxt && profile.parseStationName(d.dirTxt) || null,
			line: d.line || null,
			remarks: []
		}

		// todo: DRY with parseStopover
		// todo: DRY with parseJourneyLeg
		const pR = d.stbStop[prefix + 'PlatfR']
		const pP = d.stbStop[prefix + 'PlatfS']
		res.platform = pR || pP || null
		if (pR && pP && pR !== pP) res.scheduledPlatform = pP

		if (cancelled) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
		}

		if (opt.remarks) {
			res.remarks = findRemarks([
				...(d.remL || []),
				...(d.msgL || [])
			]).map(([remark]) => remark)
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
