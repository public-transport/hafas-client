'use strict'

const createParseBitmask = (profile) => {
	const defaultProducts = {}
	let withBitmask = []
	for (let product of profile.products) {
		defaultProducts[product.id] = false
		for (let bitmask of product.bitmasks) {
			withBitmask.push([bitmask, product])
		}
	}
	withBitmask.sort((a, b) => b[0] - a[0]) // descending

	const parseBitmask = (bitmask) => {
		const res = Object.assign({}, defaultProducts)

		for (let [pBitmask, product] of withBitmask) {
			if ((pBitmask & bitmask) > 0) {
				res[product.id] = true
				bitmask -= pBitmask
			}
		}

		return res
	}
	return parseBitmask
}

module.exports = createParseBitmask
