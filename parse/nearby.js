'use strict'

const parseLocation = require('./location')

// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?
const parseNearby = (n) => {
	const res = parseLocation(n)
	res.distance = n.dist
	return res
}

module.exports = parseNearby
