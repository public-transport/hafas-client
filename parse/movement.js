'use strict'

const createParseMovement = (profile, locations, lines, remarks) => {
	const tz = profile.timezone

	// todo: what is m.dirGeo? maybe the speed?
	// todo: what is m.stopL?
	// todo: what is m.proc? wut?
	// todo: what is m.pos?
	// todo: what is m.ani.dirGeo[n]? maybe the speed?
	// todo: what is m.ani.proc[n]? wut?
	// todo: how does m.ani.poly work?
	const parseMovement = (m) => {
		const parseNextStop = (s) => {
			const dep = s.dTimeR || s.dTimeS
				? profile.parseDateTime(tz, m.date, s.dTimeR || s.dTimeS)
				: null
			const arr = s.aTimeR || s.aTimeS
				? profile.parseDateTime(tz, m.date, s.aTimeR || s.aTimeS)
				: null

			return {
				station: locations[s.locX],
				departure: dep ? dep.format() : null,
				arrival: arr ? arr.format() : null
			}
		}

		const res = {
			direction: m.dirTxt,
			line: lines[m.prodX] || null,
			coordinates: m.pos ? {
				latitude: m.pos.y / 1000000,
				longitude: m.pos.x / 1000000
			} : null,
			nextStops: m.stopL.map(parseNextStop),
			frames: []
		}

		if (m.ani && Array.isArray(m.ani.mSec)) {
			for (let i = 0; i < m.ani.mSec.length; i++) {
				res.frames.push({
					origin: locations[m.ani.fLocX[i]] || null,
					destination: locations[m.ani.tLocX[i]] || null,
					t: m.ani.mSec[i]
				})
			}
		}

		return res
	}
	return parseMovement
}

module.exports = createParseMovement
