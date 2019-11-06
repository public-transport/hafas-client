'use strict'

const slugg = require('slugg')

const createParseLine = (profile, opt, _) => {
	const byBitmask = []
	for (let product of profile.products) {
		for (let bitmask of product.bitmasks) {
			byBitmask[bitmask] = product
		}
	}

	const parseLine = (p) => {
		const name = p.name ? p.name.replace(/\s+/g, ' ') : null
		const res = {
			type: 'line',
			// This is terrible, but FPTF demands an ID.
			id: name && slugg(name.trim()) || null,
			fahrtNr: p.num || null,
			name,
			public: true
		}
		// todo: what is p.catCode?

		// todo: ICEs seem to have a catCode of 0
		const catCode = parseInt(p.catCode)
		if (!Number.isNaN(catCode)) {
			const product = byBitmask[catCode]
			res.mode = product && product.mode || null
			res.product = product && product.id || null
		}

		if (p.operator) res.operator = p.operator

		return res
	}
	return parseLine
}

module.exports = createParseLine
