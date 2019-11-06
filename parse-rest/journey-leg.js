'use strict'

const parseIsoDuration = require('parse-iso-duration')

const clone = obj => Object.assign({}, obj)

const createParseJourneyLeg = (profile, opt, data) => {
	// j = journey, l = leg
	const parseJourneyLeg = (j, l) => {
		const orig = l.Origin
		const dest = l.Destination

		const res = {
			origin: profile.parseLocation(profile, opt, data, orig),
			destination: profile.parseLocation(profile, opt, data, dest)
		}

		// todo: does `dest.rtAlighting` actually if the arrival is cancelled?
		const arr = profile.parseWhen(profile, dest.date, dest.rtDate, dest.time, dest.rtTime, dest.rtTz, !dest.rtAlighting)
		res.arrival = arr.when
		res.plannedArrival = arr.plannedWhen
		res.arrivalDelay = arr.delay
		if (arr.prognosedWhen) res.prognosedArrival = arr.prognosedWhen

		// todo: does `orig.rtBoarding` actually if the departure is cancelled?
		const dep = profile.parseWhen(profile, orig.date, orig.rtDate, orig.time, orig.rtTime, orig.tz, !orig.rtBoarding)
		res.departure = dep.when
		res.plannedDeparture = dep.plannedWhen
		res.departureDelay = dep.delay
		if (dep.prognosedWhen) res.prognosedDeparture = dep.prognosedWhen

		if (orig.rtBoarding === false || dest.rtAlighting === false) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
		}

		if (l.type === 'WALK' || l.type === 'TRSF') {
			res.public = true
			res.walking = true
			res.distance = l.dist || null
			// if (l.type === 'TRSF') res.transfer = true
			// todo: l.GisRef
			res.duration = l.duration ? parseIsoDuration(l.duration) / 1000 | 0 : null
		} else if (l.type === 'JNY') {
			// todo: does `dest.rtAlighting` actually say if the arrival is cancelled?
			const arrPl = profile.parsePlatform(profile, dest.track, dest.rtTrack, !dest.rtAlighting)
			res.arrivalPlatform = arrPl.platform
			res.plannedArrivalPlatform = arrPl.plannedPlatform
			if (arrPl.prognosedPlatform) res.prognosedArrivalPlatform = arrPl.prognosedPlatform

			// todo: does `orig.rtBoarding` actually if say the departure is cancelled?
			const depPl = profile.parsePlatform(profile, orig.track, orig.rtTrack, !orig.rtBoarding)
			res.departurePlatform = depPl.platform
			res.plannedDeparturePlatform = depPl.plannedPlatform
			if (depPl.prognosedPlatform) res.prognosedDeparturePlatform = depPl.prognosedPlatform

			// todo: pull `public` value from `profile.products`
			res.tripId = l.JourneyDetailRef && l.JourneyDetailRef.ref || null

			const product = {name: l.name, number: l.number, ...l.Product}
			res.line = profile.parseLine(profile, opt, data)(product) || null

			res.direction = l.direction && profile.parseStationName(l.direction) || null

			if (opt.stopovers && l.stops) {
				const parse = profile.parseStopover(profile, opt, data)
				res.stopovers = l.stops.map(st => parse(null, st))
			}
		}

		if (opt.polylines && l.Polyline) {
			const parse = profile.parsePolyline(profile, opt, data)
			res.polyline = parse(l.Polyline) || null
		}

		if (opt.remarks && Array.isArray(l.notes)) {
			res.hints = l.notes.map(h => profile.parseHint(profile, h, data))
		}

		return res
	}

	return parseJourneyLeg
}

module.exports = createParseJourneyLeg
