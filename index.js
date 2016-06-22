'use strict'

const got = require('got')
const parse = require('./parse')



const onData = (d) => {
	if (!d.common) return d
	const c = d.common
	if (Array.isArray(c.locL)) d.locations = c.locL.map(parse.location)
	if (Array.isArray(c.prodL)) d.locations = c.prodL.map(parse.product)
	if (Array.isArray(c.remL)) d.locations = c.remL.map(parse.remark)
	if (Array.isArray(c.opL)) d.locations = c.opL.map(parse.agency)
	return d
}

const request = (cfg) => (data) => {
	let body = {lang: 'en', svcReqL: [data]}
	if (cfg.onBody) body = cfg.onBody(body)

	let req = {
		json: true, body: JSON.stringify(body),
		headers: {
			'Content-Type':    'application/json',
			'Accept-Encoding': 'gzip, deflate'
		}
	}
	if (cfg.req) req = cfg.req(req)

	return got.post(cfg.endpoint, req)
	.then((res) => {
		if (res.body.err) return new Error(res.body.err)
		if (!res.body.svcResL || !res.body.svcResL[0]) return new Error('invalid response')
		const data = res.body.svcResL[0]
		if (data.err !== 'OK') return new Error(data.errTxt)
		return cfg.onData || onData(data.res)
	}).catch(console.error)
}

module.exports = request
