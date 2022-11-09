const formatRefreshJourneyReq = (ctx, refreshToken) => {
	// eslint-disable-next-line no-unused-vars
	const {profile, opt} = ctx

	const req = {
		getIST: true, // todo: make an option
		getPasslist: !!opt.stopovers,
		getPolyline: !!opt.polylines,
		getTariff: !!opt.tickets
	}
	if (profile.refreshJourneyUseOutReconL) {
		req.outReconL = [{ctx: refreshToken}]
	} else {
		req.ctxRecon = refreshToken
	}

	return {
		meth: 'Reconstruction',
		req,
	}
}

export {
	formatRefreshJourneyReq,
}
