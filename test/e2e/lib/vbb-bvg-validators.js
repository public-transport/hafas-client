'use strict'

const a = require('assert')
const products = require('../../../p/bvg/products')

const {createWhen} = require('./util')
const {
	station: createValidateStation,
	line: createValidateLine,
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

const _validateLine = createValidateLine(cfg)
const validateLine = (validate, l, name) => {
	_validateLine(validate, l, name)
	if (l.symbol !== null) {
		a.strictEqual(typeof l.symbol, 'string', name + '.symbol must be a string')
		a.ok(l.symbol, name + '.symbol must not be empty')
	}
	if (l.nr !== null) {
		a.strictEqual(typeof l.nr, 'number', name + '.nr must be a string')
		a.ok(l.nr, name + '.nr must not be empty')
	}
	if (l.metro !== null) {
		a.strictEqual(typeof l.metro, 'boolean', name + '.metro must be a boolean')
	}
	if (l.express !== null) {
		a.strictEqual(typeof l.express, 'boolean', name + '.express must be a boolean')
	}
	if (l.night !== null) {
		a.strictEqual(typeof l.night, 'boolean', name + '.night must be a boolean')
	}
}

const validateJourneyLeg = createValidateJourneyLeg(cfg)

const validateDeparture = createValidateDeparture(cfg)

const validateMovement = createValidateMovement(cfg)

module.exports = {
	cfg,
	validateStation,
	validateLine,
	validateJourneyLeg,
	validateDeparture,
	validateMovement
}
