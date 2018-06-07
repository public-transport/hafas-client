'use strict'

const createHash = require('create-hash')
let captureStackTrace = () => {}
if (process.env.NODE_DEBUG === 'hafas-client') {
	captureStackTrace = require('capture-stack-trace')
}
const {stringify} = require('query-string')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})

const md5 = input => createHash('md5').update(input).digest()

const request = (profile, data) => {
	const body = profile.transformReqBody({lang: 'en', svcReqL: [data]})
	const req = profile.transformReq({
		method: 'post',
		// todo: CORS? referrer policy?
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, deflate',
			'Accept': 'application/json',
			'user-agent': 'https://github.com/public-transport/hafas-client'
		},
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
	err.isHafasError = true
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
		if (b.err) {
			err.message = b.err
			throw err
		}
		if (!b.svcResL || !b.svcResL[0]) {
			err.message = 'invalid response'
			throw err
		}
		if (b.svcResL[0].err !== 'OK') {
			err.message = b.svcResL[0].errTxt || b.svcResL[0].err
			throw err
		}
		const d = b.svcResL[0].res
		const c = d.common || {}

		if (Array.isArray(c.remL)) {
			d.remarks = c.remL.map(rem => profile.parseRemark(profile, rem))
		}
		if (Array.isArray(c.opL)) {
			d.operators = c.opL.map(op => profile.parseOperator(profile, op))
		}
		if (Array.isArray(c.prodL)) {
			const parse = profile.parseLine(profile, d.operators)
			d.lines = c.prodL.map(parse)
		}
		if (Array.isArray(c.locL)) {
			const parse = loc => profile.parseLocation(profile, loc, d.lines)
			d.locations = c.locL.map(parse)
		}
		return d
	})
}

module.exports = request
