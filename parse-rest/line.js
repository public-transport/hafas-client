'use strict'

const slugg = require('slugg')

const parseLine = (ctx, p) => { // p = line
	const {profile} = ctx

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
		const product = profile.products.find(p => p.bitmasks.includes(catCode))
		res.mode = product && product.mode || null
		res.product = product && product.id || null
	}

	if (p.operator) res.operator = p.operator

	return res
}

module.exports = parseLine
