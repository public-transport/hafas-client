import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as pkpProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(pkpProfile, 'hafas-client-example')

const wrocławGł = '5100069'
const krakówGł = '5100028'

let data = await client.locations('kraków', {results: 2})
// let data = await client.stop(krakówGł, {linesOfStops: true})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 50.067192,
// 	longitude: 19.947423
// }, {distance: 60})
// let data = await client.radar({
// 	north: 50.2,
// 	west: 19.8,
// 	south: 49.9,
// 	east: 20.1
// }, {results: 10})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: 'Bydgoszcz, Dworcowa 100',
// 	latitude: 53.1336648,
// 	longitude: 17.9908571
// }, {
// 	when: new Date(),
// 	maxDuration: 20
// })

// let data = await client.departures(krakówGł, {duration: 10})
// let data = await client.arrivals(krakówGł, {duration: 10, linesOfStops: true})

// let data = await client.journeys(krakówGł, wrocławGł, {
// 	results: 1,
// 	polylines: true,
// })
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

console.log(inspect(data, {depth: null, colors: true}))
