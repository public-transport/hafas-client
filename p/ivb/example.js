import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as ivbProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(ivbProfile, 'hafas-client example')

const innsbruckGriesauweg = '476162400'
const völsWest = '476431800'
const lönsstr9 = {
	type: 'location',
	id: '980076175',
	address: 'Lönsstraße 9, 6020 Innsbruck',
	latitude: 47.262765,
	longitude: 11.419851,
}

let data = await client.locations('griesauweg', {results: 3})
// let data = await client.nearby(lönsstr9, {distance: 1000})
// let data = await client.reachableFrom(lönsstr9, {
// 	maxDuration: 30,
// })

// let data = await client.stop(innsbruckGriesauweg, {linesOfStops: true})

// let data = await client.departures(innsbruckGriesauweg, {duration: 1})
// let data = await client.arrivals(innsbruckGriesauweg, {duration: 10, linesOfStops: true})

// let data = await client.journeys(innsbruckGriesauweg, völsWest, {
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
