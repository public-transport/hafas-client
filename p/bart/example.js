import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as bartProfile} from './index.js'

const client = createClient(bartProfile, 'hafas-client-example')

const fremont = '100013296'
const embarcadero = '100013295'

// client.journeys(fremont, embarcadero, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(fremont, {duration: 1})
// client.arrivals(fremont, {duration: 10, linesOfStops: true})
// client.radar({
// 	north: 37.8735,
// 	west: -122.5250,
// 	south: 37.6884,
// 	east: -122.2105,
// }, {results: 10})

client.locations('embarcadero', {results: 3})
// client.stop(fremont, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 38.554779,
// 	longitude: -121.738798,
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980557173',
// 	address: '1000 Alice St, Davis, 95616',
// 	latitude: 38.554779,
// 	longitude: -121.738798,
// }, {
// 	maxDuration: 8,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
