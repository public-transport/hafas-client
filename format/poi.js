'use strict'

const formatCoord = require('./coord')

const formatPoi = (latitude, longitude, id, name) => {
	if (!latitude || !longitude || !id || !name) throw new Error('invalid poi.')
	return {
		type: 'P',
		name,
		lid: 'L=' + id,
		crd: {
			x: formatCoord(longitude),
			y: formatCoord(latitude)
		}
	}
}

module.exports = formatPoi
