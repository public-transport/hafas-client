'use strict'

const ACCESS_DENIED = 'ACCESS_DENIED'
const INVALID_REQUEST = 'INVALID_REQUEST'
const NOT_FOUND = 'NOT_FOUND'
const SERVER_ERROR = 'SERVER_ERROR'

// https://gist.github.com/derhuerst/79d49c0f04c1c192a5d15756e5af575f/edit
const byErrorCode = Object.assign(Object.create(null), {
	AUTH: {
		isClient: true,
		code: ACCESS_DENIED,
		message: 'invalid or missing authentication data'
	},
	R0001: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'unknown method'
	},
	R0002: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'invalid or missing request parameters'
	},
	R0007: {
		isServer: true,
		code: SERVER_ERROR,
		message: 'internal communication error'
	},
	R5000: {
		isClient: true,
		code: ACCESS_DENIED,
		message: 'access denied'
	},
	S1: {
		isServer: true,
		code: SERVER_ERROR,
		message: 'journeys search: a connection to the backend server couldn\'t be established'
	},
	LOCATION: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'location/stop not found'
	},
	H390: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: departure/arrival station replaced'
	},
	H410: {
		// todo: or is it a client error?
		// todo: statusCode?
		isServer: true,
		code: SERVER_ERROR,
		message: 'journeys search: incomplete response due to timetable change'
	},
	H455: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: prolonged stop'
	},
	H460: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: stop(s) passed multiple times'
	},
	H500: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: too many trains, connection is not complete'
	},
	H890: {
		isClient: true,
		code: NOT_FOUND,
		message: 'journeys search unsuccessful'
	},
	H891: {
		isClient: true,
		code: NOT_FOUND,
		message: 'journeys search: no route found, try with an intermediate stations'
	},
	H892: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: query too complex, try less intermediate stations'
	},
	H895: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: departure & arrival are too near'
	},
	H899: {
		// todo: or is it a client error?
		// todo: statusCode?
		isServer: true,
		code: SERVER_ERROR,
		message: 'journeys search unsuccessful or incomplete due to timetable change'
	},
	H900: {
		// todo: or is it a client error?
		// todo: statusCode?
		isServer: true,
		code: SERVER_ERROR,
		message: 'journeys search unsuccessful or incomplete due to timetable change'
	},
	H9220: {
		isClient: true,
		code: NOT_FOUND,
		message: 'journeys search: no stations found close to the address'
	},
	H9230: {
		isServer: true,
		code: SERVER_ERROR,
		message: 'journeys search: an internal error occured'
	},
	H9240: {
		isClient: true,
		code: NOT_FOUND,
		message: 'journeys search unsuccessful'
	},
	H9250: {
		isServer: true,
		code: SERVER_ERROR,
		message: 'journeys search: leg query interrupted'
	},
	H9260: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: unknown departure station'
	},
	H9280: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: unknown intermediate station'
	},
	H9300: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: unknown arrival station'
	},
	H9320: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: the input is incorrect or incomplete'
	},
	H9360: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: error in a data field'
	},
	H9380: {
		isClient: true,
		code: INVALID_REQUEST,
		message: 'journeys search: departure/arrival/intermediate station defined more than once'
	},
	SQ001: {
		isServer: true,
		code: SERVER_ERROR,
		message: 'no departures/arrivals data available'
	},
	SQ005: {
		isClient: true,
		code: NOT_FOUND,
		message: 'no trips found'
	},
	TI001: {
		isServer: true,
		code: SERVER_ERROR,
		message: 'no trip info available'
	}
})

module.exports = {
	ACCESS_DENIED,
	INVALID_REQUEST,
	NOT_FOUND,
	SERVER_ERROR,
	byErrorCode
}
