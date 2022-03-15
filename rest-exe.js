import {defaultRestProfile} from './lib/default-rest-profile.js'
import {validateProfile} from './lib/validate-profile.js'

const isNonEmptyString = str => 'string' === typeof str && str.length > 0

const createRestClient = (profile, token, userAgent) => {
	profile = {
		...defaultRestProfile,
		...profile
	}
	validateProfile(profile)
	if (!isNonEmptyString(profile.endpoint)) throw new Error('missing profile.endpoint')
	if (!isNonEmptyString(token)) throw new Error('missing token')
	if (!isNonEmptyString(userAgent)) throw new Error('missing userAgent')

	// todo: res.planRtTs -> realtimeDataUpdatedAt

	const locations = async (query, opt = {}) => {
		if (!isNonEmptyString(query)) {
			throw new TypeError('query must be a non-empty string.')
		}
		opt = {
			fuzzy: true, // find only exact matches?
			results: 5, // how many search results?
			stops: true, // return stops/stations?
			addresses: true,
			poi: true, // points of interest
			linesOfStops: false, // parse & expose lines at each stop/station?
			...opt
		}

		const {res} = await profile.request({profile, opt, token}, userAgent, 'location.name', {
			input: opt.fuzzy ? query + '?' : query,
			maxNo: opt.results,
			type: profile.formatLocationFilter(opt.stops, opt.addresses, opt.poi)
			// todo: `products` with bitmask
			// todo: coordLong, coordLat, radius
			// todo: refineId
		})
		const ctx = {profile, opt, res}

		return ctx.res.stopLocationOrCoordLocation
		.map(l => profile.parseLocationsResult(ctx, l))
		.filter(loc => !!loc)
	}

	const nearby = async (location, opt = {}) => {
		const {res} = await profile.request({profile, opt, token}, userAgent, 'location.nearbystops', {
			originCoordLat: location.latitude,
			originCoordLong: location.longitude,
			// r: 2000, // radius
			// maxNo: 5, // todo: opt.results
			type: 'SP', // todo: S/P/SP
			// todo: `products` with bitmask
		})
		const ctx = {profile, opt, res}

		return ctx.res.stopLocationOrCoordLocation
		.map((l) => {
			const loc = profile.parseLocationsResult(ctx, l)
			if (loc) loc.distance = l.dist
			return loc
		})
		.filter(loc => !!loc)
	}

	const _stationBoard = async (method, stop, opt) => {
		const stopId = 'string' === typeof stop ? stop : stop.id
		if ('string' !== typeof stopId) {
			throw new TypeError('stop must be a stop object or a string.')
		}

		opt = {
			// todo: for arrivals(), this is actually a station it *has already* stopped by
			direction: null, // only show arrivals/departures stopping by this station
			duration: 10, // show arrivals/departures for the next n minutes
			results: null, // number of arrivals/departures – `null` means "whatever HAFAS returns"
			products: {}, // enabled/disable certain products to search for
			remarks: true, // parse & expose hints & warnings?
			// arrivals/departures at related stations
			// e.g. those that belong together on the metro map.
			includeRelatedStations: true,
			...opt
		}

		const query = {
			extId: stopId,
			duration: opt.duration,
			products: profile.formatProductsBitmask({profile, opt}, opt.products || {}),
			filterEquiv: opt.includeRelatedStations ? 0 : 1, // filterEquiv is reversed!
			rtMode: 'FULL' // todo: make customisable?, see https://pastebin.com/qZ9WS3Cx
			// todo: operators, lines, attributes
		}

		if (opt.direction) {
			const id = 'string' === typeof opt.direction ? opt.direction : opt.direction.id
			if ('string' !== typeof id) {
				throw new TypeError('opt.direction must be a stop object or a string.')
			}
			query.direction = id
		}
		if (opt.results !== null) query.maxJourneys = opt.results

		const when = new Date('when' in opt ? opt.when : Date.now())
		if (Number.isNaN(+when)) throw new Error('opt.when is invalid')
		query.date = profile.formatDate(profile, when)
		query.time = profile.formatTime(profile, when)

		return await profile.request({profile, opt, token}, userAgent, method, query)
	}

	const departures = async (stop, opt = {}) => {
		const {res} = await _stationBoard('departureBoard', stop, opt)
		const ctx = {profile, opt, res}

		const results = ctx.res.Departure || []
		return results.map(dep => profile.parseArrival(ctx, dep))
	}

	const arrivals = async (stop, opt = {}) => {
		const {res} = await _stationBoard('arrivalBoard', stop, opt)
		const ctx = {profile, opt, res}

		const results = ctx.res.Arrival || []
		return results.map(arr => profile.parseDeparture(ctx, arr))
	}

	const journeys = async (origin, destination, opt = {}) => {
		opt = {
			results: null, // number of journeys – `null` means "whatever HAFAS returns"
			// via: null, // let journeys pass this station?
			stopovers: false, // return stations on the way?
			transfers: -1, // maximum of 5 transfers
			transferTime: null, // minimum time for a single transfer in minutes
			// // todo: does this work with every endpoint?
			// accessibility: 'none', // 'none', 'partial' or 'complete'
			// bike: false, // only bike-friendly journeys
			// tickets: false, // return tickets?
			polylines: false, // return leg shapes?
			// remarks: true, // parse & expose hints & warnings?
			// walkingSpeed: 'normal', // 'slow', 'normal', 'fast'
			// // Consider walking to nearby stations at the beginning of a journey?
			startWithWalking: true,
			// scheduledDays: false
			...opt
		}

		// todo:
		// - context via opt.earlierThan/opt.laterThan
		// - originCoordLat/originCoordLong, destCoordLat/destCoordLong
		// - via or viaId & viaWaitTime, avoid or avoidId
		// - changeTimePercent, maxChangeTime?, addChangeTime?
		// - numB
		// - products, operators, attributes, sattributes, lines, ivOnly, mobilityProfile?
		// - trainFilter, groupFilter, blockingList
		// - bikeCarriage, bikeCarriageType, sleepingCar, couchetteCoach
		// - avoidPaths, originBike, originCar, originTaxi, originPark, originMeta
		// - destBike, destCar, destTaxi, destPark, destMeta
		// - totalBike, totalCar, totalTaxi, totalPark, totalMeta
		// - baim (https://www.eltis.org/discover/case-studies/baim-information-people-reduced-mobility-field-public-transport-frankfurt-de)
		// 		hcp_0 – Do not filter.
		// 			Results: baim_1, baim_2, baim_3, baim_4
		// 		hcp_1 – Boarding and alighting possible.
		// 			Results: baim_1
		// 		hcp_2 – Boarding and alighting possible with the help of the crew.
		// 			Results: baim_1, baim_2
		// 		hcp_3 – Boarding and alighting requires advance notification.
		// 			Results: baim_1, baim_2, baim_3
		// 		Result values baim_info and baim_rsv are not filterable and will be returned if present.
		// - eco, ecoCmp, ecoParams
		// - economic
		// - withICTAlternatives
		const query = {
			originId: profile.formatLocation(profile, origin, 'origin').lid,
			destId: profile.formatLocation(profile, destination, 'destination').lid,
			poly: opt.polylines ? 1 : 0,
			passlist: opt.stopovers ? 1 : 0,
			showPassingPoints: 1, // return pass-by stopovers
			eco: 0,
			originWalk: opt.startWithWalking ? 1 : 0,
			destWalk: 1,
			rtMode: 'FULL', // todo: make customisable?, see https://pastebin.com/qZ9WS3Cx
			// "take additional stations nearby the given start and destination station into account"
			ushrp: 1,
			// "Disables search optimization in relation of duration."
			includeEarlier: 1 // todo: make customisable?
		}
		if (opt.transferTime !== null) query.minChangeTime = opt.transferTime
		if (opt.transfers >= 0) query.maxChange = opt.transfers
		if (opt.results !== null) query.numF = opt.results // todo: what about numB?

		let when
		if (opt.departure !== undefined && opt.departure !== null) {
			when = new Date(opt.departure)
			if (Number.isNaN(+when)) throw new TypeError('opt.departure is invalid')
		} else if (opt.arrival !== undefined && opt.arrival !== null) {
			when = new Date(opt.arrival)
			if (Number.isNaN(+when)) throw new TypeError('opt.arrival is invalid')
			query.searchForArrival = 1
		}
		if (when) {
			query.date = profile.formatDate(profile, when)
			query.time = profile.formatTime(profile, when)
		}

		const {res} = await profile.request({profile, opt, token}, userAgent, 'trip', query)
		const ctx = {profile, opt, res}

		return ctx.res.Trip.map(t => profile.parseJourney(ctx, t))
	}

	const tripAlternatives = async (tripCtx, origin, destination, opt = {}) => {
		// todo
		const {res} = await profile.request({profile, opt, token}, userAgent, 'trip.alternatives', {
			ctx: 'T$A=1@O=Hildesheim Hbf@L=8000169@a=128@$A=1@O=Hannover Hbf@L=8000152@a=128@$201909031844$201909031910$erx83478$$1$',
			originId: 'A=1@O=Sarstedt@X=9842595@Y=52232604@U=80@L=8005292@',
			destId: 'A=1@O=Hannover Hbf@X=9741017@Y=52376764@U=80@L=8000152@',
			// todo: operators, products, poly
		})
		const ctx = {profile, opt, res}

		return ctx.res.Trip.map(t => profile.parseJourney(ctx, t))
	}

	const trip = async (id, opt = {}) => {
		const {res} = await profile.request({profile, opt, token}, userAgent, 'journeyDetail', {
			id,
			// todo: date, poly, showPassingPoints, rtMode
		})
		const ctx = {profile, opt, res}

		return profile.parseTrip(ctx, ctx.res)
	}

	// todo: fails with 404
	// todo [breaking]: rename to trips()?
	// const tripsByName = async (lineNameOrFahrtNr = '*', opt = {}) => {
	// 	if (!isNonEmptyString(lineNameOrFahrtNr)) {
	// 		throw new TypeError('lineNameOrFahrtNr must be a non-empty string.')
	// 	}
	// 	opt = Object.assign({
	// 		when: null,
	// 		// currentlyStoppingAt: null,
	// 		lineNames: null,
	// 		operatorNames: null,
	// 		// additionalFilters: [], // undocumented
	// 	}, opt)

	// 	const req = {
	// 		match: lineNameOrFahrtNr,
	// 		// todo: filters, stations, station, uic, infotexts, showPassingPoints
	// 	}
	// 	if (opt.when !== null) {
	// 		req.date = profile.formatDate({profile, opt}, new Date(opt.when))
	// 		req.time = profile.formatTime({profile, opt}, new Date(opt.when))
	// 	}
	// 	// if (opt.currentlyStoppingAt !== null) {
	// 	// 	if (!isNonEmptyString(opt.currentlyStoppingAt)) {
	// 	// 		throw new TypeError('opt.currentlyStoppingAt must be a non-empty string.')
	// 	// 	}
	// 	// 	req.jnyFltrL.push(filter('INC', 'STATIONS', opt.currentlyStoppingAt))
	// 	// }
	// 	if (opt.lineNames !== null) {
	// 		if (
	// 			!Array.isArray(opt.lineNames)
	// 			|| opt.lineNames.length === 0
	// 			|| !opt.lineNames.every(isNonEmptyString)
	// 		) {
	// 			throw new TypeError('opt.lineNames must be an array of non-empty strings.')
	// 		}
	// 		// todo: is the an escaping mechanism for ","
	// 		req.lines = opt.lineNames.join(',')
	// 	}
	// 	if (opt.operatorNames !== null) {
	// 		if (
	// 			!Array.isArray(opt.operatorNames)
	// 			|| opt.operatorNames.length === 0
	// 			|| !opt.operatorNames.every(isNonEmptyString)
	// 		) {
	// 			throw new TypeError('opt.operatorNames must be an array of non-empty strings.')
	// 		}
	// 		// todo: is the an escaping mechanism for ","
	// 		req.operators = opt.operatorNames.join(',')
	// 	}
	// 	// req.filters = opt.additionalFilters

	// 	let ctx
	// 	// try {
	// 		const {res} = await profile.request({profile, opt, token}, userAgent, 'journeyMatch', req)
	// 		ctx = {profile, opt, res}
	// 	// } catch (err) {
	// 	// 	if (err && err.code === 'NO_MATCH') return {res: {jnyL: []}}
	// 	// 	else throw err
	// 	// }
	// 	return res.jnyL.map(t => profile.parseTrip(ctx, t))
	// }

	// todo: fails with 404
	// const tripHistory = async (tripId, opt = {}) => {
	// 	const {res} = await profile.request({profile, opt, token}, userAgent, 'rtarchive', {
	// 		id: tripId,
	// 		date: profile.formatDate(profile, opt.when || Date.now())
	// 	})
	// 	const ctx = {profile, opt, res}

	// 	return ctx.res
	// }

	// todo: fails with 404
	const radar = async (bbox, opt = {}) => {
		opt = {
			results: 256, // maximum nr of movements
			realtimePositionsOnly: false,
			products: null, // optionally an object of booleans
			...opt,
		}

		const when = opt.when || Date.now()

		const {res} = await profile.request({profile, opt, token}, userAgent, 'journeyPos', {
			llLat: bbox.south,
			llLon: bbox.west,
			urLat: bbox.north,
			urLon: bbox.east,
			// todo: operators, products, attributes, lines, jid, infotexts
			date: profile.formatDate(profile, when),
			time: profile.formatTime(profile, when),
			products: profile.formatProductsBitmask({profile, opt}, opt.products || {}),
			maxJny: opt.results,
			// Mode the used for position calculation
			// REPORT_ONLY: Only get back reported positions.
			// CALC_REPORT: Use reported position if available, calculate if not.
			// CALC: Calculate all positions
			positionMode: opt.realtimePositionsOnly ? 'REPORT_ONLY' : 'CALC_REPORT',
		})
		const ctx = {profile, opt, res}

		if (!Array.isArray(res.Journey)) return []
		return res.Journey.map(m => profile.parseMovement(ctx, m))
	}

	// todo: fails with 404
	// const remarks = async (opt = {}) => {
	// 	const {res} = await profile.request({profile, opt, token}, userAgent, 'himSearch', {
	// 		// todo: dateB, dateE, timeB, timeE, himIds, operators, categories
	// 		// todo: channels, companies, metas, himcategory, poly, searchmode
	// 		// todo: minprio, maxprio
	// 	})
	// 	const ctx = {profile, opt, res}

	// 	return ctx.res
	// }

	// todo: fails with 404
	// const dataInfo = async (opt = {}) => {
	// 	const {res} = await profile.request({profile, opt, token}, userAgent, 'datainfo')
	// 	const ctx = {profile, opt, res}

	// 	return ctx.res
	// }

	const client = {
		locations, nearby,
		departures, arrivals,
		journeys, trip,
		// tripsByName,
		tripAlternatives,
		radar,
	}
	Object.defineProperty(client, 'profile', {value: profile})
	return client
}

export {
	createRestClient,
}
