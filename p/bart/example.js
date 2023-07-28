import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as bartProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(bartProfile, 'hafas-client-example')

const fremont = '100013296'
const embarcadero = '100013295'

let data = await client.locations('embarcadero', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 38.554779,
// 	longitude: -121.738798,
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980557173',
// 	address: '1000 Alice St, Davis, 95616',
// 	latitude: 38.554779,
// 	longitude: -121.738798,
// }, {
// 	maxDuration: 8,
// })

// let data = await client.stop(fremont, {linesOfStops: true})

// let data = await client.departures(fremont, {duration: 1})
// let data = await client.arrivals(fremont, {duration: 10, linesOfStops: true})

// let data = await client.journeys(fremont, embarcadero, {results: 1, stopovers: true})
// {
// 	const [journey] = data.journeys
// 	data = await client.refreshJourney(journey.refreshToken, {
// 		stopovers: true,
// 		remarks: true,
// 	})
// }
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

// let data = await client.radar({
// 	north: 37.8735,
// 	west: -122.5250,
// 	south: 37.6884,
// 	east: -122.2105,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
