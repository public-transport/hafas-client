'use strict'

const formatLocation = (profile, l, name = 'location') => {
	if ('string' === typeof l) return profile.formatStation(l)
	if ('object' === typeof l && !Array.isArray(l)) {
		if (l.type === 'station' || l.type === 'stop') {
			return profile.formatStation(l.id)
		}
		if (l.poi) return profile.formatPoi(l)
		if ('string' === typeof l.address) return profile.formatAddress(l)
		if (!l.type) throw new Error(`missing ${name}.type`)
		throw new Error(`invalid ${name}.type: ${l.type}`)
	}
	throw new Error(name + ': valid station, address or poi required.')
}

module.exports = formatLocation
