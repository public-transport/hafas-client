'use strict'

const a = require('assert')
const {defaultValidators} = require('validate-fptf')
const validateRef = require('validate-fptf/lib/reference')
const validateDate = require('validate-fptf/lib/date')

const {isValidWhen} = require('./util')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)
const is = val => val !== null && val !== undefined

const createValidateStation = (cfg) => {
	const validateStation = (validate, s, name = 'station') => {
		defaultValidators.station(validate, s, name)

		if (!cfg.stationCoordsOptional) {
			a.ok(is(s.location), `missing ${name}.location`)
		}
		a.ok(isObj(s.products), name + '.products must be an object')
		for (let product of cfg.products) {
			const msg = name + `.products[${product.id}] must be a boolean`
			a.strictEqual(typeof s.products[product.id], 'boolean', msg)
		}

		if ('lines' in s) {
			a.ok(Array.isArray(s.lines), name + `.lines must be an array`)
			for (let i = 0; i < s.lines.length; i++) {
				validate(['line'], s.lines[i], name + `.lines[${i}]`)
			}
		}
	}
	return validateStation
}

const validatePoi = (validate, poi, name = 'location') => {
	defaultValidators.location(validate, poi, name)
	validateRef(poi.id, name + '.id')
	a.ok(poi.name, name + '.name must not be empty')
}

const validateAddress = (validate, addr, name = 'location') => {
	defaultValidators.location(validate, addr, name)
	a.strictEqual(typeof addr.address, 'string', name + '.address must be a string')
	a.ok(addr.address, name + '.address must not be empty')
}

const validateLocation = (validate, loc, name = 'location') => {
	a.ok(isObj(loc), name + ' must be an object')
	if (loc.type === 'station') validate(['station'], loc, name)
	else if ('id' in loc) validatePoi(validate, loc, name)
	else validateAddress(validate, loc, name)
}

const createValidateLine = (cfg) => {
	const validLineModes = []
	for (let product of cfg.products) {
		if (!validLineModes.includes(product.mode)) {
			validLineModes.push(product.mode)
		}
	}

	const validateLine = (validate, line, name = 'line') => {
		defaultValidators.line(validate, line, name)
		a.ok(validLineModes.includes(line.mode))
	}
	return validateLine
}

const createValidateStopover = (cfg) => {
	const validateStopover = (validate, s, name = 'stopover') => {
		if (is(s.arrival)) {
			validateDate(s.arrival, name + '.arrival')
			a.ok(isValidWhen(s.arrival, cfg.when), name + '.arrival is invalid')
		}
		if (is(s.departure)) {
			validateDate(s.departure, name + '.departure')
			a.ok(isValidWhen(s.departure, cfg.when), name + '.departure is invalid')
		}
		if (!is(s.arrival) && !is(s.departure)) {
			asser.fail(name + ' contains neither arrival nor departure')
		}

		if (is(s.arrivalDelay)) {
			const msg = name + '.arrivalDelay must be a number'
			a.strictEqual(typeof s.arrivalDelay, 'number', msg)
		}
		if (is(s.departureDelay)) {
			const msg = name + '.departureDelay must be a number'
			a.strictEqual(typeof s.departureDelay, 'number', msg)
		}

		validate(['station'], s.station, name + '.station')
	}
	return validateStopover
}

const validateTicket = (validate, ti, name = 'ticket') => {
	a.strictEqual(typeof ti.name, 'string', name + '.name must be a string')
	a.ok(ti.name, name + '.name must not be empty')

	if (is(ti.price)) {
		a.strictEqual(typeof ti.price, 'number', name + '.price must be a number')
		a.ok(ti.price > 0, name + '.price must be >0')
	}
	if (is(ti.amount)) {
		a.strictEqual(typeof ti.amount, 'number', name + '.amount must be a number')
		a.ok(ti.amount > 0, name + '.amount must be >0')
	}

	// todo: move to VBB tests
	if ('bike' in ti) {
		a.strictEqual(typeof ti.bike, 'boolean', name + '.bike must be a boolean')
	}
	if ('shortTrip' in ti) {
		a.strictEqual(typeof ti.shortTrip, 'boolean', name + '.shortTrip must be a boolean')
	}
	if ('group' in ti) {
		a.strictEqual(typeof ti.group, 'boolean', name + '.group must be a boolean')
	}
	if ('fullDay' in ti) {
		a.strictEqual(typeof ti.fullDay, 'boolean', name + '.fullDay must be a boolean')
	}
	if ('tariff' in ti) {
		a.strictEqual(typeof ti.tariff, 'string', name + '.tariff must be a string')
		a.ok(ti.tariff, name + '.tariff must not be empty')
	}
	if ('coverage' in ti) {
		a.strictEqual(typeof ti.coverage, 'string', name + '.coverage must be a string')
		a.ok(ti.coverage, name + '.coverage must not be empty')
	}
	if ('variant' in ti) {
		a.strictEqual(typeof ti.variant, 'string', name + '.variant must be a string')
		a.ok(ti.variant, name + '.variant must not be empty')
	}
}

const createValidateJourneyLeg = (cfg) => {
	const validateJourneyLeg = (validate, leg, name = 'journeyLeg') => {
		const withFakeScheduleAndOperator = Object.assign({
			schedule: 'foo', // todo: let hafas-client parse a schedule ID
			operator: 'bar' // todo: let hafas-client parse the operator
		}, leg)
		defaultValidators.journeyLeg(validate, withFakeScheduleAndOperator, name)

		if (leg.arrival !== null) {
			const msg = name + '.arrival is invalid'
			a.ok(isValidWhen(leg.arrival, cfg.when), msg)
		}
		if (leg.departure !== null) {
			const msg = name + '.departure is invalid'
			a.ok(isValidWhen(leg.departure, cfg.when), msg)
		}

		if ('passed' in leg) {
			a.ok(Array.isArray(leg.passed), name + '.passed must be an array')
			a.ok(leg.passed.length > 0, name + '.passed must not be empty')

			for (let i = 0; i < leg.passed.length; i++) {
				validate('stopover', leg.passed[i], name + `.passed[${i}]`)
			}
		}
	}
	return validateJourneyLeg
}

const validateJourney = (validate, j, name = 'journey') => {
	const withFakeId = Object.assign({
		id: 'foo' // todo: let hafas-client parse a journey ID
	}, j)
	defaultValidators.journey(validate, withFakeId, name)

	if ('tickets' in j) {
		a.ok(Array.isArray(j.tickets), name + '.tickets must be an array')
		a.ok(j.tickets.length > 0, name + '.tickets must not be empty')

		for (let i = 0; i < j.tickets.length; i++) {
			validate(['ticket'], j.tickets[i], name + `.tickets[${i}]`)
		}
	}
}

module.exports = {
	station: createValidateStation,
	location: () => validateLocation,
	poi: () => validatePoi,
	address: () => validateAddress,
	line: createValidateLine,
	stopover: createValidateStopover,
	ticket: () => validateTicket,
	journeyLeg: createValidateJourneyLeg,
	journey: () => validateJourney
}
