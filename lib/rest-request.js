import {fetchFromHafas} from './fetch.js'
import {byErrorCode} from './rest-exe-errors.js'
import {createFindInTree as findInTree} from './find-in-tree.js'

const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')

const request = async (ctx, userAgent, method, query) => {
	const {profile, opt, token} = ctx

	const req = profile.transformReq(ctx, {
		// todo: CORS? referrer policy?
		query: {
			lang: opt.language || 'en',
			...query,
		},
		headers: {
			'Authorization': 'Bearer ' + token,
		},
	})
	if (DEBUG) console.error(JSON.stringify(req.query))

	const resource = profile.endpoint + method
	const {
		res,
		body,
		errProps,
	} = await fetchFromHafas(ctx, userAgent, resource, req, {
		throwIfNotOk: false,
	})

	if (DEBUG) console.error(JSON.stringify(body))

	if (!res.ok) {
		// todo: parse HTML error messages
		const err = new Error(res.statusText)
		Object.assign(err, errProps)

		const {errorCode, errorText} = body
		if (errorCode && byErrorCode[errorCode]) {
			Object.assign(err, byErrorCode[errorCode])
			err.hafasErrorCode = errorCode
			if (errorText) err.hafasErrorMessage = errorText
		} else {
			err.message = errorText
			err.code = errorCode
		}

		throw err
	}

	// todo: sometimes it returns a body without any data
	// e.g. `location.nearbystops` with an invalid `type`

	return {
		res: body,
	}
}

export {
	request,
}
