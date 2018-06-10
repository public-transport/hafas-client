'use strict'

const createClient = require('../..')
const cflProfile = require('.')

const client = createClient(cflProfile, 'hafas-client-example')

// from Mersch to Pfaffenthal-Kirchberg
// client.journeys('009864348', '008200102', {results: 1})
client.departures('009864348', { duration: 5 })
// client.locations('Pfaffenthal Kirchberg', {results: 2})
// client.station('009864348') // Mersch
// client.nearby({
// 	type: 'location',
// 	latitude: 49.7523,
// 	longitude: 6.1103
// }, {distance: 500})
// client.radar({
// 	north: 49.9,
// 	west: 6.11,
// 	south: 49.7,
// 	east: 6.13
// }, {results: 10})

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.trip(leg.id, leg.line.name)
// })

.then(data => {
	console.log(require('util').inspect(data, { depth: null }))
})
.catch(console.error)
