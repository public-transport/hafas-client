import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vsnProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vsnProfile, 'hafas-client-example')

const göttingenJugendherberge = '9033961'
const göttingenJüdenstr = '9033962'

let data = await client.locations('jugendherberge', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: 'Hamburg, Holstenwall 9',
// 	latitude: 53.553766,
// 	longitude: 9.977514
// }, {
// 	when: new Date('2019-05-16T10:00:00+0200'),
// 	maxDuration: 8
// })

// let data = await client.stop(göttingenJugendherberge, {linesOfStops: true})

// let data = await client.departures(göttingenJugendherberge, {duration: 1})
// let data = await client.arrivals(göttingenJugendherberge, {duration: 10, linesOfStops: true})

// let data = await client.journeys(göttingenJugendherberge, göttingenJüdenstr, {
// 	results: 1,
// 	polylines: true,
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
// 	north: 53.55,
// 	west: 9.95,
// 	south: 52.51,
// 	east: 10
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
