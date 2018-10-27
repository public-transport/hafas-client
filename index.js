'use strict'

const minBy = require('lodash/minBy')
const maxBy = require('lodash/maxBy')
const isObj = require('lodash/isObject')
const sortBy = require('lodash/sortBy')
const pRetry = require('p-retry')

const defaultProfile = require('./lib/default-profile')
const createParseBitmask = require('./parse/products-bitmask')
const createFormatProductsFilter = require('./format/products-filter')
const validateProfile = require('./lib/validate-profile')
const _request = require('./lib/request')

const isNonEmptyString = str => 'string' === typeof str && str.length > 0

const validateLocation = (loc, name = 'location') => {
	if (!isObj(loc)) {
		throw new TypeError(name + ' must be an object.')
	} else if (loc.type !== 'location') {
		throw new TypeError('invalid location object.')
	} else if ('number' !== typeof loc.latitude) {
		throw new TypeError(name + '.latitude must be a number.')
	} else if ('number' !== typeof loc.longitude) {
		throw new TypeError(name + '.longitude must be a number.')
	}
}

const createClient = (profile, userAgent, request = _request) => {
	profile = Object.assign({}, defaultProfile, profile)
	if (!profile.parseProducts) {
		profile.parseProducts = createParseBitmask(profile)
	}
	if (!profile.formatProductsFilter) {
		profile.formatProductsFilter = createFormatProductsFilter(profile)
	}
	validateProfile(profile)

	if ('string' !== typeof userAgent) {
		throw new TypeError('userAgent must be a string');
	}

	const _stationBoard = (station, type, parser, opt = {}) => {
		if (isObj(station)) station = profile.formatStation(station.id)
		else if ('string' === typeof station) station = profile.formatStation(station)
		else throw new TypeError('station must be an object or a string.')

		if ('string' !== typeof type || !type) {
			throw new TypeError('type must be a non-empty string.')
		}

		if (!profile.departuresGetPasslist && ('stopovers' in opt)) {
			throw new Error('opt.stopovers is not supported by this endpoint')
		}
		if (!profile.departuresStbFltrEquiv && ('includeRelatedStations' in opt)) {
			throw new Error('opt.includeRelatedStations is not supported by this endpoint')
		}

		opt = Object.assign({
			direction: null, // only show departures heading to this station
			duration: 10, // show departures for the next n minutes
			linesOfStops: false, // parse & expose lines at the stop/station?
			remarks: true, // parse & expose hints & warnings?
			stopovers: false, // fetch & parse previous/next stopovers?
			// departures at related stations
			// e.g. those that belong together on the metro map.
			includeRelatedStations: true
		}, opt)
		opt.when = new Date(opt.when || Date.now())
		if (Number.isNaN(+opt.when)) throw new Error('opt.when is invalid')
		const products = profile.formatProductsFilter(opt.products || {})

		const dir = opt.direction ? profile.formatStation(opt.direction) : null
		const req = {
			type,
			date: profile.formatDate(profile, opt.when),
			time: profile.formatTime(profile, opt.when),
			stbLoc: station,
			dirLoc: dir,
			jnyFltrL: [products],
			dur: opt.duration
		}
		if (profile.departuresGetPasslist) req.getPasslist = !!opt.stopovers
		if (profile.departuresStbFltrEquiv) req.stbFltrEquiv = !opt.includeRelatedStations
		return request(profile, userAgent, opt, {
			meth: 'StationBoard',
			req
		})
		.then((d) => {
			if (!Array.isArray(d.jnyL)) return []
			const parse = parser(profile, opt, {
				locations: d.locations,
				lines: d.lines,
				hints: d.hints,
				warnings: d.warnings
			})
			return d.jnyL.map(parse)
			.sort((a, b) => new Date(a.when) - new Date(b.when))
		})
	}

	const departures = (station, opt = {}) => {
		return _stationBoard(station, 'DEP', profile.parseDeparture, opt)
	}
	const arrivals = (station, opt = {}) => {
		return _stationBoard(station, 'ARR', profile.parseArrival, opt)
	}

	const journeys = (from, to, opt = {}) => {
		from = profile.formatLocation(profile, from, 'from')
		to = profile.formatLocation(profile, to, 'to')

		if (('earlierThan' in opt) && ('laterThan' in opt)) {
			throw new TypeError('opt.earlierThan and opt.laterThan are mutually exclusive.')
		}
		if (('departure' in opt) && ('arrival' in opt)) {
			throw new TypeError('opt.departure and opt.arrival are mutually exclusive.')
		}
		let journeysRef = null
		if ('earlierThan' in opt) {
			if (!isNonEmptyString(opt.earlierThan)) {
				throw new TypeError('opt.earlierThan must be a non-empty string.')
			}
			if (('departure' in opt) || ('arrival' in opt)) {
				throw new TypeError('opt.earlierThan and opt.departure/opt.arrival are mutually exclusive.')
			}
			journeysRef = opt.earlierThan
		}
		if ('laterThan' in opt) {
			if (!isNonEmptyString(opt.laterThan)) {
				throw new TypeError('opt.laterThan must be a non-empty string.')
			}
			if (('departure' in opt) || ('arrival' in opt)) {
				throw new TypeError('opt.laterThan and opt.departure/opt.arrival are mutually exclusive.')
			}
			journeysRef = opt.laterThan
		}

		opt = Object.assign({
			results: 5, // how many journeys?
			via: null, // let journeys pass this station?
			stopovers: false, // return stations on the way?
			transfers: -1, // maximum of 5 transfers
			transferTime: 0, // minimum time for a single transfer in minutes
			// todo: does this work with every endpoint?
			accessibility: 'none', // 'none', 'partial' or 'complete'
			bike: false, // only bike-friendly journeys
			tickets: false, // return tickets?
			polylines: false, // return leg shapes?
			remarks: true, // parse & expose hints & warnings?
			// Consider walking to nearby stations at the beginning of a journey?
			startWithWalking: true,
			scheduledDays: false
		}, opt)
		if (opt.via) opt.via = profile.formatLocation(profile, opt.via, 'opt.via')

		if (opt.when !== undefined) {
			throw new Error('opt.when is not supported anymore. Use opt.departure/opt.arrival.')
		}
		let when = new Date(), outFrwd = true
		if (opt.departure !== undefined && opt.departure !== null) {
			when = new Date(opt.departure)
			if (Number.isNaN(+when)) throw new TypeError('opt.departure is invalid')
		} else if (opt.arrival !== undefined && opt.arrival !== null) {
			when = new Date(opt.arrival)
			if (Number.isNaN(+when)) throw new TypeError('opt.arrival is invalid')
			outFrwd = false
		}

		const filters = [
			profile.formatProductsFilter(opt.products || {})
		]
		if (
			opt.accessibility &&
			profile.filters &&
			profile.filters.accessibility &&
			profile.filters.accessibility[opt.accessibility]
		) {
			filters.push(profile.filters.accessibility[opt.accessibility])
		}

		// With protocol version `1.16`, the VBB endpoint *used to* fail with
		// `CGI_READ_FAILED` if you pass `numF`, the parameter for the number
		// of results. To circumvent this, we loop here, collecting journeys
		// until we have enough.
		// todo: revert this change, see https://github.com/public-transport/hafas-client/issues/76#issuecomment-424448449
		const journeys = []
		let earlierRef, laterRef
		const more = (when, journeysRef) => {
			const query = {
				outDate: profile.formatDate(profile, when),
				outTime: profile.formatTime(profile, when),
				ctxScr: journeysRef,
				getPasslist: !!opt.stopovers,
				maxChg: opt.transfers,
				minChgTime: opt.transferTime,
				depLocL: [from],
				viaLocL: opt.via ? [{loc: opt.via}] : null,
				arrLocL: [to],
				jnyFltrL: filters,
				getTariff: !!opt.tickets,
				outFrwd,
				ushrp: !!opt.startWithWalking,

				// todo: what is req.gisFltrL?
				getPT: true, // todo: what is this?
				getIV: false, // todo: walk & bike as alternatives?
				getPolyline: !!opt.polylines
			}
			if (profile.journeysNumF) query.numF = opt.results

			return request(profile, userAgent, opt, {
				cfg: {polyEnc: 'GPA'},
				meth: 'TripSearch',
				req: profile.transformJourneysQuery(query, opt)
			})
			.then((d) => {
				if (!Array.isArray(d.outConL)) return []

				const parse = profile.parseJourney(profile, opt, d)

				if (!earlierRef) earlierRef = d.outCtxScrB

				let latestDep = -Infinity
				for (let j of d.outConL) {
					j = parse(j)
					journeys.push(j)

					if (opt.results !== null && journeys.length >= opt.results) { // collected enough
						laterRef = d.outCtxScrF
						return {earlierRef, laterRef, journeys}
					}
					const dep = +new Date(j.legs[0].departure)
					if (dep > latestDep) latestDep = dep
				}

				if (opt.results === null) return {earlierRef, laterRef, journeys}
				const when = new Date(latestDep)
				return more(when, d.outCtxScrF) // otherwise continue
			})
		}

		return more(when, journeysRef)
	}

	const refreshJourney = (refreshToken, opt = {}) => {
		if ('string' !== typeof refreshToken || !refreshToken) {
			new TypeError('refreshToken must be a non-empty string.')
		}

		opt = Object.assign({
			stopovers: false, // return stations on the way?
			tickets: false, // return tickets?
			polylines: false, // return leg shapes?
			remarks: true // parse & expose hints & warnings?
		}, opt)

		return request(profile, userAgent, opt, {
			meth: 'Reconstruction',
			req: {
				ctxRecon: refreshToken,
				getIST: true, // todo: make an option
				getPasslist: !!opt.stopovers,
				getPolyline: !!opt.polylines,
				getTariff: !!opt.tickets
			}
		})
		.then((d) => {
			if (!Array.isArray(d.outConL) || !d.outConL[0]) {
				throw new Error('invalid response')
			}

			const parse = profile.parseJourney(profile, opt, d)
			return parse(d.outConL[0])
		})
	}

	const locations = (query, opt = {}) => {
		if (!isNonEmptyString(query)) {
			throw new TypeError('query must be a non-empty string.')
		}
		opt = Object.assign({
			fuzzy: true, // find only exact matches?
			results: 5, // how many search results?
			stops: true, // return stops/stations?
			addresses: true,
			poi: true, // points of interest
			linesOfStops: false // parse & expose lines at each stop/station?
		}, opt)

		const f = profile.formatLocationFilter(opt.stops, opt.addresses, opt.poi)
		return request(profile, userAgent, opt, {
			cfg: {polyEnc: 'GPA'},
			meth: 'LocMatch',
			req: {input: {
				loc: {
					type: f,
					name: opt.fuzzy ? query + '?' : query
				},
				maxLoc: opt.results,
				field: 'S' // todo: what is this?
			}}
		})
		.then((d) => {
			if (!d.match || !Array.isArray(d.match.locL)) return []
			const parse = profile.parseLocation
			return d.match.locL.map(loc => parse(profile, opt, d, loc))
		})
	}

	const stop = (stop, opt = {}) => {
		if ('object' === typeof stop) stop = profile.formatStation(stop.id)
		else if ('string' === typeof stop) stop = profile.formatStation(stop)
		else throw new TypeError('stop must be an object or a string.')

		opt = Object.assign({
			linesOfStops: false // parse & expose lines at the stop/station?
		}, opt)
		return request(profile, userAgent, opt, {
			meth: 'LocDetails',
			req: {
				locL: [stop]
			}
		})
		.then((d) => {
			if (!d || !Array.isArray(d.locL) || !d.locL[0]) {
				// todo: proper stack trace?
				throw new Error('invalid response')
			}
			return profile.parseLocation(profile, opt, d, d.locL[0])
		})
	}

	const nearby = (location, opt = {}) => {
		validateLocation(location, 'location')

		opt = Object.assign({
			results: 8, // maximum number of results
			distance: null, // maximum walking distance in meters
			poi: false, // return points of interest?
			stops: true, // return stops/stations?
			linesOfStops: false // parse & expose lines at each stop/station?
		}, opt)

		return request(profile, userAgent, opt, {
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
				getPOIs: !!opt.poi,
				getStops: !!opt.stops,
				maxLoc: opt.results
			}
		})
		.then((d) => {
			if (!Array.isArray(d.locL)) return []
			const parse = profile.parseNearby
			return d.locL.map(loc => parse(profile, opt, d, loc))
		})
	}

	const trip = (id, lineName, opt = {}) => {
		if (!isNonEmptyString(id)) {
			throw new TypeError('id must be a non-empty string.')
		}
		if (!isNonEmptyString(lineName)) {
			throw new TypeError('lineName must be a non-empty string.')
		}
		opt = Object.assign({
			stopovers: true, // return stations on the way?
			polyline: false, // return a track shape?
			remarks: true // parse & expose hints & warnings?
		}, opt)

		return request(profile, userAgent, opt, {
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
		})
		.then((d) => {
			const parse = profile.parseJourneyLeg(profile, opt, d)

			const rawLeg = { // pretend the leg is contained in a journey
				type: 'JNY',
				dep: minBy(d.journey.stopL, 'idx'),
				arr: maxBy(d.journey.stopL, 'idx'),
				jny: d.journey
			}
			const trip = parse(d.journey, rawLeg, !!opt.stopovers)
			trip.id = trip.tripId
			delete trip.tripId
			return trip
		})
	}

	const radar = ({north, west, south, east}, opt) => {
		if ('number' !== typeof north) throw new TypeError('north must be a number.')
		if ('number' !== typeof west) throw new TypeError('west must be a number.')
		if ('number' !== typeof south) throw new TypeError('south must be a number.')
		if ('number' !== typeof east) throw new TypeError('east must be a number.')
		if (north <= south) throw new Error('north must be larger than south.')
		if (east <= west) throw new Error('east must be larger than west.')

		opt = Object.assign({
			results: 256, // maximum number of vehicles
			duration: 30, // compute frames for the next n seconds
			// todo: what happens with `frames: 0`?
			frames: 3, // nr of frames to compute
			products: null, // optionally an object of booleans
			polylines: true // return a track shape for each vehicle?
		}, opt || {})
		opt.when = new Date(opt.when || Date.now())
		if (Number.isNaN(+opt.when)) throw new TypeError('opt.when is invalid')

		const durationPerStep = opt.duration / Math.max(opt.frames, 1) * 1000
		return request(profile, userAgent, opt, {
			meth: 'JourneyGeoPos',
			req: {
				maxJny: opt.results,
				onlyRT: false, // todo: does this mean "only realtime"?
				date: profile.formatDate(profile, opt.when),
				time: profile.formatTime(profile, opt.when),
				// todo: would a ring work here as well?
				rect: profile.formatRectangle(profile, north, west, south, east),
				perSize: opt.duration * 1000,
				perStep: Math.round(durationPerStep),
				ageOfReport: true, // todo: what is this?
				jnyFltrL: [
					profile.formatProductsFilter(opt.products || {})
				],
				trainPosMode: 'CALC' // todo: what is this? what about realtime?
			}
		})
		.then((d) => {
			if (!Array.isArray(d.jnyL) || d.jnyL.length === 0) return []

			const parse = profile.parseMovement(profile, opt, d)
			return d.jnyL.map(parse)
		})
	}

	const reachableFrom = (address, opt = {}) => {
		validateLocation(address, 'address')

		opt = Object.assign({
			when: Date.now(),
			maxTransfers: 5, // maximum of 5 transfers
			maxDuration: 20, // maximum travel duration in minutes, pass `null` for infinite
			products: {}
		}, opt)
		if (Number.isNaN(+opt.when)) throw new TypeError('opt.when is invalid')

		const refetch = () => {
			return request(profile, userAgent, opt, {
				meth: 'LocGeoReach',
				req: {
					loc: profile.formatLocation(profile, address, 'address'),
					maxDur: opt.maxDuration === null ? -1 : opt.maxDuration,
					maxChg: opt.maxTransfers,
					date: profile.formatDate(profile, opt.when),
					time: profile.formatTime(profile, opt.when),
					period: 120, // todo: what is this?
					jnyFltrL: [
						profile.formatProductsFilter(opt.products || {})
					]
				}
			})
			.then((d) => {
				if (!Array.isArray(d.posL)) {
					const err = new Error('invalid response')
					err.shouldRetry = true
					throw err
				}

				const byDuration = []
				let i = 0, lastDuration = NaN
				for (const pos of sortBy(d.posL, 'dur')) {
					const loc = d.locations[pos.locX]
					if (!loc) continue
					if (pos.dur !== lastDuration) {
						lastDuration = pos.dur
						i = byDuration.length
						byDuration.push({
							duration: pos.dur,
							stations: [loc]
						})
					} else {
						byDuration[i].stations.push(loc)
					}
				}
				return byDuration
			})
		}

		return pRetry(refetch, {
			retries: 3,
			factor: 2,
			minTimeout: 2 * 1000
		})
	}

	const client = {departures, arrivals, journeys, locations, stop, nearby}
	if (profile.trip) client.trip = trip
	if (profile.radar) client.radar = radar
	if (profile.refreshJourney) client.refreshJourney = refreshJourney
	if (profile.reachableFrom) client.reachableFrom = reachableFrom
	Object.defineProperty(client, 'profile', {value: profile})
	return client
}

module.exports = createClient
