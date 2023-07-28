import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vorProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vorProfile, 'hafas-client example')

const stPöltenLinzerTor = '431277900'
const eisenstadtSchlossplatz = '415003300'

let data = await client.locations('schlossplatz', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	id: '980021284',
// 	address: 'Christalniggasse 6, 2500 Baden',
// 	latitude: 48.005516,
// 	longitude: 16.241404,
// }, {distance: 1000})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980021284',
// 	address: 'Christalniggasse 6, 2500 Baden',
// 	latitude: 48.005516,
// 	longitude: 16.241404,
// }, {
// 	maxDuration: 30,
// })

// let data = await client.stop(stPöltenLinzerTor, {linesOfStops: true})

// let data = await client.departures(stPöltenLinzerTor, {duration: 20})
// let data = await client.arrivals(stPöltenLinzerTor, {duration: 10, linesOfStops: true})

// let data = await client.journeys(stPöltenLinzerTor, eisenstadtSchlossplatz, {
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
// 	const leg = journey.legs.find(l => !!l.line)
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

console.log(inspect(data, {depth: null, colors: true}))
