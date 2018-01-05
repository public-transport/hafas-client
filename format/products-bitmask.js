'use strict'

const createFormatBitmask = (modes) => {
	const formatBitmask = (products) => {
		let bitmask = 0
		for (let product in products) {
			if (products[product] === true) bitmask += modes[product].bitmask
		}
		return bitmask
	}
	return formatBitmask
}

module.exports = createFormatBitmask
