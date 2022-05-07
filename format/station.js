import {formatLocationIdentifier} from './location-identifier.js'

const formatStation = (id) => {
	return {
		type: 'S', // station
		// todo: name necessary?
		lid: formatLocationIdentifier({
			A: '1', // station?
			L: id
		})
	}
}

export {
	formatStation,
}
