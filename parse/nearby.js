'use strict'

const parseLocation = require('./location')

// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?
const parseNearby = (n) => {
	const result = location(n)
	result.distance = n.dist
	return result
}

module.exports = parseNearby
