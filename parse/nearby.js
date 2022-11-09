// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?

const parseNearby = (ctx, n) => { // n = raw nearby location
	const res = ctx.profile.parseLocation(ctx, n)
	res.distance = n.dist
	return res
}

export {
	parseNearby,
}
