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
		const name = p.line || p.addName || p.name || null // wtf
		const res = {
			type: 'line',
			// This is terrible, but FPTF demands an ID. Let's pray for HAFAS.
			id: (
				p.prodCtx && p.prodCtx.lineId && slugg(p.prodCtx.lineId.trim())
				|| name && slugg(name.trim())
				|| null
			),
			// todo: what is p.prodCtx.matchId? use as `id`? expose it.
			fahrtNr: p.prodCtx && p.prodCtx.num || null,
			name,
			public: true
		}
		// todo: what is p.number?
		// todo: what is p.prodCtx.catCode?

		if ('cls' in p) {
			// todo: what if `p.cls` is the sum of two bitmasks?
			const product = byBitmask[parseInt(p.cls)]
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
