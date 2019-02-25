'use strict'

const DEV = process.env.NODE_ENV === 'dev'
const DEBUG = process.env.DEBUG === 'hafas-client'

const {join} = require('path')
const createHash = require('create-hash')
const captureStackTrace = DEV ? require('capture-stack-trace') : () => {}
const {stringify} = require('qs')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})

let id
try {
	id = require('../id.json')
} catch (err) {
	const p = join(__dirname, '..', 'id.json')
	console.error(`Failed to load the install-unique ID from ${p}.`)
	process.exit(1)
}

const randomizeUserAgent = (userAgent) => {
	const i = Math.round(Math.random() * userAgent.length)
	return userAgent.slice(0, i) + id + userAgent.slice(i)
}

const md5 = input => createHash('md5').update(input).digest()

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
			'Accept-Encoding': 'gzip, deflate',
			'Accept': 'application/json',
			'user-agent': randomizeUserAgent(userAgent)
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
		if (DEBUG) console.error(JSON.stringify(b))

		if (b.err && b.err !== 'OK') {
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

		if (Array.isArray(c.opL)) {
			d.operators = c.opL.map(op => profile.parseOperator(profile, op))
		}
		if (Array.isArray(c.prodL)) {
			const parse = profile.parseLine(profile, opt, {
				operators: d.operators
			})
			d.lines = c.prodL.map(parse)
		}
		if (Array.isArray(c.locL)) {
			const data = {lines: d.lines}
			const parse = loc => profile.parseLocation(profile, opt, data, loc)

			d.locations = c.locL.map(parse)
			for (let i = 0; i < d.locations.length; i++) {
				const raw = c.locL[i]
				const loc = d.locations[i]
				if ('number' === typeof raw.mMastLocX) {
					loc.station = Object.assign({}, d.locations[raw.mMastLocX])
					loc.station.type = 'station'
				} else if (raw.isMainMast) loc.type = 'station'
			}
		}

		d.hints = []
		if (opt.remarks && Array.isArray(c.remL)) {
			d.hints = c.remL.map(hint => profile.parseHint(profile, hint, {...c, ...d}))
		}
		d.warnings = []
		if (opt.remarks && Array.isArray(c.himL)) {
			d.warnings = c.himL.map(w => profile.parseWarning(profile, w, {...c, ...d}))
		}

		return d
	})
}

module.exports = request
