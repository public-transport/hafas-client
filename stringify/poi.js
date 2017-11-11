'use strict'

const stringifyCoord = require('./coord')

const stringifyPoi = (latitude, longitude, id, name) => {
	if (!latitude || !longitude || !id || !name) throw new Error('invalid poi.')
	return {
		type: 'P',
		name,
		lid: 'L=' + id,
		crd: {
			x: stringifyCoord(longitude),
			y: stringifyCoord(latitude)
		}
	}
}

module.exports = stringifyPoi
