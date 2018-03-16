'use strict'

const createParseBitmask = (profile) => {
	const defaultProducts = {}
	let withBitmask = []
	for (let product of profile.products) {
		if ('string' !== typeof product.product) {
			throw new Error('profile.products[].product must be a string.')
		}

		defaultProducts[product.product] = false
		if (!Array.isArray(product.bitmasks)) {
			throw new Error(product.product + '.bitmasks must be an array.')
		}
		for (let bitmask of product.bitmasks) {
			if ('number' !== typeof bitmask) {
				throw new Error(product.product + '.bitmasks[] must be a number.')
			}
			withBitmask.push([bitmask, product])
		}
	}
	withBitmask.sort((a, b) => b[0] - a[0]) // descending

	const parseBitmask = (bitmask) => {
		const res = Object.assign({}, defaultProducts)

		for (let [pBitmask, product] of withBitmask) {
			if ((pBitmask & bitmask) > 0) {
				res[product.product] = true
				bitmask -= pBitmask
			}
		}

		return res
	}
	return parseBitmask
}

module.exports = createParseBitmask
