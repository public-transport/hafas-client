'use strict'

const createClient = require('../..')
const mobiliteitProfile = require('.')

const client = createClient(mobiliteitProfile, 'hafas-client example')

const mersch = '160904001'
const bruxellesCentral = '300000079'

// from Mersch to Bruxelles Central
client.journeys(mersch, bruxellesCentral, {results: 1})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.id, leg.line.name, {polyline: true})
// })

// client.locations('mersch', {results: 3})
// client.stop(mersch)
// client.nearby({
// 	type: 'location',
// 	latitude: 49.7523,
// 	longitude: 6.1103
// }, {distance: 500})

// client.departures(mersch, {duration: 5})
// client.arrivals(mersch, {duration: 10, linesOfStops: true})

// client.radar({
// 	north: 49.9,
// 	west: 6.11,
// 	south: 49.7,
// 	east: 6.13
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	id: '990005227',
// 	address: 'Mersch, Rue Mies 1',
// 	latitude: 49.746044, longitude: 6.102228,
// }, {
// 	when: new Date('2020-10-10T10:00:00+02:00'),
// 	maxDuration: 30
// })

.then(data => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
