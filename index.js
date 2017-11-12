'use strict'

const defaultProfile = require('./lib/default-profile')
const request = require('./lib/request')

const createClient = (profile) => {
	profile = Object.assign({}, defaultProfile, profile)
	if ('string' !== typeof profile.timezone) {
		throw new Error('profile.timezone must be a string.')
	}

	const client = data => request(profile, data)
	return client
}

module.exports = createClient
