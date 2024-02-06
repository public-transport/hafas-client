// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {parseCommonData as parseCommon} from '../parse/common.js';
import {defaultProfile} from '../lib/default-profile.js';
const res = require('./fixtures/db-netz-remarks.json');

const profile = {
	...defaultProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	products: [
		{id: 'a', bitmasks: [1, 2, 4, 8], name: 'A'},
		{id: 'b', bitmasks: [16, 32, 64, 128], name: 'B'},
		{id: 'c', bitmasks: [256, 512], name: 'C'},
	],
};

const opt = {
	remarks: true,
};

tap.test('parseCommon parses a DB Netz response properly', (t) => {
	const {warnings} = profile.parseCommon({profile, opt, res});
	t.pass('parsed without throwing');
	const warning = warnings.find(w => w.id === 'HIM_FREETEXT_447862');

	t.same(warning, {
		id: 'HIM_FREETEXT_447862',
		type: 'warning',
		summary: 'Abweichung Fpl f Zmst BKRW - NEB nur nach Gl101',
		text: 'Brückenarbeiten NKK// BKAR S-Bahn  BrüArb Pankgrafenstraße -  BKAR nur Gl101 für die NEB nutzbar / 59047 Po 2.2 in Bln-Karow S-B Bft',
		icon: {type: 'HIM11307', title: null},
		priority: 80,
		category: 1,
		products: {a: true, b: true, c: true},
		edges: [{
			dir: 3,
			icoCrd: {x: 13469131, y: 52614672, type: 'WGS84'},
			msgRefL: [3, 7, 17, 18, 20, 21],
			icon: {type: 'HIM11216', title: null},
			fromLocation: {
				type: 'stop',
				id: '8011046',
				name: 'Berlin-Karow (BKAR)',
				location: {
					type: 'location',
					id: '8011046',
					latitude: 52.614672,
					longitude: 13.469131,
				},
				products: {a: true, b: false, c: true},
			},
			toLocation: {
				type: 'stop',
				id: '8011046',
				name: 'Berlin-Karow (BKAR)',
				location: {
					type: 'location',
					id: '8011046',
					latitude: 52.614672,
					longitude: 13.469131,
				},
				products: {a: true, b: false, c: true},
			},
		}],
		events: [{
			fromLocation: {
				type: 'stop',
				id: '8011046',
				name: 'Berlin-Karow (BKAR)',
				location: {
					type: 'location',
					id: '8011046',
					latitude: 52.614672,
					longitude: 13.469131,
				},
				products: {a: true, b: false, c: true},
			},
			toLocation: {
				type: 'stop',
				id: '8011046',
				name: 'Berlin-Karow (BKAR)',
				location: {
					type: 'location',
					id: '8011046',
					latitude: 52.614672,
					longitude: 13.469131,
				},
				products: {a: true, b: false, c: true},
			},
			start: '2020-01-11T00:00:00+01:00',
			end: '2020-04-03T23:59:00+02:00',
			sections: ['6500'],
		}],
		validFrom: '2019-12-15T00:00:00+01:00',
		validUntil: '2020-05-29T04:00:00+02:00',
		modified: '2019-10-26T04:09:19+02:00',
	});
	t.end();
});
