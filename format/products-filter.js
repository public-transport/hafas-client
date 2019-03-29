'use strict'

const isObj = require('lodash/isObject')

const hasProp = (o, k) => Object.prototype.hasOwnProperty.call(o, k)

const createFormatProductsFilter = (profile) => {
	const byProduct = {}
	const defaultProducts = {}
	for (let product of profile.products) {
		byProduct[product.id] = product
		defaultProducts[product.id] = product.default
	}

	const formatProductsFilter = (filter) => {
		if (!isObj(filter)) throw new TypeError('products filter must be an object')
		filter = Object.assign({}, defaultProducts, filter)

		let res = 0, products = 0
		for (let product in filter) {
			if (!hasProp(filter, product) || filter[product] !== true) continue
			if (!byProduct[product]) throw new TypeError('unknown product ' + product)
			products++
			for (let bitmask of byProduct[product].bitmasks) res = res ^ bitmask
		}
		if (products === 0) throw new Error('no products used')

		return {
			type: 'PROD',
			mode: 'INC',
			value: res + ''
		}
	}
	return formatProductsFilter
}

module.exports = createFormatProductsFilter
