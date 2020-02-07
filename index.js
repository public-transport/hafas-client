'use strict'

const minBy = require('lodash/minBy')
const maxBy = require('lodash/maxBy')
const isObj = require('lodash/isObject')
const sortBy = require('lodash/sortBy')
const pRetry = require('p-retry')

const defaultProfile = require('./lib/default-profile')
const validateProfile = require('./lib/validate-profile')

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

const createClient = (profile, userAgent, opt = {}) => {
	profile = Object.assign({}, defaultProfile, profile)
	validateProfile(profile)

	if ('string' !== typeof userAgent) {
		throw new TypeError('userAgent must be a string');
	}

	const _stationBoard = (station, type, parse, opt = {}) => {
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
			// todo: for arrivals(), this is actually a station it *has already* stopped by
			direction: null, // only show departures stopping by this station
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

		const req = profile.formatStationBoardReq({profile, opt}, station, type)

		return profile.request({profile, opt}, userAgent, req)
		.then(({res, common}) => {
			if (!Array.isArray(res.jnyL)) return []

			const ctx = {profile, opt, common, res}
			return res.jnyL.map(res => parse(ctx, res))
			.sort((a, b) => new Date(a.when) - new Date(b.when)) // todo
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
			results: null, // number of journeys – `null` means "whatever HAFAS returns"
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
			walkingSpeed: 'normal', // 'slow', 'normal', 'fast'
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
			if (!profile.journeysOutFrwd) {
				throw new Error('opt.arrival is unsupported')
			}
			when = new Date(opt.arrival)
			if (Number.isNaN(+when)) throw new TypeError('opt.arrival is invalid')
			outFrwd = false
		}

		const filters = [
			profile.formatProductsFilter({profile}, opt.products || {})
		]
		if (
			opt.accessibility &&
			profile.filters &&
			profile.filters.accessibility &&
			profile.filters.accessibility[opt.accessibility]
		) {
			filters.push(profile.filters.accessibility[opt.accessibility])
		}

		if (!['slow','normal','fast'].includes(opt.walkingSpeed)) {
			throw new Error('opt.walkingSpeed must be one of these values: "slow", "normal", "fast".')
		}
		const gisFltrL = []
		if (profile.journeysWalkingSpeed) {
			gisFltrL.push({
				meta: 'foot_speed_' + opt.walkingSpeed,
				mode: 'FB',
				type: 'M'
			})
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
				gisFltrL,
				getTariff: !!opt.tickets,
				// todo: this is actually "take additional stations nearby the given start and destination station into account"
				// see rest.exe docs
				ushrp: !!opt.startWithWalking,

				getPT: true, // todo: what is this?
				getIV: false, // todo: walk & bike as alternatives?
				getPolyline: !!opt.polylines
				// todo: `getConGroups: false` what is this?
			}
			if (profile.journeysNumF && opt.results !== null) query.numF = opt.results
			if (profile.journeysOutFrwd) query.outFrwd = outFrwd

			return profile.request({profile, opt}, userAgent, {
				cfg: {polyEnc: 'GPA'},
				meth: 'TripSearch',
				req: profile.transformJourneysQuery({profile, opt}, query)
			})
			.then(({res, common}) => {
				if (!Array.isArray(res.outConL)) return []
				// todo: outConGrpL

				const ctx = {profile, opt, common, res}

				if (!earlierRef) earlierRef = res.outCtxScrB

				let latestDep = -Infinity
				for (const rawJourney of res.outConL) {
					const journey = profile.parseJourney(ctx, rawJourney)
					journeys.push(journey)

					if (opt.results !== null && journeys.length >= opt.results) { // collected enough
						laterRef = res.outCtxScrF
						return {earlierRef, laterRef, journeys}
					}
					const dep = +new Date(journey.legs[0].departure) // todo
					if (dep > latestDep) latestDep = dep
				}

				if (opt.results === null) return {earlierRef, laterRef, journeys}
				const when = new Date(latestDep)
				return more(when, res.outCtxScrF) // otherwise continue
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

		const req = profile.formatRefreshJourneyReq({profile, opt}, refreshToken)

		return profile.request({profile, opt}, userAgent, req)
		.then(({res, common}) => {
			if (!Array.isArray(res.outConL) || !res.outConL[0]) {
				throw new Error('invalid response')
			}

			const ctx = {profile, opt, common, res}
			return profile.parseJourney(ctx, res.outConL[0])
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

		const req = profile.formatLocationsReq({profile, opt}, query)

		return profile.request({profile, opt}, userAgent, req)
		.then(({res, common}) => {
			if (!res.match || !Array.isArray(res.match.locL)) return []

			const ctx = {profile, opt, common, res}
			return res.match.locL.map(loc => profile.parseLocation(ctx, loc))
		})
	}

	const stop = (stop, opt = {}) => {
		if ('object' === typeof stop) stop = profile.formatStation(stop.id)
		else if ('string' === typeof stop) stop = profile.formatStation(stop)
		else throw new TypeError('stop must be an object or a string.')

		opt = Object.assign({
			linesOfStops: false // parse & expose lines at the stop/station?
		}, opt)

		const req = profile.formatStopReq({profile, opt}, stop)

		return profile.request({profile, opt}, userAgent, req)
		.then(({res, common}) => {
			if (!res || !Array.isArray(res.locL) || !res.locL[0]) {
				// todo: proper stack trace?
				throw new Error('invalid response')
			}

			const ctx = {profile, opt, res, common}
			return profile.parseLocation(ctx, res.locL[0])
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

		const req = profile.formatNearbyReq({profile, opt}, location)

		return profile.request({profile, opt}, userAgent, req)
		.then(({common, res}) => {
			if (!Array.isArray(res.locL)) return []

			const ctx = {profile, opt, common, res}
			return res.locL.map(loc => profile.parseNearby(ctx, loc))
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

		const req = profile.formatTripReq({profile, opt}, id, lineName)

		return profile.request({profile, opt}, userAgent, req)
		.then(({common, res}) => {
			const ctx = {profile, opt, common, res}

			const rawLeg = { // pretend the leg is contained in a journey
				type: 'JNY',
				dep: minBy(res.journey.stopL, 'idx'),
				arr: maxBy(res.journey.stopL, 'idx'),
				jny: res.journey
			}
			const trip = profile.parseJourneyLeg(ctx, rawLeg, res.journey.date)
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

		const req = profile.formatRadarReq({profile, opt}, north, west, south, east)

		return profile.request({profile, opt}, userAgent, req)
		.then(({res, common}) => {
			if (!Array.isArray(res.jnyL)) return []

			const ctx = {profile, opt, common, res}
			return res.jnyL.map(m => profile.parseMovement(ctx, m))
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

		const req = profile.formatReachableFromReq({profile, opt}, address)

		const refetch = () => {
			return profile.request({profile, opt}, userAgent, req)
			.then(({res, common}) => {
				if (!Array.isArray(res.posL)) {
					const err = new Error('invalid response')
					err.shouldRetry = true
					throw err
				}

				const byDuration = []
				let i = 0, lastDuration = NaN
				for (const pos of sortBy(res.posL, 'dur')) {
					const loc = common.locations[pos.locX]
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
