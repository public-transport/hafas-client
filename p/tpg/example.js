import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as tpgProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(tpgProfile, 'hafas-client-example')

const miremont = '100449'
const moillebeau = '100451'

let data = await client.locations('miremont', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 46.197768,
// 	longitude: 6.148046,
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '990001624',
// 	address: 'Cours des Bastions 10, 1205 Genève',
// 	latitude: 46.197768,
// 	longitude: 6.148046,
// }, {
// 	maxDuration: 10,
// })

// let data = await client.stop(miremont, {linesOfStops: true})

// let data = await client.departures(miremont, {duration: 1})
// let data = await client.arrivals(miremont, {duration: 10, linesOfStops: true})

// let data = await client.journeys(miremont, moillebeau, {
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
// 	north: 46.1849,
// 	east: 6.1919,
// 	south: 46.2215,
// 	west: 6.1192,
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
