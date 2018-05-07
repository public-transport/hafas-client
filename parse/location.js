'use strict'

const POI = 'P'
const STATION = 'S'
const ADDRESS = 'A'

// todo: what is s.rRefL?
// todo: is passing in profile necessary?

// todo: [breaking] change to createParseLocation(profile, lines) => (l) => loc
const parseLocation = (profile, l, lines) => {
	const res = {type: 'location'}
	if (l.crd) {
		res.latitude = l.crd.y / 1000000
		res.longitude = l.crd.x / 1000000
	}

	if (l.type === STATION) {
		const station = {
			type: 'station',
			id: l.extId,
			name: l.name ? profile.parseStationName(l.name) : null,
			location: 'number' === typeof res.latitude ? res : null
		}

		if ('pCls' in l) station.products = profile.parseProducts(l.pCls)

		if (Array.isArray(l.pRefL) && Array.isArray(lines)) {
			station.lines = []
			for (let pRef of l.pRefL) {
				const line = lines[pRef]
				if (line) station.lines.push(line)
			}
		}

		return station
	}

	if (l.type === ADDRESS) res.address = l.name
	else res.name = l.name
	if (l.type === POI) res.id = l.extId

	return res
}

module.exports = parseLocation
