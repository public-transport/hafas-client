import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as mobilNrwProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(mobilNrwProfile, 'hafas-client-example')

const soest = '8000076'
const aachenHbf = '8000001'

let data = await client.locations('soest', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 51.4503,
// 	longitude: 6.6581,
// }, {distance: 1200})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980301639',
// 	latitude: 51.387609,
// 	longitude: 6.684019,
// 	address: 'Duisburg, Am Mühlenberg 1',
// }, {
// 	maxDuration: 15,
// })

// let data = await client.stop(soest)

// let data = await client.departures(soest, {duration: 20})

// let data = await client.journeys(soest, aachenHbf, {
// 	results: 1,
// 	stopovers: true,
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
// 	north: 51.4358,
// 	west: 6.7625,
// 	south: 51.4214,
// 	east: 6.7900,
// }, {results: 10})

// let data = await client.remarks()

console.log(inspect(data, {depth: null, colors: true}))
