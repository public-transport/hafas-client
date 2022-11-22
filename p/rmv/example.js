import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as rmvProfile} from './index.js'

const client = createClient(rmvProfile, 'hafas-client-example')

const marburgHbf = '3010011'
const mainzGonsenheim = '3011332'
const offenbachLiebigstr = {
	type: 'location',
	id: '990148095',
	address: 'Offenbach am Main, Liebigstraße 22',
	latitude: 50.096326, longitude: 8.759979
}

client.journeys(marburgHbf, mainzGonsenheim, {results: 1})
// client.departures(marburgHbf, {duration: 1})
// client.arrivals(marburgHbf, {duration: 10, linesOfStops: true})
// client.locations('wiesbaden igstadt', {results: 2})
// client.stop(marburgHbf, {linesOfStops: true}) // Dammtor
// client.nearby(offenbachLiebigstr)
// client.radar({
// 	north: 50.125,
// 	west: 8.661,
// 	south: 50.098,
// 	east: 8.71
// }, {results: 10})
// client.reachableFrom(offenbachLiebigstr, {
// 	when: new Date('2020-03-03T10:00:00+01:00'),
// 	maxDuration: 10
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
