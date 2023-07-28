import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as sncbProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(sncbProfile, 'hafas-client-example')

const gentStPieters = '8892007'
const bruxellesMidi = '8814001'
const gentPaddenhoek = {
	type: 'location',
	address: 'Gent, Paddenhoek',
	latitude: 51.0517, longitude: 3.724878,
}

let data = await client.locations('gent')
// let data = await client.nearby(gentPaddenhoek)
// let data = await client.reachableFrom(gentPaddenhoek)

// let data = await client.stop(gentStPieters, {linesOfStops: true})

// let data = await client.departures(gentStPieters)
// let data = await client.arrivals(gentStPieters, {duration: 10, linesOfStops: true})

// let data = await client.journeys(gentStPieters, bruxellesMidi, {
// 	stopovers: true,
// 	remarks: true,
// })
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }
// {
// 	const [journey] = data.journeys
// 	data = await client.refreshJourney(journey.refreshToken, {remarks: true})
// }

// let data = await client.radar({
// 	north: 51.065,
// 	west: 3.688,
// 	south: 51.04,
// 	east: 3.748
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
