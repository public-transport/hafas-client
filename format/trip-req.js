const formatTripReq = ({opt}, id) => {
	return {
		cfg: {polyEnc: 'GPA'},
		meth: 'JourneyDetails',
		req: {
			// todo: getTrainComposition
			jid: id,
			// HAFAS apparently ignores the date in the trip ID and uses the `date` field.
			// Thus, it will find a different trip if you pass the wrong date via `opt.when`.
			// date: profile.formatDate(profile, opt.when),
			getPolyline: !!opt.polyline
		}
	}
}

export {
	formatTripReq,
}
