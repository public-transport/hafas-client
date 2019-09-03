import {defaultRestProfile} from './lib/default-rest-profile.js'
import {validateProfile} from './lib/validate-profile.js'

const isNonEmptyString = str => 'string' === typeof str && str.length > 0

const createRestClient = (profile, token, userAgent) => {
	profile = {
		...defaultRestProfile,
		...profile
	}
	validateProfile(profile)
	if (!isNonEmptyString(profile.endpoint)) throw new Error('missing profile.endpoint')
	if (!isNonEmptyString(token)) throw new Error('missing token')
	if (!isNonEmptyString(userAgent)) throw new Error('missing userAgent')

	const request = async (method, opt, query = {}) => {
		// todo
	}

	const client = {
	}
	Object.defineProperty(client, 'profile', {value: profile})
	return client
}

export {
	createRestClient,
}
