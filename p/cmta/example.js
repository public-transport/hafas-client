import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as cmtaProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(cmtaProfile, 'hafas-client-example')

const broadieOaks = '000002370'
const domain = '000005919'

let data = await client.locations('Westgate', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 30.266222,
// 	longitude: -97.746058
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: '604 W 9TH ST, Austin, TX 78701',
// 	latitude: 30.272910,
// 	longitude: -97.747883
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 15
// })

// let data = await client.stop('000005534') // Downtown light rail station

// let data = await client.departures(broadieOaks, {duration: 1})
// let data = await client.arrivals(broadieOaks, {duration: 10, linesOfStops: true})

// let data = await client.journeys(broadieOaks, domain, {results: 1, polylines: true})
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
// 	north: 30.240877,
// 	west: -97.804588,
// 	south: 30.225378,
// 	east: -97.786692
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
