import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vsnProfile} from './index.js'

const client = createClient(vsnProfile, 'hafas-client-example')

client.journeys('9033961', '9033962', {results: 1, polylines: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.departures('9033961', {duration: 1})
// client.arrivals('9033961', {duration: 10, linesOfStops: true})
// client.locations('jugendherberge', {results: 2})
// client.stop('9033961', {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 60})
// client.radar({
// 	north: 53.55,
// 	west: 9.95,
// 	south: 52.51,
// 	east: 10
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	address: 'Hamburg, Holstenwall 9',
// 	latitude: 53.553766,
// 	longitude: 9.977514
// }, {
// 	when: new Date('2019-05-16T10:00:00+0200'),
// 	maxDuration: 8
// })
.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
