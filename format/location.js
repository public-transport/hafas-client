'use strict'

const formatLocation = (profile, l) => {
	if ('string' === typeof l) return profile.formatStation(l)
	if ('object' === typeof l) {
		if (l.type === 'station') return profile.formatStation(l.id)
		if (l.type === 'poi') return profile.formatPoi(l)
		if (l.type === 'address') return profile.formatAddress(l)
		throw new Error('invalid location type: ' + l.type)
	}
	throw new Error('valid station, address or poi required.')
}

module.exports = formatLocation
