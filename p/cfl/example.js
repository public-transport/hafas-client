import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as cflProfile} from './index.js'

const client = createClient(cflProfile, 'hafas-client-example')

const mersch = '9864348'
const bruxellesCentral = '8800003'

// from Mersch to Bruxelles Central
client.journeys(mersch, bruxellesCentral, {results: 1})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
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
// 	id: '980005067',
// 	address: '7557 Mersch, Rue Mies 1',
// 	latitude: 49.746044,
// 	longitude: 6.102228,
// }, {
// 	maxDuration: 30,
// })

.then(data => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
