import {formatLocationIdentifier} from './location-identifier.js'
import {formatCoord} from './coord.js'

const formatAddress = (a) => {
	if (a.type !== 'location' || !a.latitude || !a.longitude || !a.address) {
		throw new TypeError('invalid address')
	}

	const data = {
		A: '2', // address?
		O: a.address,
		X: formatCoord(a.longitude),
		Y: formatCoord(a.latitude)
	}
	if (a.id) data.L = a.id
	return {
		type: 'A', // address
		name: a.address,
		lid: formatLocationIdentifier(data)
	}
}

export {
	formatAddress,
}
