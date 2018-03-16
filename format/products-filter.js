'use strict'

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)
const hasProp = (o, k) => Object.prototype.hasOwnProperty.call(o, k)

const createFormatProductsFilter = (profile) => {
	const byProduct = {}
	const defaultProducts = {}
	for (let product of profile.products) {
		byProduct[product.id] = product
		defaultProducts[product.id] = product.default
	}

	const formatProductsFilter = (filter) => {
		if (!isObj(filter)) throw new Error('products filter must be an object')
		filter = Object.assign({}, defaultProducts, filter)

		let res = 0
		for (let product in filter) {
			if (!hasProp(filter, product) || filter[product] !== true) continue
			if (!byProduct[product]) throw new Error('unknown product ' + product)
			for (let bitmask of byProduct[product].bitmasks) res += bitmask
		}

		return {
			type: 'PROD',
			mode: 'INC',
			value: res + ''
		}
	}
	return formatProductsFilter
}

module.exports = createFormatProductsFilter
