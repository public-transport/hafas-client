'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const vvvProfile = require('../../p/vvv')
const createValidate = require('./lib/validate-fptf-with')

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
