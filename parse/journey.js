'use strict'

const parseDateTime = require('./date-time')

const clone = obj => Object.assign({}, obj)

const createParseStopover = (tz, stations, lines, remarks, j) => { // j = journey
	const parseStopover = (st) => {
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

	return parseStopover
}

const createApplyRemark = (stations, lines, remarks, j) => { // j = journey
	// todo: finish parse/remark.js first
	const applyRemark = (rm) => {}
	return applyRemark
}

const createParsePart = (tz, stations, lines, remarks, j) => { // j = journey
	// todo: pt.sDays
	// todo: pt.dep.dProgType, pt.arr.dProgType
	// todo: what is pt.jny.dirFlg?
	// todo: how does pt.freq work?
	const parsePart = (pt) => {
		const dep = parseDateTime(tz, j.date, pt.dep.dTimeR || pt.dep.dTimeS)
		const arr = parseDateTime(tz, j.date, pt.arr.aTimeR || pt.arr.aTimeS)
		const res = {
			// todo: what about null?
			origin: clone(stations[parseInt(pt.dep.locX)]),
			destination: clone(stations[parseInt(pt.arr.locX)]),
			departure: dep.format(),
			arrival: arr.format()
		}

		if (pt.dep.dTimeR && pt.dep.dTimeS) {
			const realtime = parseDateTime(tz, j.date, pt.dep.dTimeR)
			const planned = parseDateTime(tz, j.date, pt.dep.dTimeS)
			res.delay = Math.round((realtime - planned) / 1000)
		}

		if (pt.type === 'WALK') {
			res.mode = 'walking'
		} else if (pt.type === 'JNY') {
			res.id = pt.jny.jid
			res.line = lines[parseInt(pt.jny.prodX)] // todo: default null
			res.direction = pt.jny.dirTxt // todo: parse this

			if (pt.dep.dPlatfS) res.departurePlatform = pt.dep.dPlatfS
			if (pt.arr.aPlatfS) res.arrivalPlatform = pt.arr.aPlatfS

			if (pt.jny.stopL) {
				const parseStopover = createParseStopover(tz, stations, lines, remarks, j)
				res.passed = pt.jny.stopL.map(parseStopover)
			}
			if (Array.isArray(pt.jny.remL)) {
				pt.jny.remL.forEach(createApplyRemark(stations, lines, remarks, j))
			}

			if (pt.jny.freq && pt.jny.freq.jnyL) {
				const parseAlternative = (a) => ({
					line: lines[parseInt(a.prodX)], // todo: default null
					when: parseDateTime(tz, j.date, a.stopL[0].dTimeS).format() // todo: realtime
				})
				res.alternatives = pt.jny.freq.jnyL
				.filter(a => a.stopL[0].locX === pt.dep.locX)
				.map(parseAlternative)
			}
		}

		return res
	}
	return parsePart
}

const createParseJourney = (tz, stations, lines, remarks, p = createParsePart) => {
	// todo: c.sDays
	// todo: c.dep.dProgType, c.arr.dProgType
	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	// todo: use computed information from part
	const parseJourney = (journey) => {
		const parts = journey.secL.map(p(tz, stations, lines, remarks, journey))
		return {
			parts,
			origin: parts[0].origin,
			destination: parts[parts.length - 1].destination,
			departure: parts[0].departure,
			arrival: parts[parts.length - 1].arrival
		}
	}

	return parseJourney
}

module.exports = createParseJourney
