import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vbnProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vbnProfile, 'hafas-client-example')

const bremerhavenHbf = '9014418'
const verden = '9093627'
const bremenRutenstr = {
	type: 'location',
	id: '990025693',
	address: 'Bremen Rutenstraße 1',
	latitude: 53.074165, longitude: 8.8184
}

let data = await client.locations('oldenburg', {results: 2})
// let data = await client.nearby(bremenRutenstr)
// let data = await client.reachableFrom(bremenRutenstr, {
// 	maxDuration: 10
// })

// let data = await client.stop(bremerhavenHbf, {linesOfStops: true})

// let data = await client.departures(bremerhavenHbf, {duration: 1})
// let data = await client.arrivals(bremerhavenHbf, {duration: 10, linesOfStops: true})

// let data = await client.journeys(bremerhavenHbf, verden, {results: 1})
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
// 	north: 53.087,
// 	west: 8.777,
// 	south: 53.072,
// 	east: 8.835
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
