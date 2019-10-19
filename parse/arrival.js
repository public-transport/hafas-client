'use strict'

const createParseArrOrDep = require('./arrival-or-departure')

const ARRIVAL = 'a'
const parseArrival = createParseArrOrDep(ARRIVAL)

module.exports = parseArrival
