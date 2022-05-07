// todo: what is m.dirGeo? maybe the speed?
// todo: what is m.stopL?
// todo: what is m.proc? wut?
// todo: what is m.pos?
// todo: what is m.ani.dirGeo[n]? maybe the speed?
// todo: what is m.ani.proc[n]? wut?
const parseMovement = (ctx, m) => { // m = raw movement
	const {profile, opt} = ctx

	const res = {
		direction: m.dirTxt ? profile.parseStationName(ctx, m.dirTxt) : null,
		tripId: m.jid || null,
		line: m.line || null,
		location: m.pos ? {
			type: 'location',
			latitude: m.pos.y / 1000000,
			longitude: m.pos.x / 1000000
		} : null,
		// todo: stopL[0] is the first of the trip! -> filter out
		nextStopovers: (
			m.stopL
			.filter(s => !!s.location)
			.map(s => profile.parseStopover(ctx, s, m.date))
		),
		frames: []
	}

	if (m.ani) {
		// todo: ani.dirGeo, ani.fLocX, ani.proc, ani.procAbs, ani.state, ani.stcOutputX

		if (Array.isArray(m.ani.mSec)) {
			for (let i = 0; i < m.ani.mSec.length; i++) {
				res.frames.push({
					origin: m.ani.fromLocations[i] || null,
					destination: m.ani.toLocations[i] || null,
					t: m.ani.mSec[i]
				})
			}
		}

		if (opt.polylines) {
			if (m.ani.poly) {
				res.polyline = profile.parsePolyline(ctx, m.ani.poly)
			} else if (m.ani.polyline) {
				res.polyline = m.ani.polyline
			}
		}
	}

	return res
}

export {
	parseMovement,
}
