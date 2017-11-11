'use strict'

const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const {stringify} = require('query-string')

const parseLocation = require('./parse/location')
const parseLine = require('./parse/line')
const parseRemark = require('./parse/remark')
const parseOperator = require('./parse/operator')



const id = (x) => x
const defaults = {
	onBody:     id,
	onReq:      id,
	parseLocation: parseLocation,
	parseLine: parseLine,
	parseRemark: parseRemark,
	parseOperator: parseOperator
}

const hafasError = (err) => {
	err.isHafasError = true
	return err
}

const createRequest = (opt) => {
	opt = Object.assign({}, defaults, opt)

	const request = (data) => {
		const body = opt.onBody({lang: 'en', svcReqL: [data]})
		const req = opt.onReq({
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'Accept-Encoding': 'gzip, deflate',
				'user-agent': 'https://github.com/derhuerst/hafas-client'
			},
			query: null
		})
		const url = opt.endpoint + (req.query ? '?' + stringify(req.query) : '')

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

			if (Array.isArray(c.locL)) d.locations = c.locL.map(opt.parseLocation)
			if (Array.isArray(c.prodL)) d.lines = c.prodL.map(opt.parseLine)
			if (Array.isArray(c.remL)) d.remarks = c.remL.map(opt.parseRemark)
			if (Array.isArray(c.opL)) d.operators = c.opL.map(opt.parseOperator)
			return d
		})
	}

	return request
}

module.exports = createRequest
