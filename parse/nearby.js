'use strict'

// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?
const parseNearby = (profile, n) => {
	const res = profile.parseLocation(profile, n)
	res.distance = n.dist
	return res
}

module.exports = parseNearby
