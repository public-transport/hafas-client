'use strict'

const DEBUG = process.env.DEBUG === 'hafas-client'

const get = require('lodash/get')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const {stringify} = require('qs')
const {parse: parseContentType} = require('content-type')
const randomizeUserAgent = require('./lib/randomize-user-agent')
const {byErrorCode} = require('./lib/rest-exe-errors')
const findInTree = require('./lib/find-in-tree')
const parseWhen = require('./parse-rest/when')
const parseLine = require('./parse-rest/line')
const parsePolyline = require('./parse-rest/polyline')
const parseHint = require('./parse-rest/hint')
const parseLocation = require('./parse-rest/location')
const formatDate = require('./format-rest/date')
const formatTime = require('./format-rest/time')
const defaultProfile = require('./lib/default-profile')
const dbMgateProfile = require('./p/db')

const isNonEmptyString = str => 'string' === typeof str && str.length > 0

const unwrapNested = (tree, selector, prop) => {
	findInTree(tree, selector, (item, parent, path) => {
		const grandParent = get(tree, path.slice(0, -2), tree)
		grandParent[prop] = item
	})
}

const createRestClient = (profile, token, userAgent) => {
	profile = {
		...defaultProfile,
		...dbMgateProfile,
		parseWhen,
		parseLine,
		parsePolyline,
		parseHint,
		parseLocation,
		formatDate,
		formatTime,
		...profile
	}
	if (!isNonEmptyString(profile.endpoint)) throw new Error('missing profile.endpoint')
	if (!isNonEmptyString(token)) throw new Error('missing token')
	if (!isNonEmptyString(userAgent)) throw new Error('missing userAgent')

	const request = async (method, opt, query = {}) => {
		query = {
			lang: opt.language || 'en',
			...query,
			format: 'json'
		}
		if (DEBUG) console.error(JSON.stringify(query))

		const url = profile.endpoint + method + '?' + stringify({...query, accessId: token})
		const fetchCfg = {
			headers: {
				'accept-encoding': 'gzip, br, deflate',
				'accept': 'application/json',
				'user-agent': randomizeUserAgent(userAgent)
			},
			redirect: 'follow'
		}
		const res = await fetch(url, fetchCfg)

		const cTypeHeader = res.headers.get('content-type')
		const {type: cType} = cTypeHeader ? parseContentType(cTypeHeader) : {}
		const asJSON = cType === 'application/json'
		const body = asJSON ? await res.json() : await res.text()
		if (DEBUG) console.error(asJSON ? JSON.stringify(body) : body)

		if (!res.ok) {
			// todo: parse HTML error messages
			let err = new Error(res.statusText)
			if (asJSON) {
				const {errorCode, errorText} = body
				if (errorCode && byErrorCode[errorCode]) {
					Object.assign(err, byErrorCode[errorCode])
					err.hafasErrorCode = errorCode
					if (errorText) err.hafasErrorMessage = errorText
				} else {
					err = new Error(errorText)
					err.code = errorCode
				}
			} else if (body) err = new Error(body)

			err.statusCode = res.status
			err.endpoint = profile.endpoint
			err.url = url
			err.query = query
			err.fetchCfg = fetchCfg
			throw err
		}

		// todo: sometimes it returns a body without any data
		// e.g. `location.nearbystops` with an invalid `type`

		unwrapNested(body, '**.ServiceDays[0]', 'serviceDays')
		unwrapNested(body, '**.LegList.Leg', 'legs')
		unwrapNested(body, '**.Notes.Note', 'notes')
		unwrapNested(body, '**.JourneyDetailRef.ref', 'ref')
		unwrapNested(body, '**.Stops.Stop', 'stops')
		unwrapNested(body, '**.Names.Name', 'products')
		unwrapNested(body, '**.Directions.Direction', 'directions')
		return body
	}

	const opt = {
		scheduledDays: false,
		polylines: false,
		stopovers: true,

		linesOfStops: true
	}

	const parseLocationsResult = (l) => {
		if (l.StopLocation) {
			return parseLocation(profile, opt, {}, {
				type: 'ST', ...l.StopLocation
			})
		}
		if (l.CoordLocation) {
			return parseLocation(profile, opt, {}, {
				type: 'ADR', ...l.CoordLocation
			})
		}
		return null
	}

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

		const res = await request('location.name', opt, {
			input: opt.fuzzy ? query + '?' : query,
			maxNo: 3, // todo: opt.results
			type: profile.formatLocationFilter(opt.stops, opt.addresses, opt.poi)
			// todo: `products` with bitmask
			// todo: coordLong, coordLat, radius
			// todo: refineId
		})

		return res.stopLocationOrCoordLocation
		.map(parseLocationsResult)
		.filter(loc => !!loc)
	}

	const nearby = async (location) => {
		const res = await request('location.nearbystops', opt, {
			originCoordLat: location.latitude,
			originCoordLong: location.longitude,
			// r: 2000, // radius
			// maxNo: 5, // todo: opt.results
			type: 'SP', // todo: S/P/SP
			// todo: `products` with bitmask
		})

		return res.stopLocationOrCoordLocation.reduce((locs, l) => {
			const loc = parseLocationsResult(l)
			if (!loc) return locs
			loc.distance = l.dist
			return [...locs, loc]
		}, [])
	}

	return {
		locations, nearby
	}
}

module.exports = createRestClient
