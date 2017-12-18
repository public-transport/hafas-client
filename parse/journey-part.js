'use strict'

const parseDateTime = require('./date-time')

const clone = obj => Object.assign({}, obj)

const createParseJourneyPart = (profile, stations, lines, remarks) => {
	// todo: finish parse/remark.js first
	const applyRemark = (j, rm) => {}

	// todo: pt.sDays
	// todo: pt.dep.dProgType, pt.arr.dProgType
	// todo: what is pt.jny.dirFlg?
	// todo: how does pt.freq work?
	// todo: what is pt.himL?
	const parseJourneyPart = (j, pt, passed = true) => { // j = journey, pt = part
		const dep = profile.parseDateTime(profile, j.date, pt.dep.dTimeR || pt.dep.dTimeS)
		const arr = profile.parseDateTime(profile, j.date, pt.arr.aTimeR || pt.arr.aTimeS)
		const res = {
			origin: clone(stations[parseInt(pt.dep.locX)]) || null,
			destination: clone(stations[parseInt(pt.arr.locX)]),
			departure: dep.toISO(),
			arrival: arr.toISO()
		}

		if (pt.dep.dTimeR && pt.dep.dTimeS) {
			const realtime = profile.parseDateTime(profile, j.date, pt.dep.dTimeR)
			const planned = profile.parseDateTime(profile, j.date, pt.dep.dTimeS)
			res.delay = Math.round((realtime - planned) / 1000)
		}

		if (pt.type === 'WALK') {
			res.mode = 'walking'
			res.public = true
		} else if (pt.type === 'JNY') {
			// todo: pull `public` value from `profile.products`
			res.id = pt.jny.jid
			res.line = lines[parseInt(pt.jny.prodX)] || null
			res.direction = profile.parseStationName(pt.jny.dirTxt)

			if (pt.dep.dPlatfS) res.departurePlatform = pt.dep.dPlatfS
			if (pt.arr.aPlatfS) res.arrivalPlatform = pt.arr.aPlatfS

			if (passed && pt.jny.stopL) {
				const parse = profile.parseStopover(profile, stations, lines, remarks, j)
				res.passed = pt.jny.stopL.map(parse)
			}
			if (Array.isArray(pt.jny.remL)) {
				for (let remark of pt.jny.remL) applyRemark(j, remark)
			}

			if (pt.jny.freq && pt.jny.freq.jnyL) {
				const parseAlternative = (a) => {
					const t = a.stopL[0].dTimeS || a.stopL[0].dTimeR
					const when = profile.parseDateTime(profile, j.date, t)
					return {
						line: lines[parseInt(a.prodX)] || null,
						when: when.toISO()
					}
				}
				res.alternatives = pt.jny.freq.jnyL
				.filter(a => a.stopL[0].locX === pt.dep.locX)
				.map(parseAlternative)
			}
		}

		// todo: follow public-transport/friendly-public-transport-format#27 here
		// see also derhuerst/vbb-rest#19
		if (pt.arr.aCncl) {
			res.cancelled = true
			res.arrival = res.arrivalPlatform = null
		}
		if (pt.dep.dCncl) {
			res.cancelled = true
			res.departure = res.departurePlatform = null
			res.delay = null
		}

		return res
	}

	return parseJourneyPart
}

module.exports = createParseJourneyPart
