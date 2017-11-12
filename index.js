'use strict'

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
				jnyFltrL: [
					profile.formatProducts(opt.products) // todo
				],
				dur: opt.duration,
		        getPasslist: false
			}
		})
		.then((d) => {
			if (!Array.isArray(d.jnyL)) return [] // todo: throw err?
			const parse = profile.parseDeparture(profile, d.locations, d.lines, d.remarks)
			return d.jnyL.map(parse)
		})
	}

	return {departures}
}

module.exports = createClient
