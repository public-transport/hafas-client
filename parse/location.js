'use strict'

const types = Object.create(null)
types.P = 'poi'
types.S = 'station'
types.A = 'address'

// todo: what is s.rRefL?
// todo: is passing in profile necessary?
const parseLocation = (profile, l) => {
	const type = types[l.type] || 'unknown'
	const res = {
		type,
		name: l.name,
		coordinates: l.crd ? {
			latitude: l.crd.y / 1000000,
			longitude: l.crd.x / 1000000
		} : null
	}

	if (type === 'poi' || type === 'station') res.id = l.extId
	if ('pCls' in l) res.products = l.pCls

	return res
}

module.exports = parseLocation
