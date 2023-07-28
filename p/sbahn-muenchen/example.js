import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as sMuenchenProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(sMuenchenProfile, 'hafas-client-example')

const mittersendling = '8004154'
const charlottenburg = '0621790'

let data = await client.locations('mittersendling', {results: 5})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 48.153858,
// 	longitude: 11.533059
// }, {distance: 750})
// let data = await client.reachableFrom({
// 	type: 'location',
//     address: 'Pötschnerstraße 3, neuhausen',
//     latitude: 48.152499,
//     longitude: 11.531695
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

// let data = await client.stop(mittersendling, {linesOfStops: true})

// let data = await client.departures(mittersendling, {duration: 5})
// let data = await client.arrivals(mittersendling, {duration: 10, linesOfStops: true})

// let data = await client.journeys(mittersendling, charlottenburg, {
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
// 	const leg = journey.legs.find(leg => leg.line)
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

// let data = await client.radar({
// 	north: 48.145121,
// 	west: 11.543736,
// 	south: 48.138339,
// 	east: 11.553776
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
