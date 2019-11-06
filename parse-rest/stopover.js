'use strict'

const createParseStopover = (profile, opt, data) => {
	const parseStopover = (_, st) => {
		const arr = profile.parseWhen(profile, st.arrDate, st.rtArrDate, st.arrTime, st.rtArrTime, st.arrTz, !st.rtAlighting)
		// todo: is there a `st.rtArrTrack`?
		const arrPl = profile.parsePlatform(profile, st.arrTrack, null, !st.rtAlighting)
		const dep = profile.parseWhen(profile, st.depDate, st.rtDepDate, st.depTime, st.rtDepTime, st.depTz, !st.rtBoarding)
		// todo: is there a `st.rtDepTrack`?
		const depPl = profile.parsePlatform(profile, st.depTrack, null, !st.rtBoarding)

		const res = {
			stop: profile.parseLocation(profile, opt, data, st) || null,
			arrival: arr.when,
			plannedArrival: arr.plannedWhen,
			arrivalDelay: arr.delay,
			arrivalPlatform: arrPl.platform,
			plannedArrivalPlatform: arrPl.plannedPlatform,
			departure: dep.when,
			plannedDeparture: dep.plannedWhen,
			departureDelay: dep.delay,
			departurePlatform: depPl.platform,
			plannedDeparturePlatform: depPl.plannedPlatform
		}

		if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen
		if (arrPl.prognosedPlatform) res.prognosedArrivalPlatform = arrPl.prognosedPlatform
		if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen
		if (depPl.prognosedPlatform) res.prognosedDeparturePlatform = depPl.prognosedPlatform

		if (st.rtBoarding === false || st.rtAlighting === false) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
		}

		return res
	}

	return parseStopover
}

module.exports = createParseStopover
