'use strict'

const a = require('assert')
const products = require('../../../p/bvg/products')

const {createWhen} = require('./util')
const {
	station: createValidateStation,
	journeyLeg: createValidateJourneyLeg,
	departure: createValidateDeparture,
	movement: createValidateMovement
} = require('./validators')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen('Europe/Berlin', 'de-DE', T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

// todo: coordsOptional = false
const validateStation = createValidateStation(cfg)

const validateJourneyLeg = createValidateJourneyLeg(cfg)

const validateDeparture = createValidateDeparture(cfg)

const validateMovement = createValidateMovement(cfg)

module.exports = {
	cfg,
	validateStation,
	validateJourneyLeg,
	validateDeparture,
	validateMovement
}
