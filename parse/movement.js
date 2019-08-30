'use strict'

const createParseMovement = (profile, opt, data) => {
	const {locations, lines, polylines} = data

	// todo: what is m.dirGeo? maybe the speed?
	// todo: what is m.stopL?
	// todo: what is m.proc? wut?
	// todo: what is m.pos?
	// todo: what is m.ani.dirGeo[n]? maybe the speed?
	// todo: what is m.ani.proc[n]? wut?
	const parseMovement = (m) => {
		const pStopover = profile.parseStopover(profile, opt, data, m.date)

		const res = {
			direction: m.dirTxt ? profile.parseStationName(m.dirTxt) : null,
			tripId: m.jid || null,
			line: lines[m.prodX] || null,
			location: m.pos ? {
				type: 'location',
				latitude: m.pos.y / 1000000,
				longitude: m.pos.x / 1000000
			} : null,
			// todo: stopL[0] is the first of the trip! -> filter out
			nextStopovers: m.stopL.map(pStopover),
			frames: []
		}

		if (m.ani) {
			if (Array.isArray(m.ani.mSec)) {
				for (let i = 0; i < m.ani.mSec.length; i++) {
					res.frames.push({
						origin: locations[m.ani.fLocX[i]] || null,
						destination: locations[m.ani.tLocX[i]] || null,
						t: m.ani.mSec[i]
					})
				}
			}

			if (opt.polylines) {
				if (m.ani.poly) {
					const parse = profile.parsePolyline(profile, opt, data)
					res.polyline = parse(m.ani.poly)
				} else if (m.ani.polyG) {
					let p = m.ani.polyG.polyXL
					p = Array.isArray(p) && polylines[p[0]]
					// todo: there can be >1 polyline
					const parse = profile.parsePolyline(profile, opt, data)
					res.polyline = p && parse(p) || null
				}
			}
		}

		return res
	}
	return parseMovement
}

module.exports = createParseMovement
