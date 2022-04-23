'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const stvProfile = require('../../p/stv')
const createValidate = require('./lib/validate-fptf-with')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
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
