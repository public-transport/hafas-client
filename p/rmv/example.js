import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as rmvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(rmvProfile, 'hafas-client-example')

const marburgHbf = '3010011'
const mainzGonsenheim = '3011332'
const offenbachLiebigstr = {
	type: 'location',
	id: '990148095',
	address: 'Offenbach am Main, Liebigstraße 22',
	latitude: 50.096326, longitude: 8.759979
}

let data = await client.locations('wiesbaden igstadt', {results: 2})
// let data = await client.nearby(offenbachLiebigstr)
// let data = await client.reachableFrom(offenbachLiebigstr, {
// 	when: new Date('2020-03-03T10:00:00+01:00'),
// 	maxDuration: 10
// })

// let data = await client.stop(marburgHbf, {linesOfStops: true}) // Dammtor

// let data = await client.departures(marburgHbf, {duration: 1})
// let data = await client.arrivals(marburgHbf, {duration: 10, linesOfStops: true})

// let data = await client.journeys(marburgHbf, mainzGonsenheim, {results: 1})
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
// 	north: 50.125,
// 	west: 8.661,
// 	south: 50.098,
// 	east: 8.71
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
