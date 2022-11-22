import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as tpgProfile} from './index.js'

const client = createClient(tpgProfile, 'hafas-client-example')

const miremont = '100449'
const moillebeau = '100451'

client.journeys(miremont, moillebeau, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(miremont, {duration: 1})
// client.arrivals(miremont, {duration: 10, linesOfStops: true})
// client.radar({
// 	north: 46.1849,
// 	east: 6.1919,
// 	south: 46.2215,
// 	west: 6.1192,
// }, {results: 10})

// client.locations('miremont', {results: 3})
// client.stop(miremont, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 46.197768,
// 	longitude: 6.148046,
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '990001624',
// 	address: 'Cours des Bastions 10, 1205 Genève',
// 	latitude: 46.197768,
// 	longitude: 6.148046,
// }, {
// 	maxDuration: 10,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
