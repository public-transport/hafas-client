import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as avvProfile} from './index.js'

const client = createClient(avvProfile, 'hafas-client-example')

const rwth = '1057'
const kronenberg = '1397'

// client.journeys(rwth, kronenberg, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(rwth, {duration: 1})
// client.arrivals(rwth, {duration: 10, linesOfStops: true})
// client.radar({
// 	north: 50.78141,
// 	west: 6.06031,
// 	south: 50.75022,
// 	east: 6.10316,
// }, {results: 10})

client.locations('kronenberg', {results: 3})
// client.stop(rwth, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 50.770607,
// 	longitude: 6.104637,
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '990000745',
// 	address: 'Aachen, Charlottenstraße 11',
// 	latitude: 50.770607,
// 	longitude: 6.104637,
// }, {
// 	maxDuration: 8,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
