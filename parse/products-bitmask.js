'use strict'

const createParseBitmask = (profile) => {
	const defaultProducts = {}
	for (let product of profile.products) defaultProducts[product.id] = false

	const parseBitmask = (bitmask) => {
		const res = Object.assign({}, defaultProducts)

		const bits = bitmask.toString(2).split('').map(i => parseInt(i)).reverse()
		for (let i = 0; i < bits.length; i++) {
			if (!bits[i]) continue // ignore `0`

			const product = profile.products.find(p => p.bitmasks.includes(Math.pow(2, i)))
			if (product) res[product.id] = true
		}
		return res
	}
	return parseBitmask
}

module.exports = createParseBitmask
