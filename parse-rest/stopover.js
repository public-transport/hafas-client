'use strict'

const parseStopover = (ctx, st) => {
	const {profile} = ctx

	const arr = profile.parseWhen(ctx, st.arrDate, st.rtArrDate, st.arrTime, st.rtArrTime, st.arrTz, st.rtAlighting === false)
	// todo: is there a `st.rtArrTrack`?
	const arrPl = profile.parsePlatform(ctx, st.arrTrack, null, st.rtAlighting === false)
	const dep = profile.parseWhen(ctx, st.depDate, st.rtDepDate, st.depTime, st.rtDepTime, st.depTz, st.rtBoarding === false)
	// todo: is there a `st.rtDepTrack`?
	const depPl = profile.parsePlatform(ctx, st.depTrack, null, st.rtBoarding === false)

	const res = {
		stop: profile.parseLocation(ctx, st) || null,
		arrival: arr.when,
		plannedArrival: arr.plannedWhen,
		arrivalDelay: arr.delay,
		arrivalPlatform: arrPl.platform,
		plannedArrivalPlatform: arrPl.plannedPlatform,
		departure: dep.when,
		plannedDeparture: dep.plannedWhen,
		departureDelay: dep.delay,
		departurePlatform: depPl.platform,
		plannedDeparturePlatform: depPl.plannedPlatform,

		// todo: expose st.boarding, st.rtBoarding, st.alighting, st.rtAlighting
		// todo: expose st.entry
	}

	if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen
	if (arrPl.prognosedPlatform) res.prognosedArrivalPlatform = arrPl.prognosedPlatform
	if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen
	if (depPl.prognosedPlatform) res.prognosedDeparturePlatform = depPl.prognosedPlatform

	// todo: is there a more accurate flag?
	if (st.rtBoarding === false || st.rtAlighting === false) {
		res.cancelled = true
		Object.defineProperty(res, 'canceled', {value: true})
	}

	return res
}

export {
	parseStopover,
}
