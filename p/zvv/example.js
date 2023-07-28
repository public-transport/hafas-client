import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as zvvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(zvvProfile, 'hafas-client-example')

const bürkliplatz = '8591105'

let data = await client.locations('bürkli', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 47.366,
// 	longitude: 8.54,
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: 'Talstrasse',
// 	latitude: 47.366,
// 	longitude: 8.54,
// }, {
// 	when: new Date('2020-08-03T10:00:00+0200'),
// 	maxDuration: 8
// })

// let data = await client.stop(bürkliplatz, {
// 	linesOfStops: true,
// })

// let data = await client.departures(bürkliplatz, {duration: 1})
// let data = await client.arrivals(bürkliplatz, {
// 	duration: 10,
// 	linesOfStops: true,
// })

// let data = await client.journeys(bürkliplatz, '8591123', {results: 1, polylines: true})
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
// 	north: 47.387,
// 	west: 8.514,
// 	south: 47.356,
// 	east: 8.568,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
