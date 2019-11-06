'use strict'

// todo: d.JourneyStatus
// todo: d.prognosisType

const createParseArrOrDep = (profile, opt, data, type) => {
	const parseArrOrDep = (d) => {
		const product = {
			name: d.name,
			number: d.trainNumber,
			category: d.trainCategory,
			...d.Product
		}

		const res = {
			tripId: d.JourneyDetailRef && d.JourneyDetailRef.ref || null,
			stop: profile.parseLocation(profile, opt, data, {
				type: d.type,
				name: d.stop,
				id: d.stopid,
				extId: d.stopExtId
			}),
			line: profile.parseLine(profile, opt, data)(product) || null,
			direction: type === 'departure' && d.direction || null, // todo: arrivals
			// todo: is there `d.rtDate` & `d.tz` & `d.rtTz`?
			...profile.parseWhen(profile, d.date, null, d.time, d.rtTime, null, !!d.cancelled),
			platform: d.track || null
		}

		if (opt.remarks && Array.isArray(d.notes)) {
			res.hints = d.notes.map(h => profile.parseHint(profile, h, data))
		}

		return res
	}

	return parseArrOrDep
}

module.exports = createParseArrOrDep
