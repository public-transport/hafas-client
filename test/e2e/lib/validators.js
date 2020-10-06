import * as a from 'assert'
import validateFptf from 'validate-fptf'
const {defaultValidators} = validateFptf
import anyOf from 'validate-fptf/lib/any-of.js'

import {assertValidWhen} from './util.js'

const DAY = 24 * 60 * 60 * 1000

const isObj = o => o !== null && 'object' === typeof o && !Array.isArray(o)
const is = val => val !== null && val !== undefined

const createValidateRealtimeDataUpdatedAt = (cfg) => {
	const validateRealtimeDataUpdatedAt = (val, rtDataUpdatedAt, name = 'realtimeDataUpdatedAt') => {
		a.ok(Number.isInteger(rtDataUpdatedAt), name + ' must be an integer')
		assertValidWhen(rtDataUpdatedAt * 1000, cfg.when, name, 100 * DAY)
	}
	return validateRealtimeDataUpdatedAt
}

const createValidateProducts = (cfg) => {
	const validateProducts = (val, p, name = 'products') => {
		a.ok(isObj(p), name + ' must be an object')
		for (let product of cfg.products) {
			const msg = `${name}[${product.id}] must be a boolean`
			a.strictEqual(typeof p[product.id], 'boolean', msg)
		}
	}
	return validateProducts
}

const createValidateStation = (cfg) => {
	const validateStation = (val, s, name = 'station') => {
		defaultValidators.station(val, s, name)

		if (!cfg.stationCoordsOptional) {
			a.ok(is(s.location), `missing ${name}.location`)
		}
		val.products(val, s.products, name + '.products')

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
	// todo: check if s.id has leading zeros
}
const createValidateStop = () => validateStop

const validatePoi = (val, poi, name = 'location') => {
	defaultValidators.location(val, poi, name)
	val.ref(val, poi.id, name + '.id')
	// todo: check if s.id has leading zeros
	a.strictEqual(poi.poi, true, name + '.poi must be true')
	a.strictEqual(typeof poi.name, 'string', name + '.name must be a string')
	a.ok(poi.name, name + '.name must not be empty')
}
const createValidatePoi = () => validatePoi

const validateAddress = (val, addr, name = 'location') => {
	defaultValidators.location(val, addr, name)
	a.strictEqual(typeof addr.address, 'string', name + '.address must be a string')
	a.ok(addr.address, name + '.address must not be empty')
}
const createValidateAddress = () => validateAddress

const validateLocation = (val, loc, name = 'location') => {
	a.ok(isObj(loc), name + ' must be an object')
	if (loc.type === 'stop') val.stop(val, loc, name)
	else if (loc.type === 'station') val.station(val, loc, name)
	else if (loc.poi) validatePoi(val, loc, name)
	else if (!('name' in loc) && ('address' in loc)) {
		validateAddress(val, loc, name)
	} else defaultValidators.location(val, loc, name)
}
const createValidateLocation = () => validateLocation

const validateLocations = (val, locs, name = 'locations') => {
	a.ok(Array.isArray(locs), name + ' must be an array')
	a.ok(locs.length > 0, name + ' must not be empty')
	for (let i = 0; i < locs.length; i++) {
		val.location(val, locs[i], name + `[${i}]`)
	}
}
const createValidateLocations = () => validateLocations

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

const validateRemark = (val, rem, name = 'remark') => {
	a.ok(isObj(rem), name + ' must be an object')
	a.strictEqual(typeof rem.id, 'string', name + '.id must be a string')
	a.ok(rem.id, name + '.id must not be empty')
	if (rem.summary !== null) {
		a.strictEqual(typeof rem.summary, 'string', name + '.summary must be a string')
		a.ok(rem.summary, name + '.summary must not be empty')
	}
	if (rem.text !== null) {
		a.strictEqual(typeof rem.text, 'string', name + '.text must be a string')
		a.ok(rem.text, name + '.text must not be empty')
	}
	if ('validFrom' in rem) {
		a.strictEqual(typeof rem.validFrom, 'string', name + '.validFrom must be a string')
		a.ok(Number.isInteger(Date.parse(rem.validFrom)), name + '.validFrom must be ISO 8601')
	}
	if ('validUntil' in rem) {
		a.strictEqual(typeof rem.validUntil, 'string', name + '.validUntil must be a string')
		a.ok(Number.isInteger(Date.parse(rem.validUntil)), name + '.validUntil must be ISO 8601')
	}
	if ('modified' in rem) {
		a.strictEqual(typeof rem.modified, 'string', name + '.modified must be a string')
		a.ok(Number.isInteger(Date.parse(rem.modified)), name + '.modified must be ISO 8601')
	}
	if ('products' in rem) {
		val.products(val, rem.products, name + '.products')
	}
	if ('edges' in rem) {
		a.ok(Array.isArray(rem.edges), name + '.edges must be an array')
		for (let i = 0; i < rem.edges.length; i++) {
			const e = rem.edges[i]
			const n = `${name}.edges[${i}]`
			a.ok(isObj(e), n + ' must be an object')
			if (e.fromLocation !== null) {
				val.location(val, e.fromLocation, n + '.fromLocation')
			}
			if (e.toLocation !== null) {
				val.location(val, e.toLocation, n + '.toLocation')
			}
		}
	}
	if ('affectedLines' in rem) {
		a.ok(Array.isArray(rem.affectedLines), name + '.affectedLines must be an array')
		for (let i = 0; i < rem.affectedLines.length; i++) {
			val.line(val, rem.affectedLines[i], `${name}.affectedLines[${i}]`)
		}
	}
}
const createValidateRemark = () => validateRemark

const createValidateStopover = (cfg) => {
	const validateStopover = (val, s, name = 'stopover') => {
		if (
			!is(s.arrival) && !is(s.departure) &&
			!is(s.plannedArrival) && !is(s.plannedDeparture)
		) {
			a.fail(name + ' contains neither (planned)arrival nor (planned)departure')
		}

		if (is(s.arrival)) {
			val.date(val, s.arrival, name + '.arrival')
			assertValidWhen(s.arrival, cfg.when, name + '.arrival')
		}
		if (is(s.departure)) {
			val.date(val, s.departure, name + '.departure')
			assertValidWhen(s.departure, cfg.when, name + '.departure')
		}
		if (is(s.plannedArrival)) {
			val.date(val, s.plannedArrival, name + '.plannedArrival')
			assertValidWhen(s.plannedArrival, cfg.when, name + '.plannedArrival')
		}
		if (is(s.departurePrognosisType)) {
			const msg = name + '.departurePrognosisType must '
			a.strictEqual(typeof s.departurePrognosisType, 'string', msg + 'be a string')
			a.ok(s.departurePrognosisType, msg + 'not be empty')
		}
		if (is(s.plannedDeparture)) {
			val.date(val, s.plannedDeparture, name + '.plannedDeparture')
			assertValidWhen(s.plannedDeparture, cfg.when, name + '.plannedDeparture')
		}
		if (is(s.plannedArrival) && !is(s.arrival) && !s.cancelled) {
			a.fail(name + ' is not cancelled, and has .plannedArrival but not .arrival')
		}
		if (is(s.plannedDeparture) && !is(s.departure) && !s.cancelled) {
			a.fail(name + ' is not cancelled, and has .plannedDeparture but not .departure')
		}

		if (is(s.arrivalDelay)) {
			const msg = name + '.arrivalDelay must be a number'
			a.strictEqual(typeof s.arrivalDelay, 'number', msg)
			const d = new Date(s.arrival) - new Date(s.plannedArrival)
			a.strictEqual(Math.round(d / 1000), s.arrivalDelay)
		}
		if (is(s.departureDelay)) {
			const msg = name + '.departureDelay must be a number'
			a.strictEqual(typeof s.departureDelay, 'number', msg)
			const d = new Date(s.departure) - new Date(s.plannedDeparture)
			a.strictEqual(Math.round(d / 1000), s.departureDelay)
		}

		if (is(s.arrivalPlatform)) {
			const msg = name + '.arrivalPlatform must '
			a.strictEqual(typeof s.arrivalPlatform, 'string', msg + 'be a string')
			a.ok(s.arrivalPlatform, msg + 'not be empty')
		}
		if (is(s.plannedArrivalPlatform)) {
			const msg = name + '.plannedArrivalPlatform must '
			a.strictEqual(typeof s.plannedArrivalPlatform, 'string', msg + 'be a string')
			a.ok(s.plannedArrivalPlatform, msg + 'not be empty')
		}
		if (is(s.arrivalPrognosisType)) {
			const msg = name + '.arrivalPrognosisType must '
			a.strictEqual(typeof s.arrivalPrognosisType, 'string', msg + 'be a string')
			a.ok(s.arrivalPrognosisType, msg + 'not be empty')
		}
		if (is(s.departurePlatform)) {
			const msg = name + '.departurePlatform must '
			a.strictEqual(typeof s.departurePlatform, 'string', msg + 'be a string')
			a.ok(s.departurePlatform, msg + 'not be empty')
		}
		if (is(s.plannedDeparturePlatform)) {
			const msg = name + '.plannedDeparturePlatform must '
			a.strictEqual(typeof s.plannedDeparturePlatform, 'string', msg + 'be a string')
			a.ok(s.plannedDeparturePlatform, msg + 'not be empty')
		}
		if (is(s.plannedArrivalPlatform) && !is(s.arrivalPlatform)) {
			a.fail(name + ' has .plannedArrivalPlatform but not .arrivalPlatform')
		}
		if (is(s.plannedDeparturePlatform) && !is(s.departurePlatform)) {
			a.fail(name + ' has .plannedDeparturePlatform but not .departurePlatform')
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
const createValidateTicket = () => validateTicket

const createValidateJourneyLeg = (cfg) => {
	const validateJourneyLeg = (val, leg, name = 'journeyLeg') => {
		const fakeLeg = Object.assign({
			schedule: 'foo', // todo: let hafas-client parse a schedule ID
			operator: 'bar' // todo: let hafas-client parse the operator
		}, leg)
		if (leg.cancelled) {
			// FPTF doesn't support cancelled journey legs yet.
			// see https://github.com/public-transport/friendly-public-transport-format/issues/27
			// todo: remove once this is resolved upstream
			fakeLeg.departure = leg.plannedDeparture
			fakeLeg.arrival = leg.plannedArrival
		}
		defaultValidators.journeyLeg(val, fakeLeg, name)

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

		// todo: leg.public
		if ('walking' in leg) {
			a.strictEqual(typeof leg.walking, 'boolean', name + '.walking must be a boolean')
		}
		if (leg.walking) {
			if (leg.distance !== null) {
				const msg = name + '.distance must be '
				a.strictEqual(typeof leg.distance, 'number', msg + 'a number')
				a.ok(leg.distance > 0, msg + '> 0')
			}
		} else {
			a.strictEqual(typeof leg.tripId, 'string', name + '.tripId must be a string')
			a.ok(leg.tripId, name + '.tripId must not be empty')

			if (!leg.cancelled) {
				const msg = name + '.direction must be a string'
				a.strictEqual(typeof leg.direction, 'string', msg)
				a.ok(leg.direction, name + '.direction must not be empty')
			}
		}

		if ('cycle' in leg) {
			a.ok(isObj(leg.cycle), name + '.cycle must be an object')
			if (('min' in leg.cycle) && leg.cycle.min !== null) {
				a.strictEqual(typeof leg.cycle.min, 'number', name + '.cycle.min must be a number')
				a.ok(leg.cycle.min > 0, name + '.cycle.min must be >0')
			}
			if (('max' in leg.cycle) && leg.cycle.max !== null) {
				a.strictEqual(typeof leg.cycle.max, 'number', name + '.cycle.max must be a number')
				a.ok(leg.cycle.max > 0, name + '.cycle.max must be >0')
			}
			if (('nr' in leg.cycle) && leg.cycle.nr !== null) {
				a.strictEqual(typeof leg.cycle.nr, 'number', name + '.cycle.nr must be a number')
				a.ok(leg.cycle.nr > 0, name + '.cycle.nr must be >0')
			}
		}

		if ('alternatives' in leg) {
			const as = leg.alternatives
			a.ok(Array.isArray(as), name + '.alternatives must be an array')
			for (let i = 0; i < as.length; i++) {
				const alt = leg.alternatives[i]
				const n = name + `.alternatives[${i}]`

				a.ok(isObj(alt), n + ' must be an object')
				// todo: when, delay
				val.line(val, alt.line, n + '.line')
				if (alt.direction !== null) {
					a.strictEqual(typeof alt.direction, 'string', n + '.direction must be a string')
					a.ok(alt.direction, n + '.direction must not be empty')
				}

				if (alt.when !== null) {
					assertValidWhen(alt.when, cfg.when, n + '.when')
				}
				if (alt.delay !== null) {
					a.strictEqual(typeof alt.delay, 'number', n + '.delay must be a number')
				}
			}
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
	// todo: j.refreshToken

	if ('tickets' in j) {
		a.ok(Array.isArray(j.tickets), name + '.tickets must be an array')
		a.ok(j.tickets.length > 0, name + '.tickets must not be empty')

		for (let i = 0; i < j.tickets.length; i++) {
			val.ticket(val, j.tickets[i], name + `.tickets[${i}]`)
		}
	}
}
const createValidateJourney = () => validateJourney

const validateJourneys = (val, js, name = 'journeys') => {
	a.ok(Array.isArray(js), name + ' must be an array')
	a.ok(js.length > 0, name + ' must not be empty')
	for (let i = 0; i < js.length; i++) {
		val.journey(val, js[i], name + `[${i}]`)
	}
}
const createValidateJourneys = () => validateJourneys

const validateJourneysResult = (val, res, name = 'journeysResult') => {
	a.ok(isObj(res), name + ' must be an object')
	// todo: `earlierRef`, `laterRef`
	val.journeys(val, res.journeys, name + '.journeys')

	val.realtimeDataUpdatedAt(val, res.realtimeDataUpdatedAt, name + '.realtimeDataUpdatedAt')
}
const createValidateJourneysResult = () => validateJourneysResult

const validateRefreshJourneyResult = (val, res, name = 'refreshJourneyResult') => {
	a.ok(isObj(res), name + ' must be an object')

	val.realtimeDataUpdatedAt(val, res.realtimeDataUpdatedAt, name + '.realtimeDataUpdatedAt')

	val.journey(val, res.journey, name + '.journey')
}
const createValidateRefreshJourneyResult = () => validateRefreshJourneyResult

const validateTrip = (val, trip, name = 'trip') => {
	const withFakeTripId = Object.assign({
		tripId: trip.id
	}, trip)
	delete withFakeTripId.id
	val.journeyLeg(val, withFakeTripId, name)
}
const createValidateTrip = () => validateTrip

const validateTripResult = (val, res, name = 'tripResult') => {
	a.ok(isObj(res), name + ' must be an object')

	val.trip(val, res.trip, name + '.trip')

	val.realtimeDataUpdatedAt(val, res.realtimeDataUpdatedAt, name + '.realtimeDataUpdatedAt')
}
const createValidateTripResult = () => validateTripResult

const validateTripsByNameResult = (val, res, name = 'tripsByNameResult') => {
	a.ok(isObj(res), name + ' must be an object')

	a.ok(Array.isArray(res.trips), name + '.trips must be an array')
	a.ok(res.trips.length > 0, name + '.trips must not be empty')
	for (let i = 0; i < res.trips.length; i++) {
		val.trip(val, res.trips[i], `${name}.trips[${i}]`)
	}

	val.realtimeDataUpdatedAt(val, res.realtimeDataUpdatedAt, name + '.realtimeDataUpdatedAt')
}
const createValidateTripsByNameResult = () => validateTripsByNameResult

const createValidateArrivalOrDeparture = (type, cfg) => {
	if (type !== 'arrival' && type !== 'departure') throw new Error('invalid type')

	const validateArrivalOrDeparture = (val, dep, name = 'arrOrDep') => {
		a.ok(isObj(dep), name + ' must be an object')
		// todo: let hafas-client add a .type field

		a.strictEqual(typeof dep.tripId, 'string', name + '.tripId must be a string')
		a.ok(dep.tripId, name + '.tripId must not be empty')

		anyOf(['stop', 'station'], val, dep.stop, name + '.stop')

		assertValidWhen(dep.when, cfg.when, name + '.when')
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

		if (type === 'departure') {
			const n = name + '.direction'
			a.strictEqual(typeof dep.direction, 'string', n + ' must be a string')
			a.ok(dep.direction, n + ' must not be empty')
		}

		if (dep.destination !== null) {
				const lName = name + '.destination'
				val.location(val, dep.destination, lName)
		}

		if (dep.origin !== null) {
				const lName = name + '.origin'
				val.location(val, dep.origin, lName)
		}
	}
	return validateArrivalOrDeparture
}

const createValidateArrival = (cfg) => {
	const validate = createValidateArrivalOrDeparture('arrival', cfg)
	return (val, arr, name = 'arrival') => {
		validate(val, arr, name)
		if ('previousStopovers' in arr) {
			const n = name + '.previousStopovers'
			a.ok(Array.isArray(arr.previousStopovers), n + ' must be an array')
			for (let i = 0; i < arr.previousStopovers.length; i++) {
				val.stopover(val, arr.previousStopovers[i], n + `[${i}]`)
			}
		}
	}
}
const createValidateDeparture = (cfg) => {
	const validate = createValidateArrivalOrDeparture('departure', cfg)
	return (val, dep, name = 'departure') => {
		validate(val, dep, name)
		if ('nextStopovers' in dep) {
			const n = name + '.nextStopovers'
			a.ok(Array.isArray(dep.nextStopovers), n + ' must be an array')
			for (let i = 0; i < dep.nextStopovers.length; i++) {
				val.stopover(val, dep.nextStopovers[i], n + `[${i}]`)
			}
		}
	}
}

const _createValidateStationBoardResults = (cfg, validatorsKey) => {
	const validateStationBoardResults = (val, arrsOrDeps, name) => {
		a.ok(Array.isArray(arrsOrDeps), name + ' must be an array')
		a.ok(arrsOrDeps.length > 0, name + ' must not be empty')
		for (let i = 0; i < arrsOrDeps.length; i++) {
			val[validatorsKey](val, arrsOrDeps[i], name + `[${i}]`)
		}
	}
	return validateStationBoardResults
}
const createValidateArrivals = (cfg) => {
	return _createValidateStationBoardResults(cfg, 'arrival')
}
const createValidateDepartures = (cfg) => {
	return _createValidateStationBoardResults(cfg, 'departure')
}

const _createValidateStationBoardResponse = (cfg, validatorsKey, arrsOrDepsKey) => {
	const _validateStationBoardResponse = (val, res, name) => {
		a.ok(isObj(res), name + ' must be an object')

		val.realtimeDataUpdatedAt(val, res.realtimeDataUpdatedAt, name + '.realtimeDataUpdatedAt')

		const arrsOrDeps = res[arrsOrDepsKey]
		val[validatorsKey](val, arrsOrDeps, `${name}.${arrsOrDepsKey}`)
	}
	return _validateStationBoardResponse
}
const createValidateArrivalsResponse = (cfg) => {
	return _createValidateStationBoardResponse(cfg, 'arrivals', 'arrivals')
}
const createValidateDeparturesResponse = (cfg) => {
	return _createValidateStationBoardResponse(cfg, 'departures', 'departures')
}

const createValidateMovement = (cfg) => {
	const { maxLatitude, minLatitude, maxLongitude, minLongitude } = cfg
	const validateMovement = (val, m, name = 'movement') => {
		a.ok(isObj(m), name + ' must be an object')
		// todo: let hafas-client add a .type field

		val.line(val, m.line, name + '.line')
		a.strictEqual(typeof m.direction, 'string', name + '.direction must be a string')
		a.ok(m.direction, name + '.direction must not be empty')

		const lName = name + '.location'
		val.location(val, m.location, lName)
		const s = `${m.location.latitude}|${m.location.longitude} ${m.line && m.line.name}`
		if ('number' === typeof maxLatitude) {
			a.ok(m.location.latitude <= maxLatitude, lName + '.latitude is too large: ' + s)
		}
		if ('number' === typeof minLatitude) {
			a.ok(m.location.latitude >= minLatitude, lName + '.latitude is too small: ' + s)
		}
		if ('number' === typeof maxLongitude) {
			a.ok(m.location.longitude <= maxLongitude, lName + '.longitude is too large: ' + s)
		}
		if ('number' === typeof minLongitude) {
			a.ok(m.location.longitude >= minLongitude, lName + '.longitude is too small: ' + s)
		}

		a.ok(Array.isArray(m.nextStopovers), name + '.nextStopovers must be an array')
		for (let i = 0; i < m.nextStopovers.length; i++) {
			const st = m.nextStopovers[i]
			val.stopover(val, st, name + `.nextStopovers[${i}]`)
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
	return validateMovement
}

const validateMovements = (val, ms, name = 'movements') => {
	a.ok(Array.isArray(ms), name + ' must be an array')
	a.ok(ms.length > 0, name + ' must not be empty')
	for (let i = 0; i < ms.length; i++) {
		val.movement(val, ms[i], name + `[${i}]`)
	}
}
const createValidateMovements = () => validateMovements

const validateRadarResult = (val, res, name = 'movementsResult') => {
	a.ok(isObj(res), name + ' must be an object')

	val.movements(val, res.movements, name + '.movements')

	val.realtimeDataUpdatedAt(val, res.realtimeDataUpdatedAt, name + '.realtimeDataUpdatedAt')
}
const createValidateRadarResult = () => validateRadarResult

export {
	createValidateRealtimeDataUpdatedAt,
	createValidateProducts,
	createValidateStation,
	createValidateStop,
	createValidateLocation,
	createValidateLocations,
	createValidatePoi,
	createValidateAddress,
	createValidateLine,
	createValidateRemark,
	createValidateStopover,
	createValidateTicket,
	createValidateJourneyLeg,
	createValidateJourney,
	createValidateJourneys,
	createValidateJourneysResult,
	createValidateRefreshJourneyResult,
	createValidateTrip,
	createValidateTripResult,
	createValidateTripsByNameResult,
	createValidateArrival,
	createValidateDeparture,
	createValidateArrivals,
	createValidateDepartures,
	createValidateArrivalsResponse,
	createValidateDeparturesResponse,
	createValidateMovement,
	createValidateMovements,
	createValidateRadarResult,
}

export default {
	realtimeDataUpdatedAt: createValidateRealtimeDataUpdatedAt,
	products: createValidateProducts,
	station: createValidateStation,
	stop: createValidateStop,
	location: createValidateLocation,
	locations: createValidateLocations,
	poi: createValidatePoi,
	address: createValidateAddress,
	line: createValidateLine,
	remark: createValidateRemark,
	stopover: createValidateStopover,
	ticket: createValidateTicket,
	journeyLeg: createValidateJourneyLeg,
	journey: createValidateJourney,
	journeys: createValidateJourneys,
	journeysResult: createValidateJourneysResult,
	refreshJourneyResult: createValidateRefreshJourneyResult,
	trip: createValidateTrip,
	tripResult: createValidateTripResult,
	tripsByNameResult: createValidateTripsByNameResult,
	arrival: createValidateArrival,
	departure: createValidateDeparture,
	arrivals: createValidateArrivals,
	departures: createValidateDepartures,
	arrivalsResponse: createValidateArrivalsResponse,
	departuresResponse: createValidateDeparturesResponse,
	movement: createValidateMovement,
	movements: createValidateMovements,
	radarResult: createValidateRadarResult,
}
