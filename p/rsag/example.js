import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as rsagProfile} from './index.js'

const client = createClient(rsagProfile, 'hafas-client-example')

const rostockHbf = '8010304'
const güstrow = '8010153'
const albertEinsteinStr = {
	type: 'location',
	id: '990004201',
	address: 'Rostock - Südstadt, Albert-Einstein-Straße 23',
	latitude: 54.077208, longitude: 12.108299
}

client.journeys(rostockHbf, güstrow, {results: 1})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(rostockHbf, {duration: 1})
// client.arrivals(rostockHbf, {duration: 10, linesOfStops: true})
// client.locations('güstrow', {results: 2})
// client.stop(rostockHbf, {linesOfStops: true}) // Dammtor
// client.nearby(albertEinsteinStr)
// client.radar({
// 	north: 54.177,
// 	west: 11.959,
// 	south: 54.074,
// 	east: 12.258
// }, {results: 10})
// client.reachableFrom(albertEinsteinStr, {
// 	when: new Date('2020-03-03T10:00:00+01:00'),
// 	maxDuration: 10
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
