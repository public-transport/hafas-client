'use strict'

const a = require('assert')
const {defaultValidators} = require('validate-fptf')
const anyOf = require('validate-fptf/lib/any-of')

const {assertValidWhen} = require('./util')

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)
const is = val => val !== null && val !== undefined

const createValidateStation = (cfg) => {
	const validateStation = (val, s, name = 'station') => {
		defaultValidators.station(val, s, name)

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
				val.line(val, s.lines[i], name + `.lines[${i}]`)
			}
		}
	}
	return validateStation
}


const validateStop = (val, s, name = 'stop') => {
	// HAFAS doesn't always return the station of a stop. We mock it here
	// to silence `validate-fptf`.
	const station = Object.assign({}, s)
	station.type = 'station'
	s = Object.assign({station}, s)
	defaultValidators.stop(val, s, name)
}

const validatePoi = (val, poi, name = 'location') => {
	defaultValidators.location(val, poi, name)
	val.ref(val, poi.id, name + '.id')
	a.ok(poi.name, name + '.name must not be empty')
}

const validateAddress = (val, addr, name = 'location') => {
	defaultValidators.location(val, addr, name)
	a.strictEqual(typeof addr.address, 'string', name + '.address must be a string')
	a.ok(addr.address, name + '.address must not be empty')
}

const validateLocation = (val, loc, name = 'location') => {
	a.ok(isObj(loc), name + ' must be an object')
	if (loc.type === 'stop') val.stop(val, loc, name)
	else if (loc.type === 'station') val.station(val, loc, name)
	else if ('id' in loc) validatePoi(val, loc, name)
	else if (!('name' in loc) && ('address' in loc)) {
		validateAddress(val, loc, name)
	} else defaultValidators.location(val, loc, name)
}

const validateLocations = (val, locs, name = 'locations') => {
	a.ok(Array.isArray(locs), name + ' must be an array')
	a.ok(locs.length > 0, name + ' must not be empty')
	for (let i = 0; i < locs.length; i++) {
		val.location(val, locs[i], name + `[${i}]`)
	}
}

const createValidateLine = (cfg) => {
	const validLineModes = []
	for (let product of cfg.products) {
		if (!validLineModes.includes(product.mode)) {
			validLineModes.push(product.mode)
		}
	}

	const validateLine = (val, line, name = 'line') => {
		defaultValidators.line(val, line, name)

		const msg = name + '.fahrtNr must be '
		if (line.fahrtNr !== null) {
			a.strictEqual(typeof line.fahrtNr, 'string', msg + 'a string')
			a.ok(line.fahrtNr, msg + ' be empty')
		}

		a.ok(validLineModes.includes(line.mode), name + '.mode is invalid')
	}
	return validateLine
}

const createValidateStopover = (cfg) => {
	const validateStopover = (val, s, name = 'stopover') => {
		if (is(s.arrival)) {
			val.date(val, s.arrival, name + '.arrival')
			assertValidWhen(s.arrival, cfg.when, name)
		}
		if (is(s.departure)) {
			val.date(val, s.departure, name + '.departure')
			assertValidWhen(s.departure, cfg.when, name)
		}
		if (!is(s.arrival) && !is(s.departure)) {
			a.fail(name + ' contains neither arrival nor departure')
		}

		if (is(s.arrivalDelay)) {
			const msg = name + '.arrivalDelay must be a number'
			a.strictEqual(typeof s.arrivalDelay, 'number', msg)
		}
		if (is(s.departureDelay)) {
			const msg = name + '.departureDelay must be a number'
			a.strictEqual(typeof s.departureDelay, 'number', msg)
		}

		if (is(s.arrivalPlatform)) {
			const msg = name + '.arrivalPlatform must '
			a.strictEqual(typeof s.arrivalPlatform, 'string', msg + 'be a string')
			a.ok(s.arrivalPlatform, msg + 'not be empty')
		}
		if (is(s.formerScheduledArrivalPlatform)) {
			const msg = name + '.formerScheduledArrivalPlatform must '
			a.strictEqual(typeof s.formerScheduledArrivalPlatform, 'string', msg + 'be a string')
			a.ok(s.formerScheduledArrivalPlatform, msg + 'not be empty')
		}
		if (is(s.departurePlatform)) {
			const msg = name + '.departurePlatform must '
			a.strictEqual(typeof s.departurePlatform, 'string', msg + 'be a string')
			a.ok(s.departurePlatform, msg + 'not be empty')
		}
		if (is(s.formerScheduledDeparturePlatform)) {
			const msg = name + '.formerScheduledDeparturePlatform must '
			a.strictEqual(typeof s.formerScheduledDeparturePlatform, 'string', msg + 'be a string')
			a.ok(s.formerScheduledDeparturePlatform, msg + 'not be empty')
		}

		anyOf(['stop', 'station'], val, s.stop, name + '.stop')
	}
	return validateStopover
}

const validateTicket = (val, ti, name = 'ticket') => {
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
	const validateJourneyLeg = (val, leg, name = 'journeyLeg') => {
		const withFakeScheduleAndOperator = Object.assign({
			schedule: 'foo', // todo: let hafas-client parse a schedule ID
			operator: 'bar' // todo: let hafas-client parse the operator
		}, leg)
		defaultValidators.journeyLeg(val, withFakeScheduleAndOperator, name)

		if (leg.arrival !== null) {
			assertValidWhen(leg.arrival, cfg.when, name + '.arrival')
		}
		if (leg.departure !== null) {
			assertValidWhen(leg.departure, cfg.when, name + '.departure')
		}
		// todo: leg.arrivalPlatform !== null
		if (is(leg.arrivalPlatform)) {
			const msg = name + '.arrivalPlatform must be a string'
			a.strictEqual(typeof leg.arrivalPlatform, 'string', msg)
			a.ok(leg.arrivalPlatform, name + '.arrivalPlatform must not be empty')
		}
		// todo: leg.departurePlatform !== null
		if (is(leg.departurePlatform)) {
			const msg = name + '.departurePlatform must be a string'
			a.strictEqual(typeof leg.departurePlatform, 'string', msg)
			a.ok(leg.departurePlatform, name + '.departurePlatform must not be empty')
		}

		if ('stopovers' in leg) {
			a.ok(Array.isArray(leg.stopovers), name + '.stopovers must be an array')
			a.ok(leg.stopovers.length > 0, name + '.stopovers must not be empty')

			for (let i = 0; i < leg.stopovers.length; i++) {
				val.stopover(val, leg.stopovers[i], name + `.stopovers[${i}]`)
			}
		}

		if (leg.mode === 'walking') {
			if (leg.distance !== null) {
				const msg = name + '.distance must be '
				a.strictEqual(typeof leg.distance, 'number', msg + 'a number')
				a.ok(leg.distance > 0, msg + '> 0')
			}
		} else {
			const msg = name + '.direction must be a string'
			a.strictEqual(typeof leg.direction, 'string', msg)
			a.ok(leg.direction, name + '.direction must not be empty')
		}

		// todo: validate polyline
	}
	return validateJourneyLeg
}

const validateJourney = (val, j, name = 'journey') => {
	const withFakeId = Object.assign({
		id: 'foo' // todo: let hafas-client parse a journey ID
	}, j)
	defaultValidators.journey(val, withFakeId, name)

	if ('tickets' in j) {
		a.ok(Array.isArray(j.tickets), name + '.tickets must be an array')
		a.ok(j.tickets.length > 0, name + '.tickets must not be empty')

		for (let i = 0; i < j.tickets.length; i++) {
			val.ticket(val, j.tickets[i], name + `.tickets[${i}]`)
		}
	}
}

const validateJourneys = (val, js, name = 'journeys') => {
	a.ok(Array.isArray(js), name + ' must be an array')
	a.ok(js.length > 0, name + ' must not be empty')
	for (let i = 0; i < js.length; i++) {
		val.journey(val, js[i], name + `[${i}]`)
	}
}

const createValidateArrivalOrDeparture = (cfg) => {
	const validateArrivalOrDeparture = (val, dep, name = 'arrOrDep') => {
		a.ok(isObj(dep), name + ' must be an object')
		// todo: let hafas-client add a .type field

		a.strictEqual(typeof dep.tripId, 'string', name + '.tripId must be a string')
		a.ok(dep.tripId, name + '.tripId must not be empty')
		a.strictEqual(typeof dep.trip, 'number', name + '.trip must be a number')

		anyOf(['stop', 'station'], val, dep.stop, name + '.stop')

		assertValidWhen(dep.when, cfg.when, name)
		if (dep.delay !== null) {
			const msg = name + '.delay must be a number'
			a.strictEqual(typeof dep.delay, 'number', msg)
		}

		if (dep.platform !== null) {
			const msg = name + '.platform must '
			a.strictEqual(typeof dep.platform, 'string', msg + 'be a string')
			a.ok(dep.platform, name + 'not be empty')
		}

		val.line(val, dep.line, name + '.line')
		a.strictEqual(typeof dep.direction, 'string', name + '.direction must be a string')
		a.ok(dep.direction, name + '.direction must not be empty')
	}
	return validateArrivalOrDeparture
}

const validateArrivals = (val, deps, name = 'arrivals') => {
	a.ok(Array.isArray(deps), name + ' must be an array')
	a.ok(deps.length > 0, name + ' must not be empty')
	for (let i = 0; i < deps.length; i++) {
		val.arrival(val, deps[i], name + `[${i}]`)
	}
}
const validateDepartures = (val, deps, name = 'departures') => {
	a.ok(Array.isArray(deps), name + ' must be an array')
	a.ok(deps.length > 0, name + ' must not be empty')
	for (let i = 0; i < deps.length; i++) {
		val.departure(val, deps[i], name + `[${i}]`)
	}
}

const validateMovement = (val, m, name = 'movement') => {
	a.ok(isObj(m), name + ' must be an object')
	// todo: let hafas-client add a .type field

	val.line(val, m.line, name + '.line')
	a.strictEqual(typeof m.direction, 'string', name + '.direction must be a string')
	a.ok(m.direction, name + '.direction must not be empty')

	const lName = name + '.location'
	val.location(val, m.location, lName)
	a.ok(m.location.latitude <= 55, lName + '.latitude is too small')
	a.ok(m.location.latitude >= 45, lName + '.latitude is too large')
	a.ok(m.location.longitude >= 9, lName + '.longitude is too small')
	a.ok(m.location.longitude <= 15, lName + '.longitude is too small')

	a.ok(Array.isArray(m.nextStops), name + '.nextStops must be an array')
	for (let i = 0; i < m.nextStops.length; i++) {
		const st = m.nextStops[i]
		val.stopover(val, m.nextStops[i], name + `.nextStops[${i}]`)
	}

	a.ok(Array.isArray(m.frames), name + '.frames must be an array')
	a.ok(m.frames.length > 0, name + '.frames must not be empty')
	for (let i = 0; i < m.frames.length; i++) {
		const f = m.frames[i]
		const fName = name + `.frames[${i}]`

		a.ok(isObj(f), fName + ' must be an object')
		anyOf(['location', 'stop', 'station'], val, f.origin, fName + '.origin')
		anyOf(['location', 'stop', 'station'], val, f.destination, fName + '.destination')
		a.strictEqual(typeof f.t, 'number', fName + '.frames must be a number')
	}

	// todo: validate polyline
}

const validateMovements = (val, ms, name = 'movements') => {
	a.ok(Array.isArray(ms), name + ' must be an array')
	a.ok(ms.length > 0, name + ' must not be empty')
	for (let i = 0; i < ms.length; i++) {
		val.movement(val, ms[i], name + `[${i}]`)
	}
}

module.exports = {
	station: createValidateStation,
	stop: () => validateStop,
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
	arrival: createValidateArrivalOrDeparture,
	departure: createValidateArrivalOrDeparture,
	departures: () => validateDepartures,
	arrivals: () => validateArrivals,
	movement: () => validateMovement,
	movements: () => validateMovements
}
