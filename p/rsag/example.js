import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as rsagProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(rsagProfile, 'hafas-client-example')

const rostockHbf = '8010304'
const güstrow = '8010153'
const albertEinsteinStr = {
	type: 'location',
	id: '990004201',
	address: 'Rostock - Südstadt, Albert-Einstein-Straße 23',
	latitude: 54.077208, longitude: 12.108299
}

let data = await client.locations('güstrow', {results: 2})
// let data = await client.nearby(albertEinsteinStr)
// let data = await client.reachableFrom(albertEinsteinStr, {
// 	when: new Date('2020-03-03T10:00:00+01:00'),
// 	maxDuration: 10
// })

// let data = await client.stop(rostockHbf, {linesOfStops: true}) // Dammtor

// let data = await client.departures(rostockHbf, {duration: 1})
// let data = await client.arrivals(rostockHbf, {duration: 10, linesOfStops: true})

// let data = await client.journeys(rostockHbf, güstrow, {results: 1})
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
// 	north: 54.177,
// 	west: 11.959,
// 	south: 54.074,
// 	east: 12.258
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
