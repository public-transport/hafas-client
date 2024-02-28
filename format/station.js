'use strict'

const formatLocationIdentifier = require('./location-identifier')

const formatStation = (id) => {
	return {
		type: 'S', // station
		// todo: name necessary?
		lid: formatLocationIdentifier({
			A: '1', // station?
			L: id
			// todo: `p` – timestamp of when the ID was obtained
		})
	}
}

module.exports = formatStation
