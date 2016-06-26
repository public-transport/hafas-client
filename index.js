'use strict'

const got = require('got')
const parse = require('./parse')



const id = (x) => x
const defaults = {
	onBody:     id,
	onReq:      id,
	onLocation: parse.location,
	onProduct:  parse.product,
	onRemark:   parse.remark,
	onAgency:   parse.agency
}



const request = (opt) => {
	opt = Object.assign({}, defaults, opt)

	return (data) => {
		const body = opt.onBody({lang: 'en', svcReqL: [data]})
		const req = opt.onReq({
			json: true, body: JSON.stringify(body),
			headers: {
				'Content-Type':    'application/json',
				'Accept-Encoding': 'gzip, deflate'
			}
		})

		return got.post(opt.endpoint, req)
		.then((res) => {
			const b = res.body

			if (b.err) return new Error(b.err)
			if (!b.svcResL || !b.svcResL[0]) return new Error('invalid response')
			if (b.svcResL[0].err !== 'OK') return new Error(b.svcResL[0].errTxt)
			const d = b.svcResL[0].res
			const c = d.common || {}

			if (Array.isArray(c.locL)) d.locations = c.locL.map(opt.onLocation)
			if (Array.isArray(c.prodL)) d.products = c.prodL.map(opt.onProduct)
			if (Array.isArray(c.remL)) d.remarks = c.remL.map(opt.onRemark)
			if (Array.isArray(c.opL)) d.agencies = c.opL.map(opt.onAgency)
			return d
		}).catch((err) => err)
	}
}

module.exports = request
