import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as nahshProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(nahshProfile, 'hafas-client-example')

const flensburgHbf = '8000103'
const kielHbf = '8000199'

let data = await client.locations('Schleswig', {results: 1})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 54.295691,
// 	longitude: 10.116424
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: 'Husum, Berliner Straße 80',
// 	latitude: 54.488995,
// 	longitude: 9.056263
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

// let data = await client.stop('706990') // Kiel Holunderbusch

// let data = await client.departures(kielHbf, {duration: 10})
// let data = await client.arrivals(kielHbf, {duration: 5, linesOfStops: true})

// let data = await client.journeys(flensburgHbf, kielHbf, {
// 	results: 10,
// 	tickets: true,
// })
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
// 	north: 54.4,
// 	west: 10.0,
// 	south: 54.2,
// 	east: 10.2
// }, {
// 	results: 10,
// })

console.log(inspect(data, {depth: null, colors: true}))
