import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as vvvProfile} from '../../p/vvv/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(vvvProfile.timezone, vvvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: vvvProfile.products,
	maxLatitude: 47.9504,
	maxLongitude: 17.0892,
	minLatitude: 45.7206,
	minLongitude: 7.8635,
}
const validate = createValidate(cfg)

const client = createClient(vvvProfile, 'public-transport/hafas-client:test')

const bregenzLandeskrankenhaus = '480195700'

tap.test('locations named "bregenz krankenhaus"', async (t) => {
	const locations = await client.locations('bregenz krankenhaus')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === bregenzLandeskrankenhaus || l.id === bregenzLandeskrankenhaus
	}), 'Bregenz Landeskrankenhaus not found')

	t.end()
})
