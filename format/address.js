'use strict'

const formatCoord = require('./coord')

const formatAddress = (a) => {
	if (!a.type !== 'location' || !a.latitude || !a.longitude || !a.address) {
		throw new Error('invalid address')
	}

	return {
		type: 'A',
		name: a.name,
		crd: {
			x: formatCoord(a.longitude),
			y: formatCoord(a.latitude)
		}
	}
}

module.exports = formatAddress
