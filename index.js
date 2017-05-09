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
	onOperator: parse.operator
}



const request = (opt) => {
	opt = Object.assign({}, defaults, opt)

	return (data) => {
		const body = opt.onBody({lang: 'en', svcReqL: [data]})
		const req = opt.onReq({
			json: true, body: JSON.stringify(body),
			headers: {
				'Content-Type':    'application/json',
				'Accept-Encoding': 'gzip, deflate',
				'user-agent': 'https://github.com/derhuerst/hafas-client'
			}
		})

		return got.post(opt.endpoint, req)
		.then((res) => {
			const b = res.body

			if (b.err) throw new Error(b.err)
			if (!b.svcResL || !b.svcResL[0]) throw new Error('invalid response')
			if (b.svcResL[0].err !== 'OK') throw new Error(b.svcResL[0].errTxt)
			const d = b.svcResL[0].res
			const c = d.common || {}

			if (Array.isArray(c.locL)) d.locations = c.locL.map(opt.onLocation)
			if (Array.isArray(c.prodL)) d.products = c.prodL.map(opt.onProduct)
			if (Array.isArray(c.remL)) d.remarks = c.remL.map(opt.onRemark)
			if (Array.isArray(c.opL)) d.operators = c.opL.map(opt.onOperator)
			return d
		}).catch((err) => {throw err})
	}
}

module.exports = request
