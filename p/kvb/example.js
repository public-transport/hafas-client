import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as kvbProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(kvbProfile, 'hafas-client example')

const heumarkt = '900000001'
const poststr = '900000003'

let data = await client.locations('heumarkt', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	id: '991023531',
// 	address: 'An den Dominikanern 27',
// 	latitude: 50.942454, longitude: 6.954064,
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '991023531',
// 	address: 'An den Dominikanern 27',
// 	latitude: 50.942454, longitude: 6.954064,
// }, {
// 	maxDuration: 15,
// })

// let data = await client.stop(heumarkt, {linesOfStops: true})

// let data = await client.departures(heumarkt, {duration: 1})
// let data = await client.arrivals(heumarkt, {duration: 10, linesOfStops: true})

// let data = await client.journeys(heumarkt, poststr, {
// 	results: 1, stopovers: true,
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

console.log(inspect(data, {depth: null, colors: true}))
