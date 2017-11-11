'use strict'

const parseDateTime = require('./date-time')

// tz = timezone, l = locations, ln = lines, r = remarks
const createParseMovement = (tz, l, ln, r) => {
	// todo: what is m.dirGeo? maybe the speed?
	// todo: what is m.stopL?
	// todo: what is m.proc? wut?
	// todo: what is m.pos?
	// todo: what is m.ani.dirGeo[n]? maybe the speed?
	// todo: what is m.ani.proc[n]? wut?
	// todo: how does m.ani.poly work?
	const parseMovement = (m) => {
		const res = {
			  direction: m.dirTxt
			, line: ln[m.prodX]
			, coordinates: m.pos ? {
				latitude: m.pos.y / 1000000,
				longitude: m.pos.x / 1000000
			} : null
			, nextStops: m.stopL.map((s) => ({
				  station:   l[s.locX]
				, departure: s.dTimeR || s.dTimeS
					? parseDateTime(tz, m.date, s.dTimeR || s.dTimeS).format()
					: null
				, arrival: s.aTimeR || s.aTimeS
					? parseDateTime(tz, m.date, s.aTimeR || s.aTimeS).format()
					: null
			}))
			, frames: []
		}

		if (m.ani && Array.isArray(m.ani.mSec)) {
			for (let i = 0; i < m.ani.mSec.length; i++) {
				res.frames.push({
					origin: l[m.ani.fLocX[i]],
					destination: l[m.ani.tLocX[i]],
					t: m.ani.mSec[i]
				})
			}
		}

		return res
	}
	return parseMovement
}

module.exports = createParseMovement
