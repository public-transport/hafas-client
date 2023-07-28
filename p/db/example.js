import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as dbProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(dbProfile, 'hafas-client-example')

const berlinJungfernheide = '8011167'
const münchenHbf = '8000261'
const regensburgHbf = '8000309'

let data = await client.locations('Berlin Jungfernheide')
// let data = await client.locations('Atze Musiktheater', {
// 	poi: true,
// 	addressses: false,
// 	fuzzy: false,
// })
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 52.4751309,
// 	longitude: 13.3656537
// }, {results: 1})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	address: '13353 Berlin-Wedding, Torfstr. 17',
// 	latitude: 52.541797,
// 	longitude: 13.350042
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 50
// })

// let data = await client.stop(regensburgHbf)

// let data = await client.departures(berlinJungfernheide, {duration: 1})
// let data = await client.arrivals(berlinJungfernheide, {duration: 10, linesOfStops: true})

// let data = await client.journeys(berlinJungfernheide, münchenHbf, {
// 	results: 1,
// 	tickets: true,
// })
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }
// {
// 	const [journey] = data.journeys
// 	data = await client.refreshJourney(journey.refreshToken, {
// 		stopovers: true,
// 		remarks: true,
// 	})
// }

// let data = await client.radar({
// 	north: 52.52411,
// 	west: 13.41002,
// 	south: 52.51942,
// 	east: 13.41709
// }, {results: 10})

// let data = await client.journeys('8011113', '8000261', {
// 	departure: Date.now() - 2 * 60 * 60 * 1000,
// 	results: 1, stopovers: true, transfers: 1
// })
// {
// 	const leg = journeys[0].legs.find(l => l.line && l.line.product === 'nationalExpress')
// 	const prevStopover = leg.stopovers.find((st) => {
// 		return st.departure && Date.parse(st.departure) < Date.now()
// 	})
// 	data = await client.journeysFromTrip(leg.tripId, prevStopover, '8000207')
// }

console.log(inspect(data, {depth: null, colors: true}))
