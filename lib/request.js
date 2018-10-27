'use strict'

const DEV = process.env.NODE_ENV === 'dev'
const DEBUG = process.env.DEBUG === 'hafas-client'

const {randomBytes} = require('crypto')
const createHash = require('create-hash')
const captureStackTrace = DEV ? require('capture-stack-trace') : () => {}
const {stringify} = require('qs')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const {byErrorCode} = require('./errors')

const id = randomBytes(6).toString('hex')
const randomizeUserAgent = (userAgent) => {
	const i = Math.round(Math.random() * userAgent.length)
	return userAgent.slice(0, i) + id + userAgent.slice(i)
}

const md5 = input => createHash('md5').update(input).digest()

const addErrorInfo = (err, errorCode, errorText) => {
	if (byErrorCode[errorCode]) {
		Object.assign(err, byErrorCode[errorCode])
		if (errorCode) err.hafasErrorCode = errorCode
		if (errorText) err.hafasErrorMessage = errorText
	} else {
		err.code = errorCode || null
		err.message = errorText || errorCode || null
	}
}

const request = (profile, userAgent, opt, data) => {
	const body = profile.transformReqBody({
		lang: opt.language || 'en', // todo: is it `eng` actually?
		svcReqL: [data]
	})
	if (DEBUG) console.error(JSON.stringify(body))

	const req = profile.transformReq({
		method: 'post',
		// todo: CORS? referrer policy?
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, br, deflate',
			'Accept': 'application/json',
			'user-agent': randomizeUserAgent(userAgent)
		},
		redirect: 'follow',
		query: {}
	})

	if (profile.addChecksum || profile.addMicMac) {
		if (!Buffer.isBuffer(profile.salt)) {
			throw new Error('profile.salt must be a Buffer.')
		}
		if (profile.addChecksum) {
			const checksum = md5(Buffer.concat([
				Buffer.from(req.body, 'utf8'),
				profile.salt
			]))
			req.query.checksum = checksum.toString('hex')
		}
		if (profile.addMicMac) {
			const mic = md5(Buffer.from(req.body, 'utf8'))
			req.query.mic = mic.toString('hex')

			const micAsHex = Buffer.from(mic.toString('hex'), 'utf8')
			const mac = md5(Buffer.concat([micAsHex, profile.salt]))
			req.query.mac = mac.toString('hex')
		}
	}

	const url = profile.endpoint + '?' + stringify(req.query)

	// Async stack traces are not supported everywhere yet, so we create our own.
	const err = new Error()
	err.isHafasError = true // todo: rename to `isHafasClientError`
	err.request = body
	err.url = url
	captureStackTrace(err)

	return fetch(url, req)
	.then((res) => {
		err.statusCode = res.status
		if (!res.ok) {
			err.message = res.statusText
			throw err
		}
		return res.json()
	})
	.then((b) => {
		if (DEBUG) console.error(JSON.stringify(b))

		if (b.err && b.err !== 'OK') {
			addErrorInfo(err, b.err, b.errTxt)
			throw err
		}
		if (!b.svcResL || !b.svcResL[0]) {
			err.message = 'invalid response'
			throw err
		}
		if (b.svcResL[0].err !== 'OK') {
			addErrorInfo(err, b.svcResL[0].err, b.svcResL[0].errTxt)
			throw err
		}

		return profile.parseCommon(profile, opt, b.svcResL[0].res)
	})
}

module.exports = request
