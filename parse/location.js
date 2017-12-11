'use strict'

const POI = 'P'
const STATION = 'S'
const ADDRESS = 'A'

// todo: what is s.rRefL?
// todo: is passing in profile necessary?
const parseLocation = (profile, l) => {
	const res = {type: 'location'}
	if (l.crd) {
		res.latitude = l.crd.y / 1000000
		res.longitude = l.crd.x / 1000000
	}

	if (l.type === STATION) {
		const station = {
			type: 'station',
			id: l.extId,
			name: l.name,
			location: res
		}
		if ('pCls' in l) station.products = profile.parseProducts(l.pCls)
		return station
	}

	if (l.type === POI) res.id = l.extId
	else if (l.type === ADDRESS) res.address = l.name
	else res.name = l.name

	return res
}

module.exports = parseLocation
