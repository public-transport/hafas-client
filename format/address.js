'use strict'

const formatCoord = require('./coord')

const formatAddress = (latitude, longitude, name) => {
	if (!latitude || !longitude || !name) throw new Error('invalid address.')
	return {
		type: 'A',
		name,
		crd: {
			x: formatCoord(longitude),
			y: formatCoord(latitude)
		}
	}
}

module.exports = formatAddress
