'use strict'

const stringifyStation = id => ({type: 'S', lid: 'L=' + id})

module.exports = stringifyStation
