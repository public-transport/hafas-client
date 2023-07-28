import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as dbbusradarnrwProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(dbbusradarnrwProfile, 'hafas-client-example')

const hagenBauhaus = '3307002'
const schwerteBahnhof = '3357026'

let data = await client.locations('Hagen Vorhalle')
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 51.38,
// 	longitude: 7.45
// }, {results: 1})

// let data = await client.stop(hagenBauhaus) // Hagen Bauhaus

// let data = await client.departures(hagenBauhaus, {duration: 60})
// let data = await client.arrivals(hagenBauhaus, {duration: 30, linesOfStops: true})

// let data = await client.journeys(hagenBauhaus, schwerteBahnhof, {results: 1})
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
// 	north: 51.5,
// 	west: 7.2,
// 	south: 51.2,
// 	east: 7.8
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
