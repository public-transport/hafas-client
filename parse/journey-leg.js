'use strict'

const parseWhen = require('./when')
const parsePlatform = require('./platform')
const findRemarks = require('./find-remarks')

const clone = obj => Object.assign({}, obj)

const addRemark = (stopoverOrLeg, remark) => {
	if (!Array.isArray(stopoverOrLeg.remarks)) stopoverOrLeg.remarks = []
	stopoverOrLeg.remarks.push(remark)
}

const applyRemarks = (leg, refs) => {
	for (let [remark, ref] of findRemarks(refs)) {
		const {fromLocation, toLocation} = ref

		const fromI = fromLocation ? leg.stopovers.findIndex(s => s.stop === fromLocation) : -1
		const toI = toLocation ? leg.stopovers.findIndex(s => s.stop === toLocation) : -1
		if (fromI < 0 || toI < 0) continue

		const wholeLeg = fromI === 0 && toI === (leg.stopovers.length - 1)
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

const createParseJourneyLeg = (profile, opt, data) => {
	// todo: pt.status, pt.isPartCncl
	// todo: pt.isRchbl, pt.chRatingRT, pt.chgDurR, pt.minChg
	// todo: pt.dep.dProgType, pt.arr.dProgType
	// todo: what is pt.jny.dirFlg?
	// todo: what is pt.recState?
	// todo: what is `sty: 'UNDEF'`?
	// todo: pt.prodL
	// todo: pt.parJnyL (list of coupled trains)

	// j = journey, pt = part
	// todo: pt.planrtTS
	const parseJourneyLeg = (j, pt, parseStopovers = true) => {
		const res = {
			origin: clone(pt.dep.location) || null,
			destination: clone(pt.arr.location)
		}

		const arr = parseWhen(profile, j.date, pt.arr.aTimeS, pt.arr.aTimeR, pt.arr.aTZOffset, pt.arr.aCncl)
		res.arrival = arr.when
		res.plannedArrival = arr.plannedWhen
		res.arrivalDelay = arr.delay
		if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen

		const dep = parseWhen(profile, j.date, pt.dep.dTimeS, pt.dep.dTimeR, pt.dep.dTZOffset, pt.dep.dCncl)
		res.departure = dep.when
		res.plannedDeparture = dep.plannedWhen
		res.departureDelay = dep.delay
		if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen

		if (pt.jny) {
			res.reachable = !!pt.jny.isRchbl
		}

		if (pt.jny && pt.jny.polyline) {
			res.polyline = pt.jny.polyline || null
		}

		if (pt.type === 'WALK' || pt.type === 'TRSF') {
			res.public = true
			res.walking = true
			res.distance = pt.gis && pt.gis.dist || null
			if (pt.type === 'TRSF') res.transfer = true

			// https://gist.github.com/derhuerst/426d4b95aeae701843b1e9c23105b8d4#file-tripsearch-2018-12-05-http-L4207-L4229
			if (opt.remarks && Array.isArray(pt.gis.msgL)) {
				applyRemarks(res, pt.gis.msgL)
			}
		} else if (pt.type === 'JNY') {
			// todo: pull `public` value from `profile.products`
			res.tripId = pt.jny.jid
			res.line = pt.jny.line || null
			res.direction = pt.jny.dirTxt && profile.parseStationName(pt.jny.dirTxt) || null

			const arrPl = parsePlatform(profile, pt.arr.aPlatfS, pt.arr.aPlatfR, pt.arr.aCncl)
			res.arrivalPlatform = arrPl.platform
			res.plannedArrivalPlatform = arrPl.plannedPlatform
			if (arrPl.prognosedPlatform) res.prognosedArrivalPlatform = arrPl.prognosedPlatform

			const depPl = parsePlatform(profile, pt.dep.dPlatfS, pt.dep.dPlatfR, pt.dep.dCncl)
			res.departurePlatform = depPl.platform
			res.plannedDeparturePlatform = depPl.plannedPlatform
			if (depPl.prognosedPlatform) res.prognosedDeparturePlatform = depPl.prognosedPlatform

			if (parseStopovers && pt.jny.stopL) {
				const parse = profile.parseStopover(profile, opt, data, j.date)
				const stopL = pt.jny.stopL
				res.stopovers = stopL.map(parse)

				if (opt.remarks && Array.isArray(pt.jny.msgL)) {
					// todo: apply leg-wide remarks if `parseStopovers` is false
					applyRemarks(res, pt.jny.msgL)
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
					const st0 = a.stopL[0] || {}
					return {
						tripId: a.jid,
						line: a.line || null,
						direction: a.dirTxt || null,
						...parseWhen(profile, j.date, st0.dTimeS, st0.dTimeR, st0.dTZOffset, st0.dCncl)
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

	return parseJourneyLeg
}

module.exports = createParseJourneyLeg
