import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as invgProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(invgProfile, 'hafas-client-example')

const ingolstadtHbf = '8000183'
const audiParkplatz = '84999'

let data = await client.locations('tillystr 1', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 48.74453,
// 	longitude: 11.43733
// }, {distance: 200})
// // todo: `reachableFrom` with `Ingolstadt, Tillystraße 1` 48.745769 | 11.432814

// let data = await client.stop(audiParkplatz)

// let data = await client.departures(ingolstadtHbf, {duration: 5})
// let data = await client.arrivals(ingolstadtHbf, {duration: 10, stationLines: true})

// let data = await client.journeys(ingolstadtHbf, audiParkplatz, {results: 1})
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
// 	north: 48.74453,
// 	west: 11.42733,
// 	south: 48.73453,
// 	east: 11.43733
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
