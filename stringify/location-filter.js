'use strict'

const stringifyLocationFilter = (stations, addresses, poi) => {
	if (stations && addresses && poi) return 'ALL'
	return (stations ? 'S' : '') + (addresses ? 'A' : '') + (poi ? 'P' : '')
}

module.exports = stringifyLocationFilter
