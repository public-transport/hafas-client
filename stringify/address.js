'use strict'

const stringifyCoord = require('./coord')

const stringifyAddress = (latitude, longitude, name) => {
	if (!latitude || !longitude || !name) throw new Error('invalid address.')
	return {
		type: 'A',
		name,
		crd: {
			x: stringifyCoord(longitude),
			y: stringifyCoord(latitude)
		}
	}
}

module.exports = stringifyAddress
