'use strict'

const createClient = require('../..')
const irishProfile = require('.')

const client = createClient(irishProfile)

// from Dublin to Belfast Central
client.journeys('9909002', '9990840', {results: 1})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, leg.line && leg.line.name)
// })

// client.departures('9909002', {duration: 5})
// client.arrivals('9909002', {duration: 10, linesOfStops: true})
// client.locations('Dublin', {results: 2})
// client.locations('Hochschule Dublin', {poi: true, addressses: false, fuzzy: false})
// client.stop('9909002') // Dublin
// client.nearby({
// 	type: 'location',
// 	latitude: 53.353,
// 	longitude: -6.247
// }, {distance: 200})
// client.radar({
// 	north: 53.35,
// 	west: -6.245,
// 	south: 53.34,
// 	east: -6.244
// }, {results: 10})

.then(data => {
	console.log(require('util').inspect(data, { depth: null }))
})
.catch(console.error)
