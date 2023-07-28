import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as irishProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(irishProfile, 'hafas-client example')

const dublin = '9909002'
const belfastCentral = '9990840'

let data = await client.locations('Dublin', {results: 2})
// let data = await client.locations('Hochschule Dublin', {
// 	poi: true,
// 	addressses: false,
// 	fuzzy: false,
// })
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 53.353,
// 	longitude: -6.247
// }, {distance: 200})

// let data = await client.stop(dublin) // Dublin

// let data = await client.departures(dublin, {duration: 5})
// let data = await client.arrivals(dublin, {duration: 10, linesOfStops: true})

// let data = await client.journeys(dublin, belfastCentral, {results: 1})
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

// let data = await client.radar({
// 	north: 53.35,
// 	west: -6.245,
// 	south: 53.34,
// 	east: -6.244
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
