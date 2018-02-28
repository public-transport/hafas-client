'use strict'

const createFormatBitmask = (allProducts) => {
	const formatBitmask = (products) => {
		if(Object.keys(products).length === 0) throw new Error('products filter must not be empty')
		let bitmask = 0
		for (let product in products) {
			if (!allProducts[product]) throw new Error('unknown product ' + product)
			if (products[product] === true) bitmask += allProducts[product].bitmask
		}
		return bitmask
	}
	return formatBitmask
}

module.exports = createFormatBitmask
