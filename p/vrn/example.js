import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vrnProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vrnProfile, 'hafas-client-example')

const ludwigshafen = '8000236'
const meckesheim = '8003932'

let data = await client.locations('meckesheim', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980787337',
// 	address: 'Ludwigshafen am Rhein - Mitte, Pestalozzistraße 2',
// 	latitude: 49.474336, longitude: 8.441779,
// }, {
// 	when: new Date('2020-12-01T10:00:00+01:00'),
// 	maxDuration: 8,
// })

// let data = await client.stop(ludwigshafen, {linesOfStops: true})

// let data = await client.departures(ludwigshafen, {duration: 1})
// let data = await client.arrivals(ludwigshafen, {duration: 10, linesOfStops: true})

// let data = await client.journeys(ludwigshafen, meckesheim, {
// 	results: 1,
// 	polylines: true,
// })
// {
// 	const [journey] = data.journeys
// 	data = await client.refreshJourney(journey.refreshToken, {
// 		stopovers: true, remarks: true
// 	})
// }
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

// let data = await client.radar({
// 	north: 49.4940,
// 	west: 8.4560,
// 	south: 49.4774,
// 	east: 8.4834,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
