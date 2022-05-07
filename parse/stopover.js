import {findRemarks} from './find-remarks.js'

const parseStopover = (ctx, st, date) => { // st = raw stopover
	const {profile, opt} = ctx

	const arr = profile.parseWhen(ctx, date, st.aTimeS, st.aTimeR, st.aTZOffset, st.aCncl)
	const arrPl = profile.parsePlatform(ctx, st.aPlatfS || (st.aPltfS && st.aPltfS.txt) || null, st.aPlatfR || (st.aPltfR && st.aPltfR.txt) || null, st.aCncl)
	const dep = profile.parseWhen(ctx, date, st.dTimeS, st.dTimeR, st.dTZOffset, st.dCncl)
	const depPl = profile.parsePlatform(ctx, st.dPlatfS || (st.dPltfS && st.dPltfS.txt) || null, st.dPlatfR || (st.dPltfR && st.dPltfR.txt) || null, st.dCncl)

	const res = {
		stop: st.location || null,
		arrival: arr.when,
		plannedArrival: arr.plannedWhen,
		arrivalDelay: arr.delay,
		arrivalPlatform: arrPl.platform,
		arrivalPrognosisType: profile.parsePrognosisType(ctx, st.aProgType),
		plannedArrivalPlatform: arrPl.plannedPlatform,
		departure: dep.when,
		plannedDeparture: dep.plannedWhen,
		departureDelay: dep.delay,
		departurePlatform: depPl.platform,
		departurePrognosisType: profile.parsePrognosisType(ctx, st.dProgType),
		plannedDeparturePlatform: depPl.plannedPlatform
	}

	if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen
	if (arrPl.prognosedPlatform) res.prognosedArrivalPlatform = arrPl.prognosedPlatform
	if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen
	if (depPl.prognosedPlatform) res.prognosedDeparturePlatform = depPl.prognosedPlatform

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

export {
	parseStopover,
}
