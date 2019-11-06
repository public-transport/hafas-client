import {basename} from 'path'
import {defaultProfile} from './default-profile.js'
import {request} from './rest-request.js'
import {parseWhen} from '../parse-rest/when.js'
import {parseLocation, parseLocationsResult} from '../parse-rest/location.js'
import {parsePolyline} from '../parse-rest/polyline.js'
import {parseLine} from '../parse-rest/line.js'
import {parseHint} from '../parse-rest/hint.js'
import {parseStopover} from '../parse-rest/stopover.js'
import {parseArrival, parseDeparture} from '../parse-rest/arrival-or-departure.js'
import {formatDate} from '../format-rest/date.js'
import {formatTime} from '../format-rest/time.js'

const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')
const logRequest = DEBUG
	? (_, req, reqId) => {
		const url = new URL(req.url)
		console.error(basename(url.pathname) + url.search)
	}
	: () => {}
const logResponse = DEBUG
	? (_, res, body, reqId) => console.error(body)
	: () => {}

const defaultRestProfile = {
	...defaultProfile,

	request,
	logRequest,
	logResponse,

	parseWhen,
	parseLocation, parseLocationsResult,
	parsePolyline,
	parseLine,
	parseHint,
	parseStopover,
	parseArrival, parseDeparture,

	formatDate,
	formatTime,
}

export {
	defaultRestProfile,
}
