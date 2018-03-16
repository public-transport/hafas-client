'use strict'

const slugg = require('slugg')

const createParseLine = (profile, operators) => {
	const byBitmask = []
	for (let product of profile.products) {
		if ('string' !== typeof product.product) {
			throw new Error('profile.products[].product must be a string.')
		}
		if (!Array.isArray(product.bitmasks)) {
			throw new Error(product.product + '.bitmasks must be an array.')
		}
		for (let bitmask of product.bitmasks) {
			if ('number' !== typeof bitmask) {
				throw new Error(product.product + '.bitmasks[] must be a number.')
			}
			byBitmask[bitmask] = product
		}
	}

	const parseLine = (p) => {
		if (!p) return null // todo: handle this upstream
		const res = {
			type: 'line',
			id: null,
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
			const data = byBitmask[parseInt(res.class)]
			res.mode = data && data.mode || null
			res.product = data && data.product || null
		}

		if ('number' === typeof p.oprX) {
			res.operator = operators[p.oprX] || null
		}

		return res
	}
	return parseLine
}

module.exports = createParseLine
