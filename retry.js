import retry from 'p-retry'
import {defaultProfile} from './lib/default-profile.js'

const retryDefaults = {
	retries: 3,
	factor: 3,
	minTimeout: 5 * 1000
}

const withRetrying = (profile, retryOpts = {}) => {
	retryOpts = Object.assign({}, retryDefaults, retryOpts)
	// https://github.com/public-transport/hafas-client/issues/76#issuecomment-574408717
	const {request} = {...defaultProfile, ...profile}

	const retryingRequest = (...args) => {
		const attempt = () => {
			return request(...args)
			.catch((err) => {
				if (err.isHafasError) throw err // continue
				if (err.code === 'ENOTFOUND') { // abort
					const abortErr = new retry.AbortError(err)
					Object.assign(abortErr, err)
					throw abortErr
				}
				throw err // continue
			})
		}
		return retry(attempt, retryOpts)
	}

	return {
		...profile,
		request: retryingRequest
	}
}

export {
	withRetrying,
}
