import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as dartProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(dartProfile, 'hafas-client example')

const mlkJrPkwyAdamsAveDsm2055 = '100002702'
const se5thStEHackleyAveDsm2294 = '100004972'

let data = await client.locations('adams ave', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	id: '980010311',
// 	address: 'Austraße 37, 6700 Bludenz',
// 	latitude: 41.6056,
// 	longitude: -93.5916,
// }, {distance: 1000})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	latitude: 41.613584,
// 	longitude: -93.881803,
// 	address: 'Laurel St, Waukee, 50263',
// }, {
// 	maxDuration: 20,
// })

// let data = await client.stop(mlkJrPkwyAdamsAveDsm2055, {linesOfStops: true})

// let data = await client.departures(mlkJrPkwyAdamsAveDsm2055, {duration: 10})
// let data = await client.arrivals(mlkJrPkwyAdamsAveDsm2055, {linesOfStops: true})

// let data = await client.journeys(mlkJrPkwyAdamsAveDsm2055, se5thStEHackleyAveDsm2294, {
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
// 	const leg = journey.legs.find(l => !!l.line)
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

// let data = await client.radar({
// 	north: 41.6266,
// 	west: -93.7299,
// 	south: 41.5503,
// 	east: -93.5699,
// })

console.log(inspect(data, {depth: null, colors: true}))
