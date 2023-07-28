import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as nvvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(nvvProfile, 'hafas-client-example')

const scheidemannplatz = '2200073'
const auestadion = '2200042'

let data = await client.locations('kirchweg', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 51.313,
// 	longitude: 9.4654
// }, {distance: 400})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '990100251',
// 	address: 'Kassel, Heckerstraße 2',
// 	latitude: 51.308108,
// 	longitude: 9.475152
// }, {
// 	when: new Date('2019-04-02T10:00:00+0200'),
// 	maxDuration: 10
// })

// let data = await client.stop('2200005', {linesOfStops: true}) // Kassel Kirchweg

// let data = await client.departures('2200005', {duration: 1})
// let data = await client.arrivals('2200005', {duration: 10, linesOfStops: true})

// let data = await client.journeys(scheidemannplatz, auestadion, {
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
// 	const leg = journey.legs.find(l => !!l.line)
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

// let data = await client.radar({
// 	north: 51.320153,
// 	west: 9.458359,
// 	south: 51.304304,
// 	east: 9.493672
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
