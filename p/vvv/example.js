import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vvvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vvvProfile, 'hafas-client example')

const bregenzLandeskrankenhaus = '480195700'
const bludenzGymnasium = '480031300'

let data = await client.locations('krankenhaus', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	id: '980010311',
// 	address: 'Austraße 37, 6700 Bludenz',
// 	latitude: 47.149626,
// 	longitude: 9.822693,
// }, {distance: 1000})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980010311',
// 	address: 'Austraße 37, 6700 Bludenz',
// 	latitude: 47.149626,
// 	longitude: 9.822693,
// }, {
// 	maxDuration: 30,
// })

// let data = await client.stop(bregenzLandeskrankenhaus, {linesOfStops: true})

// let data = await client.departures(bregenzLandeskrankenhaus, {duration: 1})
// let data = await client.arrivals(bregenzLandeskrankenhaus, {
// 	duration: 10,
// 	linesOfStops: true,
// })

// let data = await client.journeys(bregenzLandeskrankenhaus, bludenzGymnasium, {
// 	results: 1, stopovers: true,
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

console.log(inspect(data, {depth: null, colors: true}))
