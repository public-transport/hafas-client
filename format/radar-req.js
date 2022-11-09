const formatRadarReq = (ctx, north, west, south, east) => {
	const {profile, opt} = ctx

	return {
		meth: 'JourneyGeoPos',
		req: {
			maxJny: opt.results,
			onlyRT: false, // todo: does this mean "only realtime"?
			date: profile.formatDate(profile, opt.when),
			time: profile.formatTime(profile, opt.when),
			// todo: would a ring work here as well?
			rect: profile.formatRectangle(profile, north, west, south, east),
			perSize: opt.duration * 1000,
			perStep: Math.round(opt.duration / Math.max(opt.frames, 1) * 1000),
			ageOfReport: true, // todo: what is this?
			jnyFltrL: [
				profile.formatProductsFilter(ctx, opt.products || {})
			],
			// todo: what is this? what about realtime?
			// - CALC
			// - CALC_REPORT (as seen in the INSA Young app)
			trainPosMode: 'CALC',
		}
	}
}

export {
	formatRadarReq,
}
