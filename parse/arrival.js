'use strict'

const createParseArrOrDep = require('./arrival-or-departure')

const ARRIVAL = 'a'
const createParseArrival = (profile, opt, data) => {
	return createParseArrOrDep(profile, opt, data, ARRIVAL)
}

module.exports = createParseArrival
