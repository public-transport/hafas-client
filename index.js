'use strict'

const minBy = require('lodash/minBy')
const maxBy = require('lodash/maxBy')

const defaultProfile = require('./lib/default-profile')
const request = require('./lib/request')

const createClient = (profile) => {
	profile = Object.assign({}, defaultProfile, profile)
	if ('string' !== typeof profile.timezone) {
		throw new Error('profile.timezone must be a string.')
	}

	const departures = (station, opt = {}) => {
		if ('string' !== typeof station) throw new Error('station must be a string.')

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
				stbLoc: profile.formatStation(station),
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
		}, opt)
		if (opt.via) opt.via = profile.formatLocation(profile, opt.via)
		opt.when = opt.when || new Date()
		const products = profile.formatProducts(opt.products || {})

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
			jnyFltrL: [products],

			// todo: what is req.gisFltrL?
			// todo: what are all these for?
			getPT: true,
			outFrwd: true,
			getTariff: false,
			getIV: false, // walk & bike as alternatives?
			getPolyline: false // shape for displaying on a map?
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

	const journeyPart = (ref, lineName, opt = {}) => {
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
			const parse = profile.parseJourneyPart(profile, d.locations, d.lines, d.remarks)

			const part = { // pretend the part is contained in a journey
				type: 'JNY',
				dep: minBy(d.journey.stopL, 'idx'),
				arr: maxBy(d.journey.stopL, 'idx'),
				jny: d.journey
			}
			return parse(d.journey, part)
		})
	}

	return {departures, journeys, locations, nearby, journeyPart}
}

module.exports = createClient
