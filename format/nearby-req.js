const formatNearbyReq = (ctx, location) => {
	const {profile, opt} = ctx

	return {
		cfg: {polyEnc: 'GPA'},
		meth: 'LocGeoPos',
		req: {
			ring: {
				cCrd: {
					x: profile.formatCoord(location.longitude),
					y: profile.formatCoord(location.latitude)
				},
				maxDist: opt.distance || -1,
				minDist: 0
			},
			locFltrL: [
				profile.formatProductsFilter(ctx, opt.products || {}),
			],
			getPOIs: !!opt.poi,
			getStops: !!opt.stops,
			maxLoc: opt.results
		}
	}
}

export {
	formatNearbyReq,
}
