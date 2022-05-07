import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as kvbProfile} from '../../p/kvb/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(kvbProfile.timezone, kvbProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: kvbProfile.products,
	maxLatitude: 51.6479,
	maxLongitude: 7.8333,
	minLatitude: 50.3253,
	minLongitude: 6.2320,
}
const validate = createValidate(cfg)

const client = createClient(kvbProfile, 'public-transport/hafas-client:test')

const heumarkt = '900000001'

tap.test('locations named "heumarkt"', async (t) => {
	const locations = await client.locations('heumarkt')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === heumarkt || l.id === heumarkt
	}), 'Heumarkt not found')

	t.end()
})
