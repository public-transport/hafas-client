'use strict'

const formatLocationFilter = (stations, addresses, poi) => {
	if (stations && addresses && poi) return 'ALL'
	return (stations ? 'S' : '') + (addresses ? 'A' : '') + (poi ? 'P' : '')
}

module.exports = formatLocationFilter
