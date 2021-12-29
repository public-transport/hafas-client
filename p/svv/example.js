'use strict'

const createClient = require('../..')
const svvProfile = require('.')

const client = createClient(svvProfile, 'hafas-client-example')

const sam = '455086100'
const volksgarten = '455082100'
const zillnerstr2 = {
	type: 'location',
	id: '980133005',
	address: 'Zillnerstraße 2, 5020 Salzburg',
	latitude: 47.801434, longitude: 13.031006,
}

client.journeys(sam, volksgarten, {results: 1, polylines: true})
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.departures(sam, {duration: 1})
// client.arrivals(sam, {duration: 10, linesOfStops: true})
// client.locations('salzburg sam', {results: 2})
// client.stop(sam, {linesOfStops: true}) // Dammtor
// client.nearby(zillnerstr2)
// client.reachableFrom(zillnerstr2, {
// 	when: new Date('2020-06-01T10:00:00+0200'),
// })

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
