'use strict'

const formatTripReq = ({opt}, id, lineName) => {
	return {
		cfg: {polyEnc: 'GPA'},
		meth: 'JourneyDetails',
		req: {
			// todo: getTrainComposition
			jid: id,
			name: lineName,
			// HAFAS apparently ignores the date in the trip ID and uses the `date` field.
			// Thus, it will find a different trip if you pass the wrong date via `opt.when`.
			// date: profile.formatDate(profile, opt.when),
			getPolyline: !!opt.polyline
		}
	}
}

module.exports = formatTripReq
