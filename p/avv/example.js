import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as avvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(avvProfile, 'hafas-client-example')

const rwth = '1057'
const kronenberg = '1397'

let data = await client.locations('kronenberg', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 50.770607,
// 	longitude: 6.104637,
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '990000745',
// 	address: 'Aachen, Charlottenstraße 11',
// 	latitude: 50.770607,
// 	longitude: 6.104637,
// }, {
// 	maxDuration: 8,
// })

// let data = await client.stop(rwth, {linesOfStops: true})

// let data = await client.departures(rwth, {duration: 1})
// let data = await client.arrivals(rwth, {duration: 10, linesOfStops: true})

// let data = await client.journeys(rwth, kronenberg, {results: 1, stopovers: true})
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
// 	north: 50.78141,
// 	west: 6.06031,
// 	south: 50.75022,
// 	east: 6.10316,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
