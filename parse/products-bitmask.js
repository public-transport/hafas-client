'use strict'

const createParseBitmask = (allProducts, defaultProducts) => {
	allProducts = allProducts.sort((p1, p2) => p2.bitmask - p1.bitmask) // desc
	if (allProducts.length === 0) throw new Error('allProducts is empty.')
	for (let product of allProducts) {
		if ('string' !== typeof product.product) {
			throw new Error('allProducts[].product must be a string.')
		}
		if ('number' !== typeof product.bitmask) {
			throw new Error(product.product + '.bitmask must be a number.')
		}
	}

	const parseBitmask = (bitmask) => {
		const res = Object.assign({}, defaultProducts)

		for (let product of allProducts) {
			if (bitmask === 0) break
			if ((product.bitmask & bitmask) > 0) {
				res[product.product] = true
				bitmask -= product.bitmask
			}
		}

		return res
	}
	return parseBitmask
}

module.exports = createParseBitmask
