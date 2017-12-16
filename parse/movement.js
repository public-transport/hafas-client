'use strict'

const createParseMovement = (profile, locations, lines, remarks) => {
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
				? profile.parseDateTime(profile, m.date, s.dTimeR || s.dTimeS)
				: null
			const arr = s.aTimeR || s.aTimeS
				? profile.parseDateTime(profile, m.date, s.aTimeR || s.aTimeS)
				: null

			return {
				station: locations[s.locX],
				departure: dep ? dep.toISO() : null,
				arrival: arr ? arr.toISO() : null
			}
		}

		const res = {
			direction: profile.parseStationName(m.dirTxt),
			trip: m.jid && +m.jid.split('|')[1] || null, // todo: this seems brittle
			line: lines[m.prodX] || null,
			location: m.pos ? {
				type: 'location',
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
