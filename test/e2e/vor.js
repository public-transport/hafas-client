'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const vorProfile = require('../../p/vor')
const createValidate = require('./lib/validate-fptf-with')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(vorProfile.timezone, vorProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: vorProfile.products,
	maxLatitude: 47.9504,
	maxLongitude: 17.0892,
	minLatitude: 45.7206,
	minLongitude: 7.8635,
}
const validate = createValidate(cfg)

const client = createClient(vorProfile, 'public-transport/hafas-client:test')

const stPöltenLinzerTor = '431277900'

tap.test('locations named "linzer tor"', async (t) => {
	const locations = await client.locations('linzer tor')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === stPöltenLinzerTor || l.id === stPöltenLinzerTor
	}), 'St. Pölten Linzer Tor not found')

	t.end()
})
