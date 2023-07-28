import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as stvProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(stvProfile, 'hafas-client example')

const grazSonnenhang = '460413500'
const grazHödlweg = '460415400'
const grazEisengasse10 = {
	type: 'location',
	id: '980027564',
	address: 'Eisengasse 10, 8020 Graz',
	latitude: 47.076553,
	longitude: 15.406064,
}

let data = await client.locations('sonnenhang', {results: 3})
// let data = await client.nearby(grazEisengasse10, {distance: 1000})
// let data = await client.reachableFrom(grazEisengasse10, {
// 	maxDuration: 30,
// })

// let data = await client.stop(grazSonnenhang, {linesOfStops: true})

// let data = await client.departures(grazSonnenhang, {duration: 1})
// let data = await client.arrivals(grazSonnenhang, {duration: 10, linesOfStops: true})

// let data = await client.journeys(grazSonnenhang, grazHödlweg, {
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
// 	const leg = journey.legs[0]
// 	data = await client.trip(leg.tripId, {polyline: true})
// }

console.log(inspect(data, {depth: null, colors: true}))
