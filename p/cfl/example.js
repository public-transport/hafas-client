import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as cflProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(cflProfile, 'hafas-client-example')

const mersch = '9864348'
const bruxellesCentral = '8800003'

let data = await client.locations('mersch', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 49.7523,
// 	longitude: 6.1103
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980005067',
// 	address: '7557 Mersch, Rue Mies 1',
// 	latitude: 49.746044,
// 	longitude: 6.102228,
// }, {
// 	maxDuration: 30,
// })

// let data = await client.stop(mersch)

// let data = await client.departures(mersch, {duration: 5})
// let data = await client.arrivals(mersch, {duration: 10, linesOfStops: true})

// let data = await client.journeys(mersch, bruxellesCentral, {results: 1})
// {
// 	const [journey] = data.journeys
// 	const [leg] = journey.legs
// 	data = await client.trip(leg.tripId, {polyline: true})
// }
// {
// 	const [journey] = journeys
// 	data = await client.refreshJourney(journey.refreshToken, {
// 		stopovers: true,
// 		remarks: true,
// 	})
// }

// let data = await client.radar({
// 	north: 49.9,
// 	west: 6.11,
// 	south: 49.7,
// 	east: 6.13
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
