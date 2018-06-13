'use strict'

// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?

// todo: [breaking] change to createParseNearby(profile, data) => (n) => nearby
const parseNearby = (profile, opt, data, n) => {
	const res = profile.parseLocation(profile, opt, data, n)
	res.distance = n.dist
	return res
}

module.exports = parseNearby
