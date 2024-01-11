import {
	ACCESS_DENIED,
	INVALID_REQUEST,
	NOT_FOUND,
	SERVER_ERROR,
	HafasError,
	HafasAccessDeniedError,
	HafasInvalidRequestError,
	HafasNotFoundError,
	HafasServerError,
} from './errors.js';

// HAFAS ReST API documentation 1.23.30 (06.06.2019)
const byErrorCode = Object.assign(Object.create(null), {
	API_AUTH: {
		error: HafasAccessDeniedError,
		message: 'invalid or missing authentication data',
		props: {
			statusCode: 401,
		},
	},
	API_QUOTA: {
		error: HafasAccessDeniedError,
		message: 'quota exceeded for API key',
		props: {
			statusCode: 429,
		},
	},
	API_PARAM: {
		error: HafasInvalidRequestError,
		message: 'parameter missing or invalid', // todo: use HAFAS message
		props: {
		},
	},
	API_FORMAT: {
		error: HafasInvalidRequestError,
		message: 'requested response format not supported',
		props: {
			statusCode: 406,
		},
	},
	SVC_PARAM: {
		error: HafasInvalidRequestError,
		message: 'parameter missing or invalid', // todo: use HAFAS message
		props: {
		},
	},
	SVC_LOC: {
		error: HafasInvalidRequestError,
		message: 'location missing or invalid',
		props: {
		},
	},
	SVC_LOC_ARR: {
		error: HafasInvalidRequestError,
		message: 'destination location missing or invalid',
		props: {
		},
	},
	SVC_LOC_DEP: {
		error: HafasInvalidRequestError,
		message: 'origin location missing or invalid',
		props: {
		},
	},
	SVC_LOC_VIA: {
		error: HafasInvalidRequestError,
		message: 'change/via location missing or invalid',
		props: {
		},
	},
	SVC_LOC_EQUAL: {
		error: HafasInvalidRequestError,
		message: 'origin & destination locations are equal',
		props: {
		},
	},
	SVC_LOC_NEAR: {
		error: HafasInvalidRequestError,
		message: 'origin & destination are too near',
		props: {
		},
	},
	SVC_DATATIME: {
		error: HafasInvalidRequestError,
		message: 'date/time missing or invalid',
		props: {
		},
	},
	SVC_DATATIME_PERIOD: {
		error: HafasInvalidRequestError,
		message: 'date/time not in the timetable data or not allowed',
		props: {
		},
	},
	SVC_PROD: {
		error: HafasInvalidRequestError,
		message: 'products fields missing or invalid',
		props: {
		},
	},
	SVC_CTX: {
		error: HafasInvalidRequestError,
		message: 'context invalid',
		props: {
		},
	},
	SVC_FAILED_SEARCH: {
		error: HafasNotFoundError,
		message: 'search unsuccessful',
		props: {
		},
	},
	SVC_NO_RESULT: {
		error: HafasNotFoundError,
		message: 'no results found',
		props: {
		},
	},
	SVC_NO_MATCH: {
		error: HafasNotFoundError,
		message: 'no match found',
		props: {
		},
	},
	INT_ERR: {
		error: HafasServerError,
		message: 'internal error',
		props: {
		},
	},
	SOT_AT_DEST: {
		error: HafasInvalidRequestError,
		message: 'trip already arrived',
		props: {
		},
	},
	SOT_BEFORE_START: {
		error: HafasInvalidRequestError,
		message: 'trip hasn\'t started yet',
		props: {
		},
	},
	SOT_CANCELLED: {
		error: HafasInvalidRequestError,
		message: 'trip is cancelled',
		props: {
		},
	},
})

// todo: "server returned bogus data" error

export {
	// all from ./errors.js
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
