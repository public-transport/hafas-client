import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as saarfahrplanProfile} from './index.js'

// Pick a descriptive user agent! hafas-client won't work with this string.
const client = createClient(saarfahrplanProfile, 'hafas-client-example')

const heusweilerKirschhof = '15541'
const saarbrückenUhlandstr = '10609'

let data = await client.locations('uhlandstr', {results: 2})
// let data = await client.nearby({
// 	type: 'location',
// 	latitude: 49.229498,
// 	longitude: 7.008609
// }, {distance: 400})
// let data = await client.reachableFrom({
// 	type: 'location',
// 	id: '009000763',
// 	latitude: 49.235223,
// 	longitude: 6.996493,
// 	name: 'Saarbrücken, Rathaus'
// }, {maxDuration: 20})

// let data = await client.stop(saarbrückenUhlandstr)

// let data = await client.departures(heusweilerKirschhof, {duration: 1})
// let data = await client.arrivals(heusweilerKirschhof, {
// 	duration: 10,
// 	linesOfStops: true,
// })

// let data = await client.journeys(heusweilerKirschhof, saarbrückenUhlandstr, {
// 	results: 1,
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
// 	data = await client.trip(leg.id, leg.line.name, {polyline: true})
// }

// let data = await client.radar({
// 	north: 49.244044,
// 	west: 6.987644,
// 	south: 49.235332,
// 	east: 7.006480
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
