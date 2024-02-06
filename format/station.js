import {formatLocationIdentifier} from './location-identifier.js';

const formatStation = (id) => {
	return {
		type: 'S', // station
		// todo: name necessary?
		lid: formatLocationIdentifier({
			A: '1', // station?
			L: id,
			// todo: `p` – timestamp of when the ID was obtained
		}),
	};
};

export {
	formatStation,
};
