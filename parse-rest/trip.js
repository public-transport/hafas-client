'use strict'

const sortBy = require('lodash/sortBy')
const last = require('lodash/last')
const pick = require('lodash/pick')

const createParseTrip = (profile, opt, data) => {
	const parseTrip = (t) => {
		const product = t.products && t.products[0] && t.products[0].Product
		const direction = t.directions && t.directions[0] && t.directions[0].value

		const parseS = profile.parseStopover(profile, opt, data)
		const stopovers = sortBy(t.stops, 'routeIdx').map(st => parseS(null, st))
		const dep = stopovers[0]
		const arr = last(stopovers)

		return {
			origin: dep.stop,
			destination: arr.stop,
			line: product ? profile.parseLine(profile, opt, data)(product) : null,
			direction: direction || null,

			...pick(dep, [
				'departure',
				'plannedDeparture',
				'departureDelay',
				'prognosedDeparture'
			]),
			...pick(arr, [
				'arrival',
				'plannedArrival',
				'arrivalDelay',
				'prognosedArrival'
			]),

			stopovers
		}
	}

	return parseTrip
}

module.exports = createParseTrip
