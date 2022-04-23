'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const ivbProfile = require('../../p/ivb')
const createValidate = require('./lib/validate-fptf-with')

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
