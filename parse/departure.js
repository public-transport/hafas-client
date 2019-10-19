'use strict'

const createParseArrOrDep = require('./arrival-or-departure')

const DEPARTURE = 'd'
const parseDeparture = createParseArrOrDep(DEPARTURE)

module.exports = parseDeparture
