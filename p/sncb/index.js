import {strictEqual as eql} from 'assert';
import {parseHook} from '../../lib/profile-hooks.js';
import {parseLine} from '../../parse/line.js';
import baseProfile from './base.js';
import {products} from './products.js';

// todo: this is ugly
const lineNameWithoutFahrtNr = ({parsed}) => {
	const {name, fahrtNr} = parsed;
	if (!name || !fahrtNr || !(/s\d/i).test(name)) {
		return parsed;
	}
	const i = name.indexOf(fahrtNr);
	if (i < 0) {
		return parsed;
	}

	if (
		(/\s/).test(name[i - 1] || '') // space before
		&& name.length === i + fahrtNr.length // nothing behind
	) {
		return {
			...parsed,
			name: name.slice(0, i - 1) + name.slice(i + fahrtNr.length + 1),
		};
	}
	return parsed;
};
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'THA 123', fahrtNr: '123'},
}).name, 'THA 123');
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1 123', fahrtNr: '123'},
}).name, 'S1');
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1-123', fahrtNr: '123'},
}).name, 'S1-123');
eql(lineNameWithoutFahrtNr({
	parsed: {name: 'S1 123a', fahrtNr: '123'},
}).name, 'S1 123a');

const profile = {
	...baseProfile,
	locale: 'fr-BE',
	timezone: 'Europe/Brussels',

	products,

	parseLine: parseHook(parseLine, lineNameWithoutFahrtNr),

	trip: true,
	refreshJourney: true,
	radar: true,
	reachableFrom: true,
};

export {
	profile,
};
