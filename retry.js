'use strict'

const retry = require('p-retry')

const _request = require('./lib/request')

const retryDefaults = {
	retries: 3,
	factor: 3,
	minTimeout: 5 * 1000
}

const withRetrying = (createClient, retryOpts = {}) => {
	retryOpts = Object.assign({}, retryDefaults, retryOpts)

	const createRetryingClient = (profile, userAgent, opt = {}) => {
		const request = 'request' in opt ? opt.request : _request

		const retryingRequest = (profile, userAgent, opt, data) => {
			const attempt = () => {
				return request(profile, userAgent, opt, data)
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

		return createClient(profile, userAgent, {
			...opt,
			request: retryingRequest
		})
	}
	return createRetryingClient
}

module.exports = withRetrying
