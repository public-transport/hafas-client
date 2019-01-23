'use strict'

const formatLocationFilter = (stops, addresses, poi) => {
	if (stops && addresses && poi) return 'ALL'
	return (stops ? 'S' : '') + (addresses ? 'A' : '') + (poi ? 'P' : '')
}

module.exports = formatLocationFilter
