import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vmtProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(vmtProfile, 'hafas-client-example')

const jena = '190014'
const gothaZOB = '167280'

let data = await client.locations('ohrdruf', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 50.975615,
// 	longitude: 11.032374
// })
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '980348376',
// 	address: 'Erfurt, Grafengasse 12',
// 	latitude: 50.975993, longitude: 11.031553
// }, {
// 	when: new Date('2020-03-04T10:00:00+01:00')
// })

// let data = await client.stop(jena, {linesOfStops: true}) // Dammtor

// let data = await client.departures(jena)
// let data = await client.arrivals(jena, {duration: 10, linesOfStops: true})

// let data = await client.journeys(jena, gothaZOB, {results: 1})
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
