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

const validateLocations = (validate, locs, name = 'locations') => {
	a.ok(Array.isArray(locs), name + ' must be an array')
	a.ok(locs.length > 0, name + ' must not be empty')
	for (let i = 0; i < locs.length; i++) {
		validate('location', locs[i], name + `[${i}]`)
	}
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
		if (leg.arrivalPlatform !== null) {
			const msg = name + '.arrivalPlatform must be a string'
			a.strictEqual(typeof leg.arrivalPlatform, 'string', msg)
			a.ok(leg.arrivalPlatform, name + '.arrivalPlatform must not be empty')
		}
		if (leg.departurePlatform !== null) {
			const msg = name + '.departurePlatform must be a string'
			a.strictEqual(typeof leg.departurePlatform, 'string', msg)
			a.ok(leg.departurePlatform, name + '.departurePlatform must not be empty')
		}

		if ('passed' in leg) {
			a.ok(Array.isArray(leg.passed), name + '.passed must be an array')
			a.ok(leg.passed.length > 0, name + '.passed must not be empty')

			for (let i = 0; i < leg.passed.length; i++) {
				validate('stopover', leg.passed[i], name + `.passed[${i}]`)
			}
		}

		if (leg.mode !== 'walking') {
			const msg = name + '.direction must be a string'
			a.strictEqual(typeof leg.direction, 'string', msg)
			a.ok(leg.direction, name + '.direction must not be empty')
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

const validateJourneys = (validate, js, name = 'journeys') => {
	a.ok(Array.isArray(js), name + ' must be an array')
	a.ok(js.length > 0, name + ' must not be empty')
	for (let i = 0; i < js.length; i++) {
		validate(['journey'], js[i], name + `[${i}]`)
	}
}

const createValidateDeparture = (cfg) => {
	const validateDeparture = (validate, dep, name = 'departure') => {
		a.ok(isObj(dep), name + ' must be an object')
		// todo: let hafas-client add a .type field

		a.strictEqual(typeof dep.journeyId, 'string', name + '.journeyId must be a string')
		a.ok(dep.journeyId, name + '.journeyId must not be empty')
		a.strictEqual(typeof dep.trip, 'number', name + '.trip must be a number')

		validate(['station'], dep.station, name + '.station')

		a.ok(isValidWhen(dep.when, cfg.when), name + '.when is invalid')
		if (dep.delay !== null) {
			const msg = name + '.delay must be a number'
			a.strictEqual(typeof dep.delay, 'number', msg)
		}

		validate(['line'], dep.line, name + '.line')
		a.strictEqual(typeof dep.direction, 'string', name + '.direction must be a string')
		a.ok(dep.direction, name + '.direction must not be empty')
	}
	return validateDeparture
}

const validateDepartures = (validate, deps, name = 'departures') => {
	a.ok(Array.isArray(deps), name + ' must be an array')
	a.ok(deps.length > 0, name + ' must not be empty')
	for (let i = 0; i < deps.length; i++) {
		validate('departure', deps[i], name + `[${i}]`)
	}
}

const validateMovement = (validate, m, name = 'movement') => {
	a.ok(isObj(m), name + ' must be an object')
	// todo: let hafas-client add a .type field

	validate(['line'], v.line, name + '.line')
	a.strictEqual(typeof v.direction, 'string', name + '.direction must be a string')
	a.ok(v.direction, name + '.direction must not be empty')

	const lName = name + '.location'
	validate(['location'], v.location, lName)
	a.ok(v.location.latitude <= 55, lName + '.latitude is too small')
	a.ok(v.location.latitude >= 45, lName + '.latitude is too large')
	a.ok(v.location.longitude >= 9, lName + '.longitude is too small')
	a.ok(v.location.longitude <= 15, lName + '.longitude is too small')

	a.ok(Array.isArray(v.nextStops), name + '.nextStops must be an array')
	for (let i = 0; i < v.nextStops.length; i++) {
		const st = v.nextStops[i]
		assertValidStopover('stopover', v.nextStops[i], name + `.nextStops[${i}]`)
	}

	a.ok(Array.isArray(v.frames), name + '.frames must be an array')
	a.ok(v.frames.length > 0, name + '.frames must not be empty')
	for (let i = 0; i < v.frames.length; i++) {
		const f = v.frames[i]
		const fName = name + `.frames[${i}]`

		a.ok(isObj(f), fName + ' must be an object')
		assertValidStation(['station'], f.origin, fName + '.origin')
		assertValidStation(['station'], f.destination, fName + '.destination')
		a.strictEqual(typeof f.t, 'number', fName + '.frames must be a number')
	}
}

const validateMovements = (validate, ms, name = 'movements') => {
	a.ok(Array.isArray(ms), name + ' must be an array')
	a.ok(ms.length > 0, name + ' must not be empty')
	for (let i = 0; i < ms.length; i++) {
		validate('movement', ms[i], name + `[${i}]`)
	}
}

module.exports = {
	station: createValidateStation,
	location: () => validateLocation,
	locations: () => validateLocations,
	poi: () => validatePoi,
	address: () => validateAddress,
	line: createValidateLine,
	stopover: createValidateStopover,
	ticket: () => validateTicket,
	journeyLeg: createValidateJourneyLeg,
	journey: () => validateJourney,
	journeys: () => validateJourneys,
	departure: createValidateDeparture,
	departures: () => validateDepartures,
	movement: () => validateMovement,
	movements: () => validateMovements
}
