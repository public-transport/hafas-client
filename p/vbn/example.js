import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vbnProfile} from './index.js'

const client = createClient(vbnProfile, 'hafas-client-example')

const bremerhavenHbf = '9014418'
const verden = '9093627'
const bremenRutenstr = {
	type: 'location',
	id: '990025693',
	address: 'Bremen Rutenstraße 1',
	latitude: 53.074165, longitude: 8.8184
}

client.journeys(bremerhavenHbf, verden, {results: 1})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(bremerhavenHbf, {duration: 1})
// client.arrivals(bremerhavenHbf, {duration: 10, linesOfStops: true})
// client.locations('oldenburg', {results: 2})
// client.stop(bremerhavenHbf, {linesOfStops: true})
// client.nearby(bremenRutenstr)
// client.radar({
// 	north: 53.087,
// 	west: 8.777,
// 	south: 53.072,
// 	east: 8.835
// }, {results: 10})
// client.reachableFrom(bremenRutenstr, {
// 	when: new Date('2020-03-03T10:00:00+01:00'),
// 	maxDuration: 10
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
