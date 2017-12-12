'use strict'

const formatCoord = require('./coord')

const formatPoi = (p) => {
	if (p.type !== 'location' || !p.latitude || !p.longitude || !p.id || !p.name) {
		throw new Error('invalid POI')
	}

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
