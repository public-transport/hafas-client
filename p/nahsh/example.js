import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as nahshProfile} from './index.js'

const client = createClient(nahshProfile, 'hafas-client-example')

// Flensburg Hbf to Kiel Hbf
client.journeys('8000103', '8000199', {results: 10, tickets: true})
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.departures('8000199', {duration: 10})
// client.arrivals('8000199', {duration: 5, linesOfStops: true})
// client.trip('1|30161|5|100|14032018', 'Bus 52')
// client.locations('Schleswig', {results: 1})
// client.stop('706990') // Kiel Holunderbusch
// client.nearby({
// 	type: 'location',
// 	latitude: 54.295691,
// 	longitude: 10.116424
// }, {distance: 60})
// client.reachableFrom({
// 	type: 'location',
// 	address: 'Husum, Berliner Straße 80',
// 	latitude: 54.488995,
// 	longitude: 9.056263
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

// client.radar({
// 	north: 54.4,
// 	west: 10.0,
// 	south: 54.2,
// 	east: 10.2
// }, {
// 	results: 10,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
