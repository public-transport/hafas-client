import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vosProfile} from './index.js'

const client = createClient(vosProfile, 'hafas-client-example')

const saarplatz = '9071733'
const finkenweg = '9071574'

// client.journeys(saarplatz, finkenweg, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(saarplatz, {duration: 1})
// client.arrivals(saarplatz, {duration: 10, linesOfStops: true})
// client.radar({
// 	north: 52.283258,
// 	west: 8.039188,
// 	south: 52.263653,
// 	east: 8.07225,
// }, {results: 10})

// client.locations('finkenweg', {results: 3})
// client.stop(saarplatz, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '990121407',
// 	address: 'Osnabrück Sandstraße 20',
// 	latitude: 52.266313,
// 	longitude: 8.033255,
// }, {
// 	maxDuration: 8,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
