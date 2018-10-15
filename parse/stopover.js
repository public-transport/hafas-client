'use strict'

const findRemark = require('./find-remark')

const createParseStopover = (profile, opt, data, date) => {
	const {locations, lines, hints, warnings} = data

	const parseStopover = (st) => {
		const res = {
			stop: locations[parseInt(st.locX)] || null,
			arrival: null,
			arrivalDelay: null,
			arrivalPlatform: st.aPlatfR || st.aPlatfS || null,
			departure: null,
			departureDelay: null,
			departurePlatform: st.dPlatfR || st.dPlatfS || null
		}

		// todo: DRY with parseDeparture
		// todo: DRY with parseJourneyLeg
		if (st.aTimeR || st.aTimeS) {
			res.arrival = profile.parseDateTime(profile, date, st.aTimeR || st.aTimeS)
		}
		if (st.aTimeR && st.aTimeS) {
			const realtime = profile.parseDateTime(profile, date, st.aTimeR, true)
			const planned = profile.parseDateTime(profile, date, st.aTimeS, true)
			res.arrivalDelay = Math.round((realtime - planned) / 1000)
		}

		if (st.dTimeR || st.dTimeS) {
			res.departure = profile.parseDateTime(profile, date, st.dTimeR || st.dTimeS)
		}
		if (st.dTimeR && st.dTimeS) {
			const realtime = profile.parseDateTime(profile, date, st.dTimeR, true)
			const planned = profile.parseDateTime(profile, date, st.dTimeS, true)
			res.departureDelay = Math.round((realtime - planned) / 1000)
		}

		if (st.aPlatfR && st.aPlatfS && st.aPlatfR !== st.aPlatfS) {
			res.formerScheduledArrivalPlatform = st.aPlatfS
		}
		if (st.dPlatfR && st.dPlatfS && st.dPlatfR !== st.dPlatfS) {
			res.formerScheduledDeparturePlatform = st.dPlatfS
		}

		// mark stations the train passes without stopping
		if(st.dInS === false && st.aOutS === false) res.passBy = true

		// todo: DRY with parseDeparture
		// todo: DRY with parseJourneyLeg
		if (st.aCncl || st.dCncl) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
			if (st.aCncl) {
				res.formerArrivalDelay = res.arrivalDelay
				res.arrival = res.arrivalDelay = null
				if (st.aTimeS) {
					res.formerScheduledArrival = profile.parseDateTime(profile, date, st.aTimeS)
				}
			}
			if (st.dCncl) {
				res.formerDepartureDelay = res.departureDelay
				res.departure = res.departureDelay = null
				if (st.dTimeS) {
					res.formerScheduledDeparture = profile.parseDateTime(profile, date, st.dTimeS)
				}
			}
		}

		if (opt.remarks && Array.isArray(st.msgL)) {
			res.remarks = []
			for (let ref of st.msgL) {
				const remark = findRemark(hints, warnings, ref)
				if (remark) res.remarks.push(remark)
			}
		}

		return res
	}

	return parseStopover
}

module.exports = createParseStopover
