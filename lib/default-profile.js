'use strict'

const parseDateTime = require('../parse/date-time')
const parseDeparture = require('../parse/departure')
const parseArrival = require('../parse/arrival')
const parseJourneyLeg = require('../parse/journey-leg')
const parseJourney = require('../parse/journey')
const parseLine = require('../parse/line')
const parseLocation = require('../parse/location')
const parseCommon = require('../parse/common')
const parsePolyline = require('../parse/polyline')
const parseMovement = require('../parse/movement')
const parseNearby = require('../parse/nearby')
const parseOperator = require('../parse/operator')
const parseHint = require('../parse/hint')
const parseWarning = require('../parse/warning')
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
	addMicMac: false,

	transformReqBody: id,
	transformReq: id,

	transformJourneysQuery: id,

	parseDateTime,
	parseDeparture,
	parseArrival,
	parseJourneyLeg,
	parseJourney,
	parseLine,
	parseStationName: id,
	parseLocation,
	parseCommon,
	parsePolyline,
	parseMovement,
	parseNearby,
	parseOperator,
	parseHint,
	parseWarning,
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

	journeysNumF: true, // `journeys()` method: support for `numF` field?
	departuresGetPasslist: true, // `departures()` method: support for `getPasslist` field?
	departuresStbFltrEquiv: true, // `departures()` method: support for `stbFltrEquiv` field?
	trip: false,
	radar: false,
	refreshJourney: true
}

module.exports = defaultProfile
