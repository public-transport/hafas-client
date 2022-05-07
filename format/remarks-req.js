const formatRemarksReq = (ctx) => {
	const {profile, opt} = ctx

	const himFltrL = []
	// todo: https://github.com/marudor/BahnhofsAbfahrten/blob/95fef0217d01344642dd423457473fe9b8b6056e/src/types/HAFAS/index.ts#L76-L91
	if (opt.products) {
		himFltrL.push(profile.formatProductsFilter(ctx, opt.products))
	}

	const req = {
		himFltrL,
	}
	if (profile.remarksGetPolyline) req.getPolyline = !!opt.polylines
	// todo: stLoc, dirLoc
	// todo: comp, dept, onlyHimId, onlyToday
	// todo: dailyB, dailyE
	// see https://github.com/marudor/BahnhofsAbfahrten/blob/46a74957d68edc15713112df44e1a25150f5a178/src/types/HAFAS/HimSearch.ts#L3-L18

	if (opt.results !== null) req.maxNum = opt.results
	if (opt.from !== null) {
		req.dateB = profile.formatDate(profile, opt.from)
		req.timeB = profile.formatTime(profile, opt.from)
	}
	if (opt.to !== null) {
		req.dateE = profile.formatDate(profile, opt.to)
		req.timeE = profile.formatTime(profile, opt.to)
	}

	return {meth: 'HimSearch', req}
}

export {
	formatRemarksReq,
}
