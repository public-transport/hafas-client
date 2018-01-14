'use strict'

const parseDateTime = require('../parse/date-time')
const parseDeparture = require('../parse/departure')
const parseJourneyLeg = require('../parse/journey-leg')
const parseJourney = require('../parse/journey')
const parseLine = require('../parse/line')
const parseLocation = require('../parse/location')
const parseMovement = require('../parse/movement')
const parseNearby = require('../parse/nearby')
const parseOperator = require('../parse/operator')
const parseRemark = require('../parse/remark')
const parseStopover = require('../parse/stopover')

const formatAddress = require('../format/address')
const formatCoord = require('../format/coord')
const formatDate = require('../format/date')
const formatLocationFilter = require('../format/location-filter')
const formatPoi = require('../format/poi')
const formatStation = require('../format/station')
const formatTime = require('../format/time')
const formatLocation = require('../format/location')
const formatRectangle = require('../format/rectangle')
const filters = require('../format/filters')

const id = x => x

const defaultProfile = {
	salt: null,
	addChecksum: false,

	transformReqBody: id,
	transformReq: id,

	transformJourneysQuery: id,

	parseDateTime,
	parseDeparture,
	parseJourneyLeg,
	parseJourney,
	parseLine,
	parseStationName: id,
	parseLocation,
	parseMovement,
	parseNearby,
	parseOperator,
	parseRemark,
	parseStopover,

	formatAddress,
	formatCoord,
	formatDate,
	formatLocationFilter,
	formatPoi,
	formatStation,
	formatTime,
	formatLocation,
	formatRectangle,
	filters,

	journeyLeg: false,
	radar: false
}

module.exports = defaultProfile
