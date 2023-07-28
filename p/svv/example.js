import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as svvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(svvProfile, 'hafas-client-example')

const sam = '455086100'
const volksgarten = '455082100'
const zillnerstr2 = {
	type: 'location',
	id: '980133005',
	address: 'Zillnerstraße 2, 5020 Salzburg',
	latitude: 47.801434, longitude: 13.031006,
}

let data = await client.locations('salzburg sam', {results: 2})
// let data = await client.nearby(zillnerstr2)
// let data = await client.reachableFrom(zillnerstr2, {
// 	when: new Date('2020-06-01T10:00:00+0200'),
// })

// let data = await client.stop(sam, {linesOfStops: true})

// let data = await client.departures(sam, {duration: 1})
// let data = await client.arrivals(sam, {duration: 10, linesOfStops: true})

// let data = await client.journeys(sam, volksgarten, {results: 1, polylines: true})
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
