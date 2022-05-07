const formatReachableFromReq = (ctx, address) => {
	const {profile, opt} = ctx

	return {
		meth: 'LocGeoReach',
		req: {
			loc: profile.formatLocation(profile, address, 'address'),
			maxDur: opt.maxDuration === null ? -1 : opt.maxDuration,
			maxChg: opt.maxTransfers,
			date: profile.formatDate(profile, opt.when),
			time: profile.formatTime(profile, opt.when),
			period: 120, // todo: what is this?
			jnyFltrL: [
				profile.formatProductsFilter(ctx, opt.products || {})
			]
		}
	}
}

export {
	formatReachableFromReq,
}
