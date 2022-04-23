'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const oövvProfile = require('../../p/ooevv')
const createValidate = require('./lib/validate-fptf-with')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(oövvProfile.timezone, oövvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: oövvProfile.products,
	maxLatitude: 49.7921,
	maxLongitude: 17.0892,
	minLatitude: 45.7206,
	minLongitude: 7.8635,
}
const validate = createValidate(cfg)

const client = createClient(oövvProfile, 'public-transport/hafas-client:test')

const linzTheatergasse = '444670100'

tap.test('locations named "theatergasse"', async (t) => {
	const locations = await client.locations('theatergasse')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === linzTheatergasse || l.id === linzTheatergasse
	}), 'Linz Theatergasse not found')

	t.end()
})
