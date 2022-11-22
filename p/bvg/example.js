import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as bvgProfile} from './index.js'

const client = createClient(bvgProfile, 'hafas-client-example')

// Hauptbahnhof to Charlottenburg
client.journeys('900000003201', '900000024101', {results: 1, polylines: true})
// client.departures('900000013102', {duration: 1})
// client.arrivals('900000013102', {duration: 10, linesOfStops: true})
// client.locations('Alexanderplatz', {results: 2})
// client.stop('900000042101', {linesOfStops: true}) // Spichernstr
// client.nearby({
// 	type: 'location',
// 	latitude: 52.5137344,
// 	longitude: 13.4744798
// }, {distance: 60})
// client.radar({
// 	north: 52.52411,
// 	west: 13.41002,
// 	south: 52.51942,
// 	east: 13.41709
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	address: '13353 Berlin-Wedding, Torfstr. 17',
// 	latitude: 52.541797,
// 	longitude: 13.350042
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 10
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })
.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
