'use strict'

const createClient = require('../../')
const dbbusradarnrwProfile = require('.')

const client = createClient(dbbusradarnrwProfile, 'hafas-client-example')

// Hagen Bauhaus to Schwerte Bahnhof
// returns hafas error PARSE
// client.journeys('3307002', '3357026', {results: 1})

// client.departures('3307002', {duration: 60})
// client.arrivals('3307002', {duration: 30, linesOfStops: true})
// client.locations('Hagen Vorhalle')
// client.stop('3307002') // Hagen Bauhaus

// client.nearby({
// 	type: 'location',
// 	latitude: 51.38,
// 	longitude: 7.45
// }, {results: 1})

// client.radar({
// 	north: 51.5,
// 	west: 7.2,
// 	south: 51.2,
// 	east: 7.8
// }, {results: 10})

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
}, console.error)

