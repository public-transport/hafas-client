import tap from 'tap';

import {createWhen} from './lib/util.js';
import {createClient} from '../../index.js';
import {profile as salzburgProfile} from '../../p/salzburg/index.js';
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js';

const T_MOCK = 1671260400 * 1000; // 2022-12-17T08:00:00+01:00
const when = createWhen(salzburgProfile.timezone, salzburgProfile.locale, T_MOCK);

const cfg = {
	when,
	stationCoordsOptional: false,
	products: salzburgProfile.products,
	maxLatitude: 47.9504,
	maxLongitude: 17.0892,
	minLatitude: 45.7206,
	minLongitude: 7.8635,
};
const validate = createValidate(cfg);

const client = createClient(salzburgProfile, 'public-transport/hafas-client:test');

const salzburgGaswerkgasse = '455001300';

tap.test('locations named "gaswerkgasse"', async (t) => {
	const locations = await client.locations('gaswerkgasse');

	validate(t, locations, 'locations', 'locations');
	t.ok(locations.some((l) => {
		return l.station && l.station.id === salzburgGaswerkgasse || l.id === salzburgGaswerkgasse;
	}), 'Salzburg Gaswerkgasse not found');

	t.end();
});
