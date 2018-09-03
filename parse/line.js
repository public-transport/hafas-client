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
		const name = p.line || p.name || null
		const res = {
			type: 'line',
			// This is terrible, but FPTF demands an ID. Let's pray for HAFAS.
			id: (
				p.prodCtx && p.prodCtx.lineId && slugg(p.prodCtx.lineId.trim())
				|| name && slugg(name.trim())
				|| null
			),
			fahrtNr: p.prodCtx && p.prodCtx.num || null,
			name,
			public: true
		}
		// todo: what is p.number?

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
