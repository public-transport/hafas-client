const ACCESS_DENIED = 'ACCESS_DENIED'
const INVALID_REQUEST = 'INVALID_REQUEST'
const NOT_FOUND = 'NOT_FOUND'
const SERVER_ERROR = 'SERVER_ERROR'

class HafasError extends Error {
	constructor (cleanMessage, hafasCode, props) {
		const msg = hafasCode
			? hafasCode + ': ' + cleanMessage
			: cleanMessage
		super(msg)

		// generic props
		this.isHafasError = true

		// error-specific props
		this.code = null
		// By default, we take the blame, unless we know for sure.
		this.isCausedByServer = false
		this.hafasCode = hafasCode
		Object.assign(this, props)

		return this
	}
}

class HafasAccessDeniedError extends HafasError {
	constructor (cleanMessage, hafasCode, props) {
		super(cleanMessage, hafasCode, props)
		this.code = ACCESS_DENIED
		return this
	}
}

class HafasInvalidRequestError extends HafasError {
	constructor (cleanMessage, hafasCode, props) {
		super(cleanMessage, hafasCode, props)
		this.code = INVALID_REQUEST
		return this
	}
}

class HafasNotFoundError extends HafasError {
	constructor (cleanMessage, hafasCode, props) {
		super(cleanMessage, hafasCode, props)
		this.code = NOT_FOUND
		return this
	}
}

class HafasServerError extends HafasError {
	constructor (cleanMessage, hafasCode, props) {
		super(cleanMessage, hafasCode, props)
		this.code = SERVER_ERROR
		this.isCausedByServer = true
		return this
	}
}

const byErrorCode = Object.assign(Object.create(null), {
	H_UNKNOWN: {
		Error: HafasError,
		message: 'unknown internal error',
		props: {
			shouldRetry: true,
		},
	},
	AUTH: {
		Error: HafasAccessDeniedError,
		message: 'invalid or missing authentication data',
		props: {
		},
	},
	METHOD_NA: {
		Error: HafasServerError,
		message: 'method is not enabled',
		props: {
		},
	},
	R0001: {
		Error: HafasInvalidRequestError,
		message: 'unknown method',
		props: {
		},
	},
	R0002: {
		Error: HafasInvalidRequestError,
		message: 'invalid or missing request parameters',
		props: {
		},
	},
	R0007: {
		Error: HafasServerError,
		message: 'internal communication error',
		props: {
			shouldRetry: true,
		},
	},
	R5000: {
		Error: HafasAccessDeniedError,
		message: 'access denied',
		props: {
		},
	},
	S1: {
		Error: HafasServerError,
		message: 'journeys search: a connection to the backend server couldn\'t be established',
		props: {
			shouldRetry: true,
		},
	},
	LOCATION: {
		Error: HafasNotFoundError,
		message: 'location/stop not found',
		props: {
		},
	},
	NO_MATCH: {
		Error: HafasNotFoundError,
		message: 'no results found',
		props: {
		},
	},
	PARAMETER: {
		Error: HafasInvalidRequestError,
		message: 'invalid parameter',
		props: {
		},
	},
	H390: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: departure/arrival station replaced',
		props: {
		},
	},
	H410: {
		// todo: or is it a client error?
		Error: HafasServerError,
		message: 'journeys search: incomplete response due to timetable change',
		props: {
		},
	},
	H455: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: prolonged stop',
		props: {
		},
	},
	H460: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: stop(s) passed multiple times',
		props: {
		},
	},
	H500: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: too many trains, connection is not complete',
		props: {
		},
	},
	H890: {
		Error: HafasNotFoundError,
		message: 'journeys search unsuccessful',
		props: {
			shouldRetry: true,
		},
	},
	H891: {
		Error: HafasNotFoundError,
		message: 'journeys search: no route found, try with an intermediate stations',
		props: {
		},
	},
	H892: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: query too complex, try less intermediate stations',
		props: {
		},
	},
	H895: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: departure & arrival are too near',
		props: {
		},
	},
	H899: {
		// todo: or is it a client error?
		Error: HafasServerError,
		message: 'journeys search unsuccessful or incomplete due to timetable change',
		props: {
		},
	},
	H900: {
		// todo: or is it a client error?
		Error: HafasServerError,
		message: 'journeys search unsuccessful or incomplete due to timetable change',
		props: {
		},
	},
	H9220: {
		Error: HafasNotFoundError,
		message: 'journeys search: no stations found close to the address',
		props: {
		},
	},
	H9230: {
		Error: HafasServerError,
		message: 'journeys search: an internal error occured',
		props: {
			shouldRetry: true,
		},
	},
	H9240: {
		Error: HafasNotFoundError,
		message: 'journeys search unsuccessful',
		props: {
			shouldRetry: true,
		},
	},
	H9250: {
		Error: HafasServerError,
		message: 'journeys search: leg query interrupted',
		props: {
			shouldRetry: true,
		},
	},
	H9260: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: unknown departure station',
		props: {
		},
	},
	H9280: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: unknown intermediate station',
		props: {
		},
	},
	H9300: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: unknown arrival station',
		props: {
		},
	},
	H9320: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: the input is incorrect or incomplete',
		props: {
		},
	},
	H9360: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: invalid date/time',
		props: {
		},
	},
	H9380: {
		Error: HafasInvalidRequestError,
		message: 'journeys search: departure/arrival/intermediate station defined more than once',
		props: {
		},
	},
	SQ001: {
		Error: HafasServerError,
		message: 'no departures/arrivals data available',
		props: {
		},
	},
	SQ005: {
		Error: HafasNotFoundError,
		message: 'no trips found',
		props: {
		},
	},
	TI001: {
		Error: HafasServerError,
		message: 'no trip info available',
		props: {
			shouldRetry: true,
		},
	}
})

export {
	ACCESS_DENIED,
	INVALID_REQUEST,
	NOT_FOUND,
	SERVER_ERROR,
	HafasError,
	HafasAccessDeniedError,
	HafasInvalidRequestError,
	HafasNotFoundError,
	HafasServerError,
	byErrorCode,
}
