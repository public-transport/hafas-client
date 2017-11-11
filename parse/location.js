'use strict'

const types = Object.create(null)
types.P = 'poi'
types.S = 'station'
types.A = 'address'

// todo: what is s.rRefL?
const parseLocation = (l) => {
	const type = types[l.type] || 'unknown'
	const result = {
		type,
		name: l.name,
		coordinates: l.crd ? {
			latitude: l.crd.y / 1000000,
			longitude: l.crd.x / 1000000
		} : null
	}

	if (type === 'poi' || type === 'station') result.id = l.extId
	if ('pCls' in l) result.products = l.pCls

	return result
}

module.exports = parseLocation
