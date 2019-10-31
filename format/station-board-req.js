'use strict'

const formatStationBoardReq = (ctx, station, type) => {
	const {profile, opt} = ctx

	const req = {
		type,
		date: profile.formatDate(profile, opt.when),
		time: profile.formatTime(profile, opt.when),
		stbLoc: station,
		dirLoc: opt.direction ? profile.formatStation(opt.direction) : null,
		jnyFltrL: [
			profile.formatProductsFilter(ctx, opt.products || {})
		],
		dur: opt.duration
	}
	if (profile.departuresGetPasslist) req.getPasslist = !!opt.stopovers
	if (profile.departuresStbFltrEquiv) req.stbFltrEquiv = !opt.includeRelatedStations

	return {
		meth: 'StationBoard',
		req
	}
}

module.exports = formatStationBoardReq
