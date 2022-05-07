import {request} from '../lib/request.js'

import {formatStationBoardReq} from '../format/station-board-req.js'
import {formatLocationsReq} from '../format/locations-req.js'
import {formatStopReq} from '../format/stop-req.js'
import {formatNearbyReq} from '../format/nearby-req.js'
import {formatTripReq} from '../format/trip-req.js'
import {formatRadarReq} from '../format/radar-req.js'
import {formatReachableFromReq} from '../format/reachable-from-req.js'
import {formatRefreshJourneyReq} from '../format/refresh-journey-req.js'
import {formatRemarksReq} from '../format/remarks-req.js'
import {formatLinesReq} from '../format/lines-req.js'

import {parseDateTime} from '../parse/date-time.js'
import {parsePlatform} from '../parse/platform.js'
import {parseBitmask as parseProductsBitmask} from '../parse/products-bitmask.js'
import {parseIcon} from '../parse/icon.js'
import {parseWhen} from '../parse/when.js'
import {parsePrognosisType} from '../parse/prognosis-type.js'
import {parseScheduledDays} from '../parse/scheduled-days.js'
import {parseDeparture} from '../parse/departure.js'
import {parseArrival} from '../parse/arrival.js'
import {parseTrip} from '../parse/trip.js'
import {parseJourneyLeg} from '../parse/journey-leg.js'
import {parseJourney} from '../parse/journey.js'
import {parseLine} from '../parse/line.js'
import {parseLocation} from '../parse/location.js'
import {parseCommonData as parseCommon} from '../parse/common.js'
import {parsePolyline} from '../parse/polyline.js'
import {parseMovement} from '../parse/movement.js'
import {parseNearby} from '../parse/nearby.js'
import {parseOperator} from '../parse/operator.js'
import {parseHint} from '../parse/hint.js'
import {parseWarning} from '../parse/warning.js'
import {parseStopover} from '../parse/stopover.js'

import {formatAddress} from '../format/address.js'
import {formatCoord} from '../format/coord.js'
import {formatDate} from '../format/date.js'
import {formatLocationFilter} from '../format/location-filter.js'
import {formatProductsFilter} from '../format/products-filter.js'
import {formatPoi} from '../format/poi.js'
import {formatStation} from '../format/station.js'
import {formatTime} from '../format/time.js'
import {formatLocation} from '../format/location.js'
import {formatRectangle} from '../format/rectangle.js'
import * as filters from '../format/filters.js'

const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')
const logRequest = DEBUG
	? (_, req, reqId) => console.error(req.body + '')
	: () => {}
const logResponse = DEBUG
	? (_, res, body, reqId) => console.error(body)
	: () => {}

const id = (ctx, x) => x

const defaultProfile = {
	request,
	transformReqBody: id,
	transformReq: id,
	salt: null,
	addChecksum: false,
	addMicMac: false,
	randomizeUserAgent: true,
	logRequest,
	logResponse,

	formatStationBoardReq,
	formatLocationsReq,
	formatStopReq,
	formatNearbyReq,
	formatTripReq,
	formatRadarReq,
	formatReachableFromReq,
	formatRefreshJourneyReq,
	formatRemarksReq,
	formatLinesReq,
	transformJourneysQuery: id,

	parseDateTime,
	parsePlatform,
	parseProductsBitmask,
	parseIcon,
	parseWhen,
	parsePrognosisType,
	parseScheduledDays,
	parseDeparture,
	parseArrival,
	parseTrip,
	parseJourneyLeg,
	parseJourney,
	parseLine,
	parseStationName: (_, name) => name,
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
	formatProductsFilter,
	formatPoi,
	formatStation,
	formatTime,
	formatLocation,
	formatRectangle,
	filters,

	journeysOutFrwd: true,  // `journeys()` method: support for `outFrwd` field?
	// todo: https://github.com/KDE/kpublictransport/commit/c7c54304160d8f22eab0c91812a107aca82304b7

	// `departures()` method: support for `getPasslist` field?
	departuresGetPasslist: false,
	// `departures()` method: support for `stbFltrEquiv` field?
	departuresStbFltrEquiv: false,

	trip: false,
	radar: false,
	refreshJourney: true,
	// refreshJourney(): use `outReconL[]` instead of `ctxRecon`?
	refreshJourneyUseOutReconL: false,
	tripsByName: true,
	remarks: true,
	// `remarks()` method: support for `getPolyline` field?
	remarksGetPolyline: true, // `remarks()` method: support for `getPolyline` field?
	lines: true,
}

export {
	defaultProfile,
}
