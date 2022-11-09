const formatLocationsReq = (ctx, query) => {
	const {profile, opt} = ctx

	return {
		cfg: {polyEnc: 'GPA'},
		meth: 'LocMatch',
		req: {input: {
			loc: {
				type: profile.formatLocationFilter(opt.stops, opt.addresses, opt.poi),
				name: opt.fuzzy ? query + '?' : query
			},
			maxLoc: opt.results,
			field: 'S' // todo: what is this?
		}}
	}
}

export {
	formatLocationsReq,
}
