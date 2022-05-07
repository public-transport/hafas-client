import tap from 'tap'

import {createWhen} from './lib/util.js'
import {createClient} from '../../index.js'
import {profile as blsProfile} from '../../p/bls/index.js'
import {createValidateFptfWith as createValidate} from './lib/validate-fptf-with.js'
import {testJourneysStationToAddress} from './lib/journeys-station-to-address.js'

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(blsProfile.timezone, blsProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: blsProfile.products,
	minLatitude: 45.3184,
	minLongitude: 4.4604,
	maxLatitude: 47.2969,
	maxLongitude: 7.8607,
}

const validate = createValidate(cfg)

const client = createClient(blsProfile, 'public-transport/hafas-client:test')

const bernDennigkofengässli = '8590093'

tap.test('Dennigkofengässli to Schänzlihalde', async (t) => {
	const schänzlihalde = {
		type: 'location',
		id: '990017698',
		address: 'Bern, Schänzlihalde 17',
		latitude: 46.952835,
		longitude: 7.447527,
	}

	const res = await client.journeys(bernDennigkofengässli, schänzlihalde, {
		results: 3,
		departure: when,
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: bernDennigkofengässli,
		to: schänzlihalde,
	})
	t.end()
})
