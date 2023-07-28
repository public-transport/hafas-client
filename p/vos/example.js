import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vosProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vosProfile, 'hafas-client-example')

const saarplatz = '9071733'
const finkenweg = '9071574'

let data = await client.locations('finkenweg', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '990121407',
// 	address: 'Osnabrück Sandstraße 20',
// 	latitude: 52.266313,
// 	longitude: 8.033255,
// }, {
// 	maxDuration: 8,
// })

// let data = await client.stop(saarplatz, {linesOfStops: true})

// let data = await client.departures(saarplatz, {duration: 1})
// let data = await client.arrivals(saarplatz, {duration: 10, linesOfStops: true})

// let data = await client.journeys(saarplatz, finkenweg, {results: 1, stopovers: true})
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
// 	north: 52.283258,
// 	west: 8.039188,
// 	south: 52.263653,
// 	east: 8.07225,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
