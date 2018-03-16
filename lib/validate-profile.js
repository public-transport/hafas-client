'use strict'

const types = {
	locale: 'string',
	timezone: 'string',
	transformReq: 'function',
	transformReqBody: 'function',
	transformJourneysQuery: 'function',

	products: 'array',

	parseDateTime: 'function',
	parseDeparture: 'function',
	parseJourneyLeg: 'function',
	parseJourney: 'function',
	parseLine: 'function',
	parseStationName: 'function',
	parseLocation: 'function',
	parseMovement: 'function',
	parseNearby: 'function',
	parseOperator: 'function',
	parseRemark: 'function',
	parseStopover: 'function',

	formatAddress: 'function',
	formatCoord: 'function',
	formatDate: 'function',
	formatLocationFilter: 'function',
	formatPoi: 'function',
	formatStation: 'function',
	formatTime: 'function',
	formatLocation: 'function',
	formatRectangle: 'function'
}

const validateProfile = (profile) => {
	for (let key of Object.keys(types)) {
		const type = types[key]
		if (type === 'array') {
			if (!Array.isArray(profile[key])) {
				throw new Error(`profile.${key} must be an array.`)
			}
		} else if (type !== typeof profile[key]) {
			throw new Error(`profile.${key} must be a ${type}.`)
		}
		if (type === 'object' && profile[key] === null) {
			throw new Error(`profile.${key} must not be null.`)
		}
	}

	if (!Array.isArray(profile.products)) {
		throw new Error('profile.products must be an array.')
	}
	if (profile.products.length === 0) throw new Error('profile.products is empty.')
}

module.exports = validateProfile
