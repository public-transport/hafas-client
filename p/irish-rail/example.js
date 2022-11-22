import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as irishProfile} from './index.js'

const client = createClient(irishProfile, 'hafas-client example')

// from Dublin to Belfast Central
client.journeys('9909002', '9990840', {results: 1})
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures('9909002', {duration: 5})
// client.arrivals('9909002', {duration: 10, linesOfStops: true})
// client.locations('Dublin', {results: 2})
// client.locations('Hochschule Dublin', {poi: true, addressses: false, fuzzy: false})
// client.stop('9909002') // Dublin
// client.nearby({
// 	type: 'location',
// 	latitude: 53.353,
// 	longitude: -6.247
// }, {distance: 200})
// client.radar({
// 	north: 53.35,
// 	west: -6.245,
// 	south: 53.34,
// 	east: -6.244
// }, {results: 10})

.then(data => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
