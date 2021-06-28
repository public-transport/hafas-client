'use strict'

const throttle = require('p-throttle')
const defaultProfile = require('./lib/default-profile')

const withThrottling = (profile, limit = 5, interval = 1000) => {
	// https://github.com/public-transport/hafas-client/issues/76#issuecomment-574408717
	const {request} = {...defaultProfile, ...profile}

	return {
		...profile,
		request: throttle({limit, interval})(request)
	}
}

module.exports = withThrottling
