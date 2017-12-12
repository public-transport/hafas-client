'use strict'

const types = {
	locale: 'string',
	timezone: 'string',
	transformReq: 'function',
	transformReqBody: 'function',
	transformJourneysQuery: 'function',

	parseDateTime: 'function',
	parseDeparture: 'function',
	parseJourneyPart: 'function',
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
		if (type !== typeof profile[key]) {
			throw new Error(`profile.${key} must be a ${type}.`)
		}
	}
}

module.exports = validateProfile
