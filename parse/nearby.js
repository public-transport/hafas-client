'use strict'

// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?

// todo: [breaking] change to createParseNearby(profile, lines) => (n) => nearby
const parseNearby = (profile, n, lines) => {
	const res = profile.parseLocation(profile, n, lines)
	res.distance = n.dist
	return res
}

module.exports = parseNearby
