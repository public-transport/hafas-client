import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as rejseplanenProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(rejseplanenProfile, 'hafas-client-example')

const københavnCentral = '8600626'
const aalborg = '8600020'

let data = await client.locations('Københaven', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 55.673,
// 	longitude: 12.566
// }, {distance: 200})

// let data = await client.stop(københavnCentral) // København Central

// let data = await client.departures(københavnCentral, {duration: 5})

// let data = await client.journeys(københavnCentral, aalborg, {results: 1})
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, leg.line.name)
// }

// let data = await client.radar({
// 	north: 55.673,
// 	west: 12.566,
// 	south: 55.672,
// 	east: 12.567
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
