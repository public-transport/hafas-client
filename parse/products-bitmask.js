'use strict'

const createParseBitmask = (bitmasks) => {
	const parseBitmask = (bitmask) => {
		const products = {}
		let i = 1
		do {
			products[bitmasks[i].product] = products[bitmasks[i].product] || !!(bitmask & i)
			i *= 2
		} while (bitmasks[i] && bitmasks[i].product)
		return products
	}
	return parseBitmask
}

module.exports = createParseBitmask
