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

	const client = {
		locations, nearby,
	}
	Object.defineProperty(client, 'profile', {value: profile})
	return client
}

export {
	createRestClient,
}
