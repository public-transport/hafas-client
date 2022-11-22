import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as pkpProfile} from './index.js'

const client = createClient(pkpProfile, 'hafas-client-example')

const wrocławGł = '5100069'
const krakówGł = '5100028'

client.journeys(krakówGł, wrocławGł, {results: 1, polylines: true})
// client.departures(krakówGł, {duration: 10})
// client.arrivals(krakówGł, {duration: 10, linesOfStops: true})
// client.locations('kraków', {results: 2})
// client.stop(krakówGł, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 50.067192,
// 	longitude: 19.947423
// }, {distance: 60})
// client.radar({
// 	north: 50.2,
// 	west: 19.8,
// 	south: 49.9,
// 	east: 20.1
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	address: 'Bydgoszcz, Dworcowa 100',
// 	latitude: 53.1336648,
// 	longitude: 17.9908571
// }, {
// 	when: new Date(),
// 	maxDuration: 20
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
