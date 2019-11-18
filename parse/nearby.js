'use strict'

// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?

const parseNearby = (ctx, n) => { // n = raw nearby location
	const {parsed, parse} = ctx

	const res = {
		...parsed,
		...parse('location', n)
	}
	res.distance = n.dist
	return res
}

module.exports = parseNearby
