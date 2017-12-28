'use strict'

const createFormatBitmask = (modes) => {
	const formatBitmask = (products) => {
		if(Object.keys(products).length === 0) throw new Error('products filter must not be empty')
		let bitmask = 0
		for (let product in products) {
			if (products[product] === true) bitmask += modes[product].bitmask
		}
		return bitmask
	}
	return formatBitmask
}

module.exports = createFormatBitmask
