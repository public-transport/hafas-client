'use strict'

const stations = require('vbb-stations-autocomplete')
const a = require('assert')
const shorten = require('vbb-short-station-name')
const products = require('../../../p/bvg/products')

const {createWhen} = require('./util')
const {
	station: createValidateStation,
	line: createValidateLine,
	journeyLeg: createValidateJourneyLeg,
	departure: createValidateDeparture,
	movement: createValidateMovement
} = require('./validators')

const when = createWhen('Europe/Berlin', 'de-DE')

const cfg = {
	when,
	stationCoordsOptional: false,
	products
}

const validateDirection = (dir, name) => {
	if (!stations(dir, true, false)[0]) {
		console.error(name + `: station "${dir}" is unknown`)
	}
}

// todo: coordsOptional = false
const _validateStation = createValidateStation(cfg)
const validateStation = (validate, s, name) => {
	_validateStation(validate, s, name)
	// todo: find station by ID
	a.equal(s.name, shorten(s.name), name + '.name must be shortened')
}

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

const _validateJourneyLeg = createValidateJourneyLeg(cfg)
const validateJourneyLeg = (validate, l, name) => {
	_validateJourneyLeg(validate, l, name)
	if (!l.walking) validateDirection(l.direction, name + '.direction')
}

const _validateDeparture = createValidateDeparture(cfg)
const validateDeparture = (validate, dep, name) => {
	_validateDeparture(validate, dep, name)
	validateDirection(dep.direction, name + '.direction')
}

const _validateMovement = createValidateMovement(cfg)
const validateMovement = (validate, m, name) => {
	_validateMovement(validate, m, name)
	validateDirection(m.direction, name + '.direction')
}

module.exports = {
	cfg,
	validateStation,
	validateLine,
	validateJourneyLeg,
	validateDeparture,
	validateMovement
}
