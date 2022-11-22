import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vrnProfile} from './index.js'

const client = createClient(vrnProfile, 'hafas-client-example')

const ludwigshafen = '8000236'
const meckesheim = '8003932'

client.journeys(ludwigshafen, meckesheim, {results: 1, polylines: true})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journeys[0].refreshToken, {
// 		stopovers: true, remarks: true
// 	})
// })

// client.departures(ludwigshafen, {duration: 1})
// client.arrivals(ludwigshafen, {duration: 10, linesOfStops: true})

// client.locations('meckesheim', {results: 2})
// client.stop(ludwigshafen, {linesOfStops: true}) // Dammtor
// client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 60})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980787337',
// 	address: 'Ludwigshafen am Rhein - Mitte, Pestalozzistraße 2',
// 	latitude: 49.474336, longitude: 8.441779,
// }, {
// 	when: new Date('2020-12-01T10:00:00+01:00'),
// 	maxDuration: 8,
// })

// client.radar({
// 	north: 49.4940,
// 	west: 8.4560,
// 	south: 49.4774,
// 	east: 8.4834,
// }, {results: 10})

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
