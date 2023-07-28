import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as oebbProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(oebbProfile, 'hafas-client-example')

const westbahnhof = '1291501'
const salzburgHbf = '8100002'
const grazHbf = '8100173'

let data = await client.locations('Salzburg', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 47.812851,
// 	longitude: 13.045604
// }, {distance: 60})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '970053039',
// 	name: 'Graz, BILLA, Hauptplatz',
// 	latitude: 47.070656,
// 	longitude: 15.438002
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

// let data = await client.stop(grazHbf)

// let data = await client.departures(salzburgHbf, {duration: 1})
// let data = await client.arrivals(salzburgHbf, {duration: 10, linesOfStops: true})

// let data = await client.journeys(westbahnhof, salzburgHbf, {results: 1})
// {
// 	const [journey] = data.journeys
// 	data = await client.refreshJourney(journey.refreshToken, {
// 		stopovers: true,
// 		remarks: true,
// 	})
// }
// {
// 	const [journey] = data.journeys
// 	const [leg] = journey.legs
// 	data = await client.trip(leg.tripId, leg.line.name)
// }

// let data = await client.radar({
// 	north: 47.827203,
// 	west: 13.001261,
// 	south: 47.773278,
// 	east: 13.07562
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
