import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as sMuenchenProfile} from './index.js'

const client = createClient(sMuenchenProfile, 'hafas-client-example')

// Mittersendling to Charlottenburg
// client.journeys('8004154', '0621790', {results: 1, polylines: true})
client.departures('8004154', {duration: 5})
// client.arrivals('8004154', {duration: 10, linesOfStops: true})
// client.locations('mittersendling', {results: 5})
// client.stop('8004154', {linesOfStops: true}) // Mittersendling
// client.nearby({
// 	type: 'location',
// 	latitude: 48.153858,
// 	longitude: 11.533059
// }, {distance: 750})
// client.radar({
// 	north: 48.145121,
// 	west: 11.543736,
// 	south: 48.138339,
// 	east: 11.553776
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
//     address: 'Pötschnerstraße 3, neuhausen',
//     latitude: 48.152499,
//     longitude: 11.531695
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs.find(leg => leg.line)
// 	return client.trip(leg.tripId, {polyline: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {
// 		stopovers: true, remarks: true
// 	})
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
