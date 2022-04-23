'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const salzburgProfile = require('../../p/salzburg')
const createValidate = require('./lib/validate-fptf-with')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(salzburgProfile.timezone, salzburgProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: salzburgProfile.products,
	maxLatitude: 47.9504,
	maxLongitude: 17.0892,
	minLatitude: 45.7206,
	minLongitude: 7.8635,
}
const validate = createValidate(cfg)

const client = createClient(salzburgProfile, 'public-transport/hafas-client:test')

const salzburgGaswerkgasse = '455001300'

tap.test('locations named "gaswerkgasse"', async (t) => {
	const locations = await client.locations('gaswerkgasse')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === salzburgGaswerkgasse || l.id === salzburgGaswerkgasse
	}), 'Salzburg Gaswerkgasse not found')

	t.end()
})
