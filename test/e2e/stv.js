import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as stvProfile} from '../../p/stv/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'

const T_MOCK = 1671260400 * 1000 // 2022-12-17T08:00:00+01:00
const when = createWhen(stvProfile.timezone, stvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: stvProfile.products,
	maxLatitude: 47.9504,
	maxLongitude: 18.347,
	minLatitude: 46.127,
	minLongitude: 7.8635,
}
const validate = createValidate(cfg)

const client = createClient(stvProfile, 'public-transport/hafas-client:test')

const grazSonnenhang = '460413500'

tap.test('locations named "sonnenhang"', async (t) => {
	const locations = await client.locations('sonnenhang')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === grazSonnenhang || l.id === grazSonnenhang
	}), 'Graz Sonnenhang not found')

	t.end()
})
