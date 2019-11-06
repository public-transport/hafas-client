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
			maxNo: 3, // todo: opt.results
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
		query.date = profile.formatDate({profile, opt}, when)
		query.time = profile.formatTime({profile, opt}, when)

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

	const client = {
		locations, nearby,
		departures, arrivals,
	}
	Object.defineProperty(client, 'profile', {value: profile})
	return client
}

export {
	createRestClient,
}
