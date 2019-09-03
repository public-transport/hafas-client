'use strict'

const DEBUG = process.env.DEBUG === 'hafas-client'

const isNonEmptyString = str => 'string' === typeof str && str.length > 0

const createRestClient = (profile, token, userAgent) => {
	if (!isNonEmptyString(profile.endpoint)) throw new Error('missing profile.endpoint')
	if (!isNonEmptyString(token)) throw new Error('missing token')
	if (!isNonEmptyString(userAgent)) throw new Error('missing userAgent')

	const request = async (method, opt, query = {}) => {
		// todo
	}

	return {}
}

module.exports = createRestClient
