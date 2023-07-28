import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vkgProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vkgProfile, 'hafas-client-example')

const spittalMittelschule = '420512200'
const klagenfurtSteingasse = '420649500'

let data = await client.locations('steingasse', {results: 3})
// let data = await client.stop(spittalMittelschule, {linesOfStops: true})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 46.617968,
// 	longitude: 14.297595,
// }, {distance: 500})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980025809',
// 	address: 'Eckengasse 9, 9020 Klagenfurt am Wörthersee',
// 	latitude: 46.617968,
// 	longitude: 14.297595,
// }, {
// 	maxDuration: 8,
// })

// let data = await client.departures(spittalMittelschule, {duration: 1})
// let data = await client.arrivals(spittalMittelschule, {duration: 10, linesOfStops: true})

// let data = await client.journeys(spittalMittelschule, klagenfurtSteingasse, {
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
