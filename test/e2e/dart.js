'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const dartProfile = require('../../p/dart')
const createValidate = require('./lib/validate-fptf-with')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(dartProfile.timezone, dartProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: dartProfile.products,
	maxLatitude: 45.391,
	maxLongitude: -88.176,
	minLatitude: 37.745,
	minLongitude: -96.877,
}
const validate = createValidate(cfg)

const client = createClient(dartProfile, 'public-transport/hafas-client:test')

const mlkJrParkwayAdamsAve = '951013488' // MARTIN LUTHER KING JR PKWY/ADAMS AVE

tap.test('locations named "martin luther kind adams"', async (t) => {
	const locations = await client.locations('martin luther kind adams')

	validate(t, locations, 'locations', 'locations')
	t.ok(locations.some((l) => {
		return l.station && l.station.id === mlkJrParkwayAdamsAve || l.id === mlkJrParkwayAdamsAve
	}), '"MARTIN LUTHER KING JR PKWY/ADAMS AVE" not found')

	t.end()
})
