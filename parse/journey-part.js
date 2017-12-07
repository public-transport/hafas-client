'use strict'

const parseDateTime = require('./date-time')

const clone = obj => Object.assign({}, obj)

const createParseJourneyPart = (profile, stations, lines, remarks) => {
	const tz = profile.timezone

	const parseStopover = (j, st) => {
		const res = {
			station: stations[parseInt(st.locX)]
		}
		if (st.aTimeR || st.aTimeS) {
			const arr = parseDateTime(tz, j.date, st.aTimeR || st.aTimeS)
			res.arrival = arr.format()
		}
		if (st.dTimeR || st.dTimeS) {
			const dep = parseDateTime(tz, j.date, st.dTimeR || st.dTimeS)
			res.departure = dep.format()
		}

		return res
	}

	// todo: finish parse/remark.js first
	const applyRemark = (j, rm) => {}

	// todo: pt.sDays
	// todo: pt.dep.dProgType, pt.arr.dProgType
	// todo: what is pt.jny.dirFlg?
	// todo: how does pt.freq work?
	const parseJourneyPart = (j, pt) => { // j = journey, pt = part
		const dep = profile.parseDateTime(tz, j.date, pt.dep.dTimeR || pt.dep.dTimeS)
		const arr = profile.parseDateTime(tz, j.date, pt.arr.aTimeR || pt.arr.aTimeS)
		const res = {
			origin: clone(stations[parseInt(pt.dep.locX)]) || null,
			destination: clone(stations[parseInt(pt.arr.locX)]),
			departure: dep.format(),
			arrival: arr.format()
		}

		if (pt.dep.dTimeR && pt.dep.dTimeS) {
			const realtime = profile.parseDateTime(tz, j.date, pt.dep.dTimeR)
			const planned = profile.parseDateTime(tz, j.date, pt.dep.dTimeS)
			res.delay = Math.round((realtime - planned) / 1000)
		}

		if (pt.type === 'WALK') {
			res.mode = 'walking'
		} else if (pt.type === 'JNY') {
			res.id = pt.jny.jid
			res.line = lines[parseInt(pt.jny.prodX)] || null
			res.direction = profile.parseStationName(pt.jny.dirTxt)

			if (pt.dep.dPlatfS) res.departurePlatform = pt.dep.dPlatfS
			if (pt.arr.aPlatfS) res.arrivalPlatform = pt.arr.aPlatfS

			if (pt.jny.stopL) {
				res.passed = pt.jny.stopL.map(stopover => parseStopover(j, stopover))
			}
			if (Array.isArray(pt.jny.remL)) {
				for (let remark of pt.jny.remL) applyRemark(j, remark)
			}

			if (pt.jny.freq && pt.jny.freq.jnyL) {
				const parseAlternative = (a) => {
					// todo: realtime
					const when = profile.parseDateTime(tz, j.date, a.stopL[0].dTimeS)
					return {
						line: lines[parseInt(a.prodX)] || null,
						when: when.format()
					}
				}
				res.alternatives = pt.jny.freq.jnyL
				.filter(a => a.stopL[0].locX === pt.dep.locX)
				.map(parseAlternative)
			}
		}

		// todo: follow public-transport/friendly-public-transport-format#27 here
		// see also derhuerst/vbb-rest#19
		if (pt.arr.dCncl && pt.dep.dCncl) {
			result.cancelled = true
			result.departure = result.departurePlatform = null
			result.arrival = result.arrivalPlatform = null
			result.delay = null
		}

		return res
	}

	return parseJourneyPart
}

module.exports = createParseJourneyPart
