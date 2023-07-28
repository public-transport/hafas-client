import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as ooevvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(ooevvProfile, 'hafas-client example')

const linzTheatergasse = '444670100'
const amstettenStadtbad = '431507400'

let data = await client.locations('theatergasse', {results: 3})
// let data = await client.nearby({
// 	type: 'location',
// 	id: '980115190',
// 	address: 'Steingasse 19, 4020 Linz',
// 	latitude: 48.301181,
// 	longitude: 14.284057,
// }, {distance: 1000})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980115190',
// 	address: 'Steingasse 19, 4020 Linz',
// 	latitude: 48.301181,
// 	longitude: 14.284057,
// }, {
// 	maxDuration: 30,
// })

// let data = await client.stop(linzTheatergasse, {linesOfStops: true})

// let data = await client.departures(linzTheatergasse, {duration: 12 * 60})
// let data = await client.arrivals(linzTheatergasse, {duration: 10, linesOfStops: true})

// let data = await client.journeys(linzTheatergasse, amstettenStadtbad, {
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
