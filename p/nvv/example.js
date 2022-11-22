import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as nvvProfile} from './index.js'

const client = createClient(nvvProfile, 'hafas-client-example')

// Scheidemannplatz to Auestadion
client.journeys('2200073', '2200042', {results: 1, polylines: true})
// .then(({journeys}) => {
// 	const [journey] = journeys
//	const leg = journey.legs.find(l => !!l.line)
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.departures('2200005', {duration: 1})
// client.arrivals('2200005', {duration: 10, linesOfStops: true})
// client.locations('kirchweg', {results: 2})
// client.stop('2200005', {linesOfStops: true}) // Kassel Kirchweg
// client.nearby({
// 	type: 'location',
// 	latitude: 51.313,
// 	longitude: 9.4654
// }, {distance: 400})
// client.radar({
// 	north: 51.320153,
// 	west: 9.458359,
// 	south: 51.304304,
// 	east: 9.493672
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	id: '990100251',
// 	address: 'Kassel, Heckerstraße 2',
// 	latitude: 51.308108,
// 	longitude: 9.475152
// }, {
// 	when: new Date('2019-04-02T10:00:00+0200'),
// 	maxDuration: 10
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
