'use strict'

const crypto = require('crypto')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const {stringify} = require('query-string')

const hafasError = (err) => {
	err.isHafasError = true
	return err
}

const md5 = input => crypto.createHash('md5').update(input).digest()

const request = (profile, data) => {
	const body = profile.transformReqBody({lang: 'en', svcReqL: [data]})
	const req = profile.transformReq({
		method: 'post',
		// todo: CORS? referrer policy?
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, deflate',
			'user-agent': 'https://github.com/derhuerst/hafas-client'
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

	const url = profile.endpoint +'?' + stringify(req.query)
	return fetch(url, req)
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw hafasError(err)
		}
		return res.json()
	})
	.then((b) => {
		if (b.err) throw hafasError(new Error(b.err))
		if (!b.svcResL || !b.svcResL[0]) throw new Error('invalid response')
		if (b.svcResL[0].err !== 'OK') {
			throw hafasError(new Error(b.svcResL[0].errTxt))
		}
		const d = b.svcResL[0].res
		const c = d.common || {}

		if (Array.isArray(c.locL)) {
			d.locations = c.locL.map(loc => profile.parseLocation(profile, loc))
		}
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
		return d
	})
}

module.exports = request
