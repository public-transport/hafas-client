import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as oebbProfile} from './index.js'

const client = createClient(oebbProfile, 'hafas-client-example')

// Wien Westbahnhof to Salzburg Hbf
client.journeys('1291501', '8100002', {results: 1})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, leg.line.name)
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.departures('8100002', {duration: 1})
// client.arrivals('8100002', {duration: 10, linesOfStops: true})
// client.locations('Salzburg', {results: 2})
// client.stop('8100173') // Graz Hbf
// client.nearby({
// 	type: 'location',
// 	latitude: 47.812851,
// 	longitude: 13.045604
// }, {distance: 60})
// client.radar({
// 	north: 47.827203,
// 	west: 13.001261,
// 	south: 47.773278,
// 	east: 13.07562
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	id: '970053039',
// 	name: 'Graz, BILLA, Hauptplatz',
// 	latitude: 47.070656,
// 	longitude: 15.438002
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
