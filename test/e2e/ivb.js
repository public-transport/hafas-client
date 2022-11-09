import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as ivbProfile} from '../../p/ivb/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(ivbProfile.timezone, ivbProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: ivbProfile.products,
	maxLatitude: 47.9504,
	maxLongitude: 17.0892,
	minLatitude: 45.7206,
	minLongitude: 7.8635,
}
const validate = createValidate(cfg)

const client = createClient(ivbProfile, 'public-transport/hafas-client:test')

const innsbruckGriesauweg = '476162400'

tap.test('locations named "griesauweg"', async (t) => {
	const locations = await client.locations('griesauweg')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === innsbruckGriesauweg || l.id === innsbruckGriesauweg
	}), 'Innsbruck Griesauweg not found')

	t.end()
})
