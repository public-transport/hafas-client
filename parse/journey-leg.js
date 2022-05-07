import {findRemarks} from './find-remarks.js'

const clone = obj => Object.assign({}, obj)

const addRemark = (stopoverOrLeg, remark) => {
	if (!Array.isArray(stopoverOrLeg.remarks)) stopoverOrLeg.remarks = []
	stopoverOrLeg.remarks.push(remark)
}

const applyRemarks = (leg, refs) => {
	for (let [remark, ref] of findRemarks(refs)) {
		const {fromLocation, toLocation} = ref

		let wholeLeg = true, fromI = 0, toI = 0
		if (Array.isArray(leg.stopovers)) {
			toI = leg.stopovers.length - 1
			// this fails if `s.stop` is a new object (not reference-equal)
			// todo: do this index- or ID-based
			if (fromLocation) {
				fromI = leg.stopovers.findIndex(s => s.stop === fromLocation)
				if (fromI < 0) continue
			}
			if (toLocation) {
				toI = leg.stopovers.findIndex(s => s.stop === toLocation)
				if (toI < 0) continue
			}
			wholeLeg = fromI === 0 && toI === (leg.stopovers.length - 1)
		}

		if (wholeLeg) addRemark(leg, remark)
		else {
			for (let i = fromI; i <= toI; i++) {
				const stopover = leg.stopovers[i]
				if (stopover) addRemark(stopover, remark)
			}
		}

		// todo: `ref.tagL`
	}
}

// todo: pt.status, pt.isPartCncl
// todo: pt.chRatingRT, pt.chgDurR, pt.minChg
// todo: pt.jny.dirFlg – https://github.com/alexander-albers/tripkit/blob/07047c6ddef24339ebd49a86a78158bca8047421/Sources/TripKit/Provider/AbstractHafasClientInterfaceProvider.swift#L347-L353 & https://github.com/alexander-albers/tripkit/commit/07047c6ddef24339ebd49a86a78158bca8047421#commitcomment-68471656
// todo: what is pt.recState?
// todo: what is `sty: 'UNDEF'`?
// todo: pt.prodL
// todo: pt.parJnyL (list of coupled trains)
// todo: pt.planrtTS
// todo: what is pt.jny.lPassSt?

const parseJourneyLeg = (ctx, pt, date) => { // pt = raw leg
	const {profile, opt} = ctx

	const res = {
		origin: clone(pt.dep.location) || null,
		destination: clone(pt.arr.location)
	}

	// HAFAS seems to have a bug where a journey's first leg has a `dTZOffset` of `0`.
	// https://github.com/public-transport/hafas-client/issues/237
	if (pt.type === 'WALK' && pt.dep.dTZOffset != pt.arr.aTZOffset) {
		if (pt.dep.dTZOffset == 0) pt.dep.dTZOffset = pt.arr.aTZOffset
		if (pt.arr.aTZOffset == 0) pt.arr.aTZOffset = pt.dep.dTZOffset
	}

	const dep = profile.parseWhen(ctx, date, pt.dep.dTimeS, pt.dep.dTimeR, pt.dep.dTZOffset, pt.dep.dCncl)
	res.departure = dep.when
	res.plannedDeparture = dep.plannedWhen
	// todo: pt.dep.dProgType
	res.departureDelay = dep.delay
	if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen

	const arr = profile.parseWhen(ctx, date, pt.arr.aTimeS, pt.arr.aTimeR, pt.arr.aTZOffset, pt.arr.aCncl)
	res.arrival = arr.when
	res.plannedArrival = arr.plannedWhen
	// todo: pt.arr.aProgType
	res.arrivalDelay = arr.delay
	if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen

	if (pt.jny && ('isRchbl' in pt.jny)) {
		res.reachable = !!pt.jny.isRchbl
	}

	if (pt.jny && pt.jny.polyline) {
		res.polyline = pt.jny.polyline || null
	} else if (pt.jny && pt.jny.poly) {
		res.polyline = profile.parsePolyline(ctx, pt.jny.poly)
	}

	if (pt.type === 'WALK' || pt.type === 'TRSF' || pt.type === 'DEVI' || pt.type === 'CHKI') {
		res.public = true
		res.walking = true
		res.distance = pt.gis && pt.gis.dist || null
		if (pt.type === 'TRSF') res.transfer = true
		if (pt.type === 'DEVI') {
			// todo: pt.resState, pt.resRecommendation
			res.transfer = true
		}
		if (pt.type === 'CHKI') res.checkin = true

		// https://gist.github.com/derhuerst/426d4b95aeae701843b1e9c23105b8d4#file-tripsearch-2018-12-05-http-L4207-L4229
		if (opt.remarks && pt.gis && Array.isArray(pt.gis.msgL)) {
			applyRemarks(res, pt.gis.msgL)
		}
	} else if (pt.type === 'JNY') {
		// todo: pull `public` value from `profile.products`
		res.tripId = pt.jny.jid
		res.line = pt.jny.line || null
		// todo [breaking]: don't call parseStationName() here, add parseDirection() hook
		// todo: support pt.jny.dirL[]
		res.direction = pt.jny.dirTxt && profile.parseStationName(ctx, pt.jny.dirTxt) || null

		if (pt.jny.pos) {
			res.currentLocation = {
				type: 'location',
				latitude: pt.jny.pos.y / 1000000,
				longitude: pt.jny.pos.x / 1000000,
			}
		}

		const arrPl = profile.parsePlatform(ctx, pt.arr.aPlatfS || (pt.arr.aPltfS !== undefined ? pt.arr.aPltfS.txt : null), pt.arr.aPlatfR || (pt.arr.aPltfR !== undefined ? pt.arr.aPltfR.txt : null), pt.arr.aCncl)
		res.arrivalPlatform = arrPl.platform
		res.plannedArrivalPlatform = arrPl.plannedPlatform
		if (arrPl.prognosedPlatform) res.prognosedArrivalPlatform = arrPl.prognosedPlatform
		res.arrivalPrognosisType = profile.parsePrognosisType(ctx, pt.arr.aProgType) || null

		const depPl = profile.parsePlatform(ctx, pt.dep.dPlatfS || (pt.dep.dPltfS !== undefined ? pt.dep.dPltfS.txt : null), pt.dep.dPlatfR || (pt.dep.dPltfR !== undefined ? pt.dep.dPltfR.txt : null), pt.dep.dCncl)
		res.departurePlatform = depPl.platform
		res.plannedDeparturePlatform = depPl.plannedPlatform
		if (depPl.prognosedPlatform) res.prognosedDeparturePlatform = depPl.prognosedPlatform
		res.departurePrognosisType = profile.parsePrognosisType(ctx, pt.dep.dProgType) || null

		if (opt.stopovers && pt.jny.stopL) {
			const stopL = pt.jny.stopL
			res.stopovers = stopL.map(s => profile.parseStopover(ctx, s, date))

			if (opt.remarks && Array.isArray(pt.jny.msgL)) {
				// todo: apply leg-wide remarks if `opt.stopovers` is false
				applyRemarks(res, pt.jny.msgL)
				// todo: parse & use `code: EXTERNAL_ID` remarks?
			}

			// filter stations the train passes without stopping, as this doesn't comply with fptf (yet)
			res.stopovers = res.stopovers.filter((x) => !x.passBy)
		}

		const freq = pt.jny.freq || {}
		// todo: expose `res.cycle` even if only one field exists (breaking)
		if (freq.minC && freq.maxC) {
			res.cycle = {
				min: freq.minC * 60,
				max: freq.maxC * 60
			}
			// nr of connections in this frequency, from now on
			if (freq.numC) res.cycle.nr = freq.numC
		}

		if (freq.jnyL) {
			const parseAlternative = (a) => {
				// todo: parse this just like a `leg` (breaking)
				// todo: parse `a.stopL`, `a.ctxRecon`, `a.msgL`
				const st0 = Array.isArray(a.stopL) && a.stopL[0] || {}
				const when = st0
					? profile.parseWhen(ctx, date, st0.dTimeS, st0.dTimeR, st0.dTZOffset, st0.dCncl)
					: null
				return {
					tripId: a.jid,
					line: a.line || null,
					direction: a.dirTxt || null,
					...when,
				}
			}
			res.alternatives = freq.jnyL.map(parseAlternative)
		}
	}

	if (pt.arr.aCncl || pt.dep.dCncl) {
		res.cancelled = true
		Object.defineProperty(res, 'canceled', {value: true})
	}

	return res
}

export {
	parseJourneyLeg,
}
