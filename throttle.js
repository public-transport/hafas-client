'use strict'

const throttle = require('p-throttle')

const withThrottling = (profile, limit = 5, interval = 1000) => {
	const {request} = profile

	return {
		...profile,
		request: throttle(request, limit, interval)
	}
}

module.exports = withThrottling
