'use strict'

const throttle = require('p-throttle')

const _request = require('./lib/request')

const withThrottling = (createClient, limit = 5, interval = 1000) => {
	const createThrottledClient = (profile, userAgent, request = _request) => {
		const throttledRequest = throttle(request, limit, interval)
		return createClient(profile, userAgent, throttledRequest)
	}
	return createThrottledClient
}

module.exports = withThrottling
