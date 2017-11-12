'use strict'

const formatCoord = require('./coord')

const formatPoi = (p) => {
	// todo: type-checking, better error msgs
	if (!p.latitude || !p.longitude || !p.id || !p.name) throw new Error('invalid poi.')

	return {
		type: 'P',
		name: p.name,
		lid: 'L=' + p.id,
		crd: {
			x: formatCoord(p.longitude),
			y: formatCoord(p.latitude)
		}
	}
}

module.exports = formatPoi
