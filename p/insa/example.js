import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as insaProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(insaProfile, 'hafas-client-example')

const magdeburgNeustadt = '008010226'
const magdeburgBuckau = '008013456'
const hellestr1 = {
	type: 'location',
	id: '980801263',
	address: 'Magdeburg - Leipziger Straße, Hellestraße 1',
	latitude: 52.116706, longitude: 11.621821
}

let data = await client.locations('Magdeburg Hbf', {results: 2})
// let data = await client.locations('Kunstmuseum Kloster Unser Lieben Frauen Magdeburg', {results: 2})
// let data = await client.nearby(hellestr1)
// let data = await client.reachableFrom(hellestr1, {maxDuration: 10})

// let data = await client.stop(magdeburgNeustadt)

// let data = await client.departures(magdeburgNeustadt, { duration: 5 })
// let data = await client.arrivals('8010226', {duration: 10, linesOfStops: true})

// let data = await client.journeys(magdeburgNeustadt, magdeburgBuckau, {results: 1})
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
// 	data = await client.trip(leg.tripId, leg.line.name)
// }

// let data = await client.radar({
// 	north: 52.148364,
// 	west: 11.600826,
// 	south: 52.108486,
// 	east: 11.651451
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
