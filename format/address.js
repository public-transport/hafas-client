'use strict'

const formatCoord = require('./coord')

const formatAddress = (a) => {
	// todo: type-checking, better error msgs
	if (!a.latitude || !a.longitude || !a.name) throw new Error('invalid address.')

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
