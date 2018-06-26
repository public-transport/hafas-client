'use strict'

const createParseArrOrDep = require('./arrival-or-departure')

const DEPARTURE = 'd'
const createParseDeparture = (profile, opt, data) => {
	return createParseArrOrDep(profile, opt, data, DEPARTURE)
}

module.exports = createParseDeparture
