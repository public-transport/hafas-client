'use strict'

const got = require('got')

const request = (cfg) => (data) => {
	let req = {
		json: true,
		headers: {
			'Content-Type':    'application/json',
			'Accept-Encoding': 'gzip, deflate'
		},
		body: JSON.stringify({
			  client: cfg.client, ext: cfg.ext
			, ver: cfg.version, auth: cfg.auth
			, lang: 'en', svcReqL: [data]
		})
	}
	if (cfg.req) req = cfg.req(req)

	return got.post(cfg.endpoint, req)
	.then((res) => {
		if (res.body.err) return new Error(res.body.err)
		if (!res.body.svcResL || !res.body.svcResL[0]) return new Error('invalid response')
		const data = res.body.svcResL[0]
		if (data.err !== 'OK') return new Error(data.errTxt)
		return data.res
	}).catch(console.error)
}

module.exports = request
