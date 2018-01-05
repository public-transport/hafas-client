'use strict'

const slugg = require('slugg')

// todo: are p.number and p.line ever different?
const createParseLine = (profile, operators) => {
	const parseLine = (p) => {
		if (!p) return null // todo: handle this upstream
		const res = {
			type: 'line',
			id: null,
			name: p.line || p.name,
			public: true
		}

		// We don't get a proper line id from the API, so we use the trip nr here.
		// todo: find a better way
		if (p.prodCtx && p.prodCtx.num) res.id = p.prodCtx.num
		// This is terrible, but FPTF demands an ID. Let's pray for VBB to expose an ID.
		else if (p.line) res.id = slugg(p.line.trim())
		else if (p.name) res.id = slugg(p.name.trim())

		if (p.cls) res.class = p.cls
		if (p.prodCtx && p.prodCtx.catCode !== undefined) {
			res.productCode = +p.prodCtx.catCode
		}

		// todo: parse mode, remove from profiles

		if ('number' === typeof p.oprX) {
			res.operator = operators[p.oprX] || null
		}

		return res
	}
	return parseLine
}

module.exports = createParseLine
