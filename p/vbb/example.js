import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vbnProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vbnProfile, 'foo')

const hauptbahnhof = '900003201'
const charlottenburg = '900024101'
const kottbusserTor = '900013102'
const spichernstr = '900042101'

let data = await client.locations('hansaplatz', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 52.5137344,
// 	longitude: 13.4744798
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: '13353 Berlin-Wedding, Torfstr. 17',
// 	latitude: 52.541797,
// 	longitude: 13.350042
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 10
// })

// let data = await client.stop(spichernstr, {linesOfStops: true}) // Spichernstr

// let data = await client.departures(kottbusserTor, {duration: 1})
// let data = await client.arrivals(kottbusserTor, {duration: 10, linesOfStops: true})

// let data = await client.journeys(hauptbahnhof, charlottenburg, {
// 	results: 1,
// 	polylines: true,
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
// 	north: 52.52411,
// 	west: 13.41002,
// 	south: 52.51942,
// 	east: 13.41709
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
