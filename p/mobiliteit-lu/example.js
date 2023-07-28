import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as mobiliteitluProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(mobiliteitluProfile, 'hafas-client example')

const mersch = '160904011'
const luxembourgCentral = '200405060'

let data = await client.locations('mersch', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 49.7523,
// 	longitude: 6.1103
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '990005227',
// 	address: 'Mersch, Rue Mies 1',
// 	latitude: 49.746044, longitude: 6.102228,
// }, {
// 	maxDuration: 30
// })

// let data = await client.stop(mersch)

// let data = await client.departures(mersch, {duration: 5})
// let data = await client.arrivals(mersch, {duration: 10, linesOfStops: true})

// let data = await client.journeys(mersch, luxembourgCentral, {results: 1})
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }
// {
// 	const [journey] = data.journeys
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
