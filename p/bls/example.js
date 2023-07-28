import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as blsProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(blsProfile, 'hafas-client-example')

const bernDennigkofengässli = '8590093'
const münsingenSpital = '8578932'

let data = await client.locations('münsingen spital', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '990017698',
// 	address: 'Bern, Schänzlihalde 17',
// 	latitude: 46.952835,
// 	longitude: 7.447527,
// }, {
// 	maxDuration: 10,
// })

// let data = await client.stop(bernDennigkofengässli, {linesOfStops: true})

// let data = await client.departures(bernDennigkofengässli, {duration: 1})
// let data = await client.arrivals(bernDennigkofengässli, {duration: 10, linesOfStops: true})

// let data = await client.journeys(bernDennigkofengässli, münsingenSpital, {
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
// 	north: 46.969,
// 	west: 7.3941,
// 	south: 46.921,
// 	east: 7.5141,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
