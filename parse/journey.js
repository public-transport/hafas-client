'use strict'

const parseDateTime = require('./date-time')

// s = stations, ln = lines, r = remarks, c = connection
const createParseStopover = (tz, s, ln, r, c) => {
	const parseStopover = (st) => {
		const res = {
			station: s[parseInt(st.locX)]
		}
		if (st.aTimeR || st.aTimeS) {
			const arr = parseDateTime(tz, c.date, st.aTimeR || st.aTimeS)
			res.arrival = arr.format()
		}
		if (st.dTimeR || st.dTimeS) {
			const dep = parseDateTime(tz, c.date, st.dTimeR || st.dTimeS)
			res.departure = dep.format()
		}
		return res
	}

	return parseStopover
}

// s = stations, ln = lines, r = remarks, c = connection
const createApplyRemark = (s, ln, r, c) => {
	// todo: finish parse/remark.js first
	const applyRemark = (rm) => {}
	return applyRemark
}

// tz = timezone, s = stations, ln = lines, r = remarks, c = connection
const createParsePart = (tz, s, ln, r, c) => {
	// todo: pt.sDays
	// todo: pt.dep.dProgType, pt.arr.dProgType
	// todo: what is pt.jny.dirFlg?
	// todo: how does pt.freq work?
	const parsePart = (pt) => {
		const dep = parseDateTime(tz, c.date, pt.dep.dTimeR || pt.dep.dTimeS)
		const arr = parseDateTime(tz, c.date, pt.arr.aTimeR || pt.arr.aTimeS)
		const res = {
			  origin: Object.assign({}, s[parseInt(pt.dep.locX)]) // todo: what about null?
			, destination: Object.assign({}, s[parseInt(pt.arr.locX)]) // todo: what about null?
			, departure: dep.format()
			, arrival: dep.format()
		}

		if (pt.dep.dTimeR && pt.dep.dTimeS) {
			const realtime = parseDateTime(tz, c.date, pt.dep.dTimeR)
			const planned = parseDateTime(tz, c.date, pt.dep.dTimeS)
			res.delay = Math.round((realtime - planned) / 1000)
		}

		if (pt.type === 'WALK') {
			res.mode = 'walking'
		} else if (pt.type === 'JNY') {
			res.id = pt.jny.jid
			res.line = ln[parseInt(pt.jny.prodX)] // todo: default null
			res.direction = pt.jny.dirTxt // todo: parse this

			if (pt.dep.dPlatfS) res.departurePlatform = pt.dep.dPlatfS
			if (pt.arr.aPlatfS) res.arrivalPlatform = pt.arr.aPlatfS

			if (pt.jny.stopL) {
				res.passed = pt.jny.stopL.map(createParseStopover(tz, s, ln, r, c))
			}
			if (Array.isArray(pt.jny.remL)) {
				pt.jny.remL.forEach(createApplyRemark(s, ln, r, c))
			}

			if (pt.jny.freq && pt.jny.freq.jnyL) {
				const parseAlternative = (a) => ({
					line: ln[parseInt(a.prodX)], // todo: default null
					when: parseDateTime(tz, c.date, a.stopL[0].dTimeS).format() // todo: realtime
				})
				res.alternatives = pt.jny.freq.jnyL
				.filter((a) => a.stopL[0].locX === pt.dep.locX)
				.map(parseAlternative)
			}
		}

		return res
	}
	return parsePart
}

// s = stations, ln = lines, r = remarks, p = createParsePart
const createParseJourney = (tz, s, ln, r, p = createParsePart) => {
	// todo: c.sDays
	// todo: c.dep.dProgType, c.arr.dProgType
	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	// todo: use computed information from part
	const parseJourney = (c) => {
		const parts = c.secL.map(p(tz, s, ln, r, c))
		return {
			  parts
			, origin: parts[0].origin
			, destination: parts[parts.length - 1].destination
			, departure: parts[0].departure
			, arrival: parts[parts.length - 1].arrival
		}
	}

	return parseJourney
}

module.exports = createParseJourney
