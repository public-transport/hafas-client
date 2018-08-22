'use strict'

const slugg = require('slugg')

const createParseLine = (profile, opt, {operators}) => {
	const byBitmask = []
	for (let product of profile.products) {
		for (let bitmask of product.bitmasks) {
			byBitmask[bitmask] = product
		}
	}

	const parseLine = (p) => {
		if (!p) return null // todo: handle this upstream
		const res = {
			type: 'line',
			id: null,
			fahrtNr: p.prodCtx && p.prodCtx.num || null,
			name: p.line || p.name,
			public: true
		}
		// todo: what is p.prodCtx && p.prodCtx.num?
		// todo: what is p.number?

		// This is terrible, but FPTF demands an ID. Let's pray for HaCon to expose an ID.
		// todo: find a better way
		if (p.line) res.id = slugg(p.line.trim())
		else if (p.name) res.id = slugg(p.name.trim())

		if (p.cls) res.class = p.cls
		if (p.prodCtx && p.prodCtx.catCode !== undefined) {
			res.productCode = +p.prodCtx.catCode
		}

		if ('class' in res) {
			// todo: what if `res.class` is the sum of two bitmasks?
			const product = byBitmask[parseInt(res.class)]
			res.mode = product && product.mode || null
			res.product = product && product.id || null
		}

		if ('number' === typeof p.oprX) {
			res.operator = operators[p.oprX] || null
		}

		return res
	}
	return parseLine
}

module.exports = createParseLine
