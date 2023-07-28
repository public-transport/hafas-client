import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as salzburgProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(salzburgProfile, 'hafas-client example')

const salzburgGaswerkgasse = '455001300'
const oberndorfKrankenhaus = '455110200'
const salzburgRupertgasse5 = {
	type: 'location',
	id: '980100611',
	address: 'Rupertgasse 5, 5020 Salzburg',
	latitude: 47.806891,
	longitude: 13.050503,
}

let data = await client.locations('krankenhaus', {results: 3})
// let data = await client.nearby(salzburgRupertgasse5, {distance: 1000})
// let data = await client.reachableFrom(salzburgRupertgasse5, {
// 	maxDuration: 30,
// })

// let data = await client.stop(salzburgGaswerkgasse, {linesOfStops: true})

// let data = await client.departures(salzburgGaswerkgasse, {duration: 1})
// let data = await client.arrivals(salzburgGaswerkgasse, {
// 	duration: 10,
// 	linesOfStops: true,
// })

// let data = await client.journeys(salzburgGaswerkgasse, oberndorfKrankenhaus, {
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
