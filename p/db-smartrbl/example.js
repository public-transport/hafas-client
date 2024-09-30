import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as dbProfile} from './index.js'

const client = createClient(dbProfile, 'eoqifjefoijf')

const berlinOstbahnhof = '8010255'
const freiburgHbf = '8000107'

// let data = await client.locations('freiburg')

let data = await client.journeys(berlinOstbahnhof, freiburgHbf, {results: 1, tickets: true})
// {
// 	const {journeys} = data
// 	const leg = journeys[0].legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }
// {
// 	const {journeys} = data
// 	const [journey] = journeys
// 	data = await client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// }

// let data = await client.departures(berlinOstbahnhof)
// let data = await client.arrivals(berlinOstbahnhof, {duration: 10, linesOfStops: true})
// let data = await client.stop(berlinOstbahnhof)
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
// 	when: new Date('2023-08-27T10:00+02:00'),
// 	maxDuration: 50
// })
// let data = await client.radar({
// 	north: 52.52411,
// 	west: 13.41002,
// 	south: 52.51942,
// 	east: 13.41709
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
