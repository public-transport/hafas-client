'use strict'

const parseDateTime = require('./date-time')

const clone = obj => Object.assign({}, obj)

const createParseJourneyLeg = (profile, stations, lines, remarks, polylines) => {
	// todo: finish parse/remark.js first
	const applyRemark = (j, rm) => {}

	// todo: pt.sDays
	// todo: pt.dep.dProgType, pt.arr.dProgType
	// todo: what is pt.jny.dirFlg?
	// todo: how does pt.freq work?
	// todo: what is pt.himL?
	const parseJourneyLeg = (j, pt, passed = true) => { // j = journey, pt = part
		const dep = profile.parseDateTime(profile, j.date, pt.dep.dTimeR || pt.dep.dTimeS)
		const arr = profile.parseDateTime(profile, j.date, pt.arr.aTimeR || pt.arr.aTimeS)
		const res = {
			origin: clone(stations[parseInt(pt.dep.locX)]) || null,
			destination: clone(stations[parseInt(pt.arr.locX)]),
			departure: dep.toISO(),
			arrival: arr.toISO()
		}

		// todo: DRY with parseDeparture
		// todo: DRY with parseStopover
		if (pt.dep.dTimeR && pt.dep.dTimeS) {
			const realtime = profile.parseDateTime(profile, j.date, pt.dep.dTimeR)
			const planned = profile.parseDateTime(profile, j.date, pt.dep.dTimeS)
			res.departureDelay = Math.round((realtime - planned) / 1000)
		}
		if (pt.arr.aTimeR && pt.arr.aTimeS) {
			const realtime = profile.parseDateTime(profile, j.date, pt.arr.aTimeR)
			const planned = profile.parseDateTime(profile, j.date, pt.arr.aTimeS)
			res.arrivalDelay = Math.round((realtime - planned) / 1000)
		}

		if (pt.jny && pt.jny.polyG) {
			let p = pt.jny.polyG.polyXL
			p = Array.isArray(p) && polylines[p[0]]
			// todo: there can be >1 polyline
			const parse = profile.parsePolyline(stations)
			res.polyline = p && parse(p) || null
		}

		if (pt.type === 'WALK') {
			res.mode = 'walking'
			res.public = true
		} else if (pt.type === 'JNY') {
			// todo: pull `public` value from `profile.products`
			res.id = pt.jny.jid
			res.line = lines[parseInt(pt.jny.prodX)] || null
			res.direction = profile.parseStationName(pt.jny.dirTxt) || null

			if (pt.dep.dPlatfS) res.departurePlatform = pt.dep.dPlatfS
			if (pt.arr.aPlatfS) res.arrivalPlatform = pt.arr.aPlatfS

			if (passed && pt.jny.stopL) {
				const parse = profile.parseStopover(profile, stations, lines, remarks, j.date)
				const passedStations = pt.jny.stopL.map(parse)
				// filter stations the train passes without stopping, as this doesn't comply with fptf (yet)
				res.passed = passedStations.filter((x) => !x.passBy)
			}
			if (Array.isArray(pt.jny.remL)) {
				for (let remark of pt.jny.remL) applyRemark(j, remark)
			}

			const freq = pt.jny.freq || {}
			if (freq.minC && freq.maxC) {
				// todo: what is freq.numC?
				res.cycle = {
					min: freq.minC * 60,
					max: freq.maxC * 60
				}
			}
			if (freq.jnyL) {
				const parseAlternative = (a) => {
					const t = a.stopL[0].dTimeR || a.stopL[0].dTimeS
					const when = profile.parseDateTime(profile, j.date, t)
					// todo: expose a.stopL[0]
					return {
						line: lines[parseInt(a.prodX)] || null,
						when: when.toISO()
					}
				}
				res.alternatives = freq.jnyL.map(parseAlternative)
			}
		}

		// todo: DRY with parseDeparture
		// todo: DRY with parseStopover
		if (pt.arr.aCncl || pt.dep.dCncl) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
			if (pt.arr.aCncl) {
				res.arrival = res.arrivalPlatform = res.arrivalDelay = null
				const arr = profile.parseDateTime(profile, j.date, pt.arr.aTimeS)
				res.formerScheduledArrival = arr.toISO()
			}
			if (pt.dep.dCncl) {
				res.departure = res.departurePlatform = res.departureDelay = null
				const dep = profile.parseDateTime(profile, j.date, pt.dep.dTimeS)
				res.formerScheduledDeparture = dep.toISO()
			}
		}

		return res
	}

	return parseJourneyLeg
}

module.exports = createParseJourneyLeg
