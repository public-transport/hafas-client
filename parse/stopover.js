'use strict'

const parseWhen = require('./when')
const findRemarks = require('./find-remarks')

const createParseStopover = (profile, opt, data, date) => {
	const parseStopover = (st) => {
		const arr = parseWhen(profile, date, st.aTimeS, st.aTimeR, st.aTZOffset, st.aCncl)
		const dep = parseWhen(profile, date, st.dTimeS, st.dTimeR, st.dTZOffset, st.dCncl)

		const res = {
			stop: st.location || null,
			arrival: arr.when,
			plannedArrival: arr.plannedWhen,
			arrivalDelay: arr.delay,
			arrivalPlatform: st.aPlatfR || st.aPlatfS || null,
			departure: dep.when,
			plannedDeparture: dep.plannedWhen,
			departureDelay: dep.delay,
			departurePlatform: st.dPlatfR || st.dPlatfS || null
		}

		if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen
		if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen

		if (st.aPlatfR && st.aPlatfS && st.aPlatfR !== st.aPlatfS) {
			res.scheduledArrivalPlatform = st.aPlatfS
		}
		if (st.dPlatfR && st.dPlatfS && st.dPlatfR !== st.dPlatfS) {
			res.scheduledDeparturePlatform = st.dPlatfS
		}

		// mark stations the train passes without stopping
		if(st.dInS === false && st.aOutS === false) res.passBy = true

		if (st.aCncl || st.dCncl) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
		}

		if (opt.remarks && Array.isArray(st.msgL)) {
			res.remarks = findRemarks(st.msgL).map(([remark]) => remark)
		}

		return res
	}

	return parseStopover
}

module.exports = createParseStopover
