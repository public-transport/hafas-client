import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as dbbusradarnrwProfile} from './index.js'

const client = createClient(dbbusradarnrwProfile, 'hafas-client-example')

// Hagen Bauhaus to Schwerte Bahnhof
// returns hafas error PARSE
client.journeys('3307002', '3357026', {results: 1})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

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
	console.log(inspect(data, {depth: null, colors: true}))
}, console.error)

