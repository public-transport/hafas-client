import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vvtProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vvtProfile, 'hafas-client-example')

const innsbruckMitterweg = '476152300'
const kufsteinListstr = '476603100'

let data = await client.locations('liststr', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 500})
// let data = await client.reachableFrom( {
// 	type: 'location',
// 	id: '980113702',
// 	address: 'Stadlweg 1, 6020 Innsbruck',
// 	latitude: 47.267106,
// 	longitude: 11.426701,
// }, {
// 	maxDuration: 8,
// })

// let data = await client.stop(innsbruckMitterweg, {linesOfStops: true})

// let data = await client.departures(innsbruckMitterweg, {duration: 1})
// let data = await client.arrivals(innsbruckMitterweg, {
// 	duration: 10,
// 	linesOfStops: true,
// })

// let data = await client.journeys(innsbruckMitterweg, kufsteinListstr, {
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

console.log(inspect(data, {depth: null, colors: true}))
