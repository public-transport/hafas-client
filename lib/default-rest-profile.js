import {basename} from 'path'
import {defaultProfile} from './default-profile.js'
import {request} from './rest-request.js'

const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')
const logRequest = DEBUG
	? (_, req, reqId) => {
		const url = new URL(req.url)
		console.error(basename(url.pathname) + url.search)
	}
	: () => {}
const logResponse = DEBUG
	? (_, res, body, reqId) => console.error(body)
	: () => {}

const defaultRestProfile = {
	...defaultProfile,

	request,
	logRequest,
	logResponse,
}

export {
	defaultRestProfile,
}
