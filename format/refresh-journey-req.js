'use strict'

const formatRefreshJourneyReq = (ctx, refreshToken) => {
	// eslint-disable-next-line no-unused-vars
	const {profile, opt} = ctx

	return {
		meth: 'Reconstruction',
		req: {
			ctxRecon: refreshToken,
			getIST: true, // todo: make an option
			getPasslist: !!opt.stopovers,
			getPolyline: !!opt.polylines,
			getTariff: !!opt.tickets
		}
	}
}

module.exports = formatRefreshJourneyReq
