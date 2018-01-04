'use strict'

const minBy = require('lodash/minBy')
const maxBy = require('lodash/maxBy')

const validateProfile = require('./lib/validate-profile')
const defaultProfile = require('./lib/default-profile')
const request = require('./lib/request')

const createClient = (profile) => {
	profile = Object.assign({}, defaultProfile, profile)
	validateProfile(profile)

	const departures = (station, opt = {}) => {
		if ('object' === typeof station) station = profile.formatStation(station.id)
		else if ('string' === typeof station) station = profile.formatStation(station)
		else throw new Error('station must be an object or a string.')

		opt = Object.assign({
			direction: null, // only show departures heading to this station
			duration:  10 // show departures for the next n minutes
		}, opt)
		opt.when = opt.when || new Date()
		const products = profile.formatProducts(opt.products || {})

		const dir = opt.direction ? profile.formatStation(opt.direction) : null
		return request(profile, {
			meth: 'StationBoard',
			req: {
				type: 'DEP',
				date: profile.formatDate(profile, opt.when),
				time: profile.formatTime(profile, opt.when),
				stbLoc: station,
				dirLoc: dir,
				jnyFltrL: [products],
				dur: opt.duration,
				getPasslist: false
			}
		})
		.then((d) => {
			if (!Array.isArray(d.jnyL)) return [] // todo: throw err?
			const parse = profile.parseDeparture(profile, d.locations, d.lines, d.remarks)
			return d.jnyL.map(parse)
			.sort((a, b) => new Date(a.when) - new Date(b.when))
		})
	}

	const journeys = (from, to, opt = {}) => {
		from = profile.formatLocation(profile, from)
		to = profile.formatLocation(profile, to)

		opt = Object.assign({
			results: 5, // how many journeys?
			via: null, // let journeys pass this station?
			passedStations: false, // return stations on the way?
			transfers: 5, // maximum of 5 transfers
			transferTime: 0, // minimum time for a single transfer in minutes
			// todo: does this work with every endpoint?
			accessibility: 'none', // 'none', 'partial' or 'complete'
			bike: false, // only bike-friendly journeys
			tickets: false, // return tickets?
		}, opt)
		if (opt.via) opt.via = profile.formatLocation(profile, opt.via)
		opt.when = opt.when || new Date()

		const filters = [
			profile.formatProducts(opt.products || {})
		]
		if (
			opt.accessibility &&
			profile.filters &&
			profile.filters.accessibility &&
			profile.filters.accessibility[opt.accessibility]
		) {
			filters.push(profile.filters.accessibility[opt.accessibility])
		}

		const query = profile.transformJourneysQuery({
			outDate: profile.formatDate(profile, opt.when),
			outTime: profile.formatTime(profile, opt.when),
			numF: opt.results,
			getPasslist: !!opt.passedStations,
			maxChg: opt.transfers,
			minChgTime: opt.transferTime,
			depLocL: [from],
			viaLocL: opt.via ? [opt.via] : null,
			arrLocL: [to],
			jnyFltrL: filters,
			getTariff: !!opt.tickets,

			// todo: what is req.gisFltrL?
			getPT: true, // todo: what is this?
			outFrwd: true, // todo: what is this?
			getIV: false, // todo: walk & bike as alternatives?
			getPolyline: false // todo: shape for displaying on a map?
		}, opt)

		return request(profile, {
			cfg: {polyEnc: 'GPA'},
			meth: 'TripSearch',
			req: query
		})
		.then((d) => {
			if (!Array.isArray(d.outConL)) return []
			const parse = profile.parseJourney(profile, d.locations, d.lines, d.remarks)
			return d.outConL.map(parse)
		})
	}

	const locations = (query, opt = {}) => {
		if ('string' !== typeof query) throw new Error('query must be a string.')
		opt = Object.assign({
			fuzzy: true, // find only exact matches?
			results: 10, // how many search results?
			stations: true,
			addresses: true,
			poi: true // points of interest
		}, opt)

		const f = profile.formatLocationFilter(opt.stations, opt.addresses, opt.poi)
		return request(profile, {
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
			return d.match.locL.map(loc => parse(profile, loc))
		})
	}

	const nearby = (latitude, longitude, opt = {}) => {
		if ('number' !== typeof latitude) throw new Error('latitude must be a number.')
		if ('number' !== typeof longitude) throw new Error('longitude must be a number.')
		opt = Object.assign({
			results: 8, // maximum number of results
			distance: null, // maximum walking distance in meters
			poi: false, // return points of interest?
			stations: true, // return stations?
		}, opt)

		return request(profile, {
			cfg: {polyEnc: 'GPA'},
			meth: 'LocGeoPos',
			req: {
				ring: {
					cCrd: {
						x: profile.formatCoord(longitude),
						y: profile.formatCoord(latitude)
					},
					maxDist: opt.distance || -1,
					minDist: 0
				},
				getPOIs: !!opt.poi,
				getStops: !!opt.stations,
				maxLoc: opt.results
			}
		})
		.then((d) => {
			if (!Array.isArray(d.locL)) return []
			const parse = profile.parseNearby
			return d.locL.map(loc => parse(profile, loc))
		})
	}

	const journeyLeg = (ref, lineName, opt = {}) => {
		opt = Object.assign({
			passedStations: true // return stations on the way?
		}, opt)
		opt.when = opt.when || new Date()

		return request(profile, {
			cfg: {polyEnc: 'GPA'},
			meth: 'JourneyDetails',
			req: {
				jid: ref,
				name: lineName,
				date: profile.formatDate(profile, opt.when)
			}
		})
		.then((d) => {
			const parse = profile.parseJourneyLeg(profile, d.locations, d.lines, d.remarks)

			const leg = { // pretend the leg is contained in a journey
				type: 'JNY',
				dep: minBy(d.journey.stopL, 'idx'),
				arr: maxBy(d.journey.stopL, 'idx'),
				jny: d.journey
			}
			return parse(d.journey, leg, !!opt.passedStations)
		})
	}

	const radar = (north, west, south, east, opt) => {
		if ('number' !== typeof north) throw new Error('north must be a number.')
		if ('number' !== typeof west) throw new Error('west must be a number.')
		if ('number' !== typeof south) throw new Error('south must be a number.')
		if ('number' !== typeof east) throw new Error('east must be a number.')

		opt = Object.assign({
			results: 256, // maximum number of vehicles
			duration: 30, // compute frames for the next n seconds
			frames: 3, // nr of frames to compute
			products: null // optionally an object of booleans
		}, opt || {})
		opt.when = opt.when || new Date()

		const durationPerStep = opt.duration / Math.max(opt.frames, 1) * 1000
		return request(profile, {
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
					profile.formatProducts(opt.products || {})
				],
				trainPosMode: 'CALC' // todo: what is this? what about realtime?
			}
		})
		.then((d) => {
			if (!Array.isArray(d.jnyL)) return []

			const parse = profile.parseMovement(profile, d.locations, d.lines, d.remarks)
			return d.jnyL.map(parse)
		})
	}

	const client = {departures, journeys, locations, nearby}
	if (profile.journeyLeg) client.journeyLeg = journeyLeg
	if (profile.radar) client.radar = radar
	Object.defineProperty(client, 'profile', {value: profile})
	return client
}

module.exports = createClient
